#!/usr/bin/env node
/*
  Import Medium or Substack exports into Astro content collection files.
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import slugify from 'slugify';
import { parse as parseDate, format as formatDate, isValid as isValidDate } from 'date-fns';

// Optional deps for HTML → Markdown
let TurndownService = null;
let JSDOM = null;
try {
  // eslint-disable-next-line import/no-extraneous-dependencies
  TurndownService = (await import('turndown')).default;
  // eslint-disable-next-line import/no-extraneous-dependencies
  JSDOM = (await import('jsdom')).JSDOM;
} catch (_) {
  // Medium import will warn if these are missing
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readText(p) {
  return fs.readFileSync(p, 'utf8');
}

function writeText(p, s) {
  fs.writeFileSync(p, s, 'utf8');
}

function toSlug(s) {
  return slugify(String(s), { lower: true, strict: true, trim: true });
}

function parseArgs() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    console.error('Usage: import.mjs <medium|substack> --input <dir> [--out <dir>] [--author <name>] [--draft true|false] [--tag <t>] [--force]');
    process.exit(1);
  }
  const source = argv[0];
  const opts = { source, input: null, out: 'src/content/blog', author: 'Nicole L. Mark', draft: false, tags: [], force: false };
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--input') opts.input = argv[++i];
    else if (a === '--out') opts.out = argv[++i];
    else if (a === '--author') opts.author = argv[++i];
    else if (a === '--draft') opts.draft = /^(true|1)$/i.test(argv[++i]);
    else if (a === '--tag') opts.tags.push(argv[++i]);
    else if (a === '--force') opts.force = true;
  }
  if (!opts.input || !fs.existsSync(opts.input)) {
    console.error(`--input directory not found: ${opts.input}`);
    process.exit(1);
  }
  ensureDir(opts.out);
  return opts;
}

function safeDateString(d) {
  if (d instanceof Date && isValidDate(d)) return d.toISOString().slice(0, 10);
  if (typeof d === 'string') {
    const tryIso = new Date(d);
    if (isValidDate(tryIso)) return tryIso.toISOString().slice(0, 10);
    const tryParsed = parseDate(d, 'yyyy-MM-dd', new Date());
    if (isValidDate(tryParsed)) return tryParsed.toISOString().slice(0, 10);
  }
  return null;
}

function buildFrontmatter({ title, description, pubDate, updatedDate, heroImage, tags = [], author, draft }) {
  const data = {
    title: title || 'Untitled',
    description: description || '',
    pubDate: pubDate ? safeDateString(pubDate) : null,
    tags: tags.filter(Boolean),
    author: author || 'Nicole L. Mark',
    draft: Boolean(draft),
  };
  
  // Only add optional fields if they have values
  if (updatedDate) {
    const updatedDateStr = safeDateString(updatedDate);
    if (updatedDateStr) data.updatedDate = updatedDateStr;
  }
  
  if (heroImage) {
    data.heroImage = heroImage;
  }
  
  if (!data.pubDate) delete data.pubDate; // validator will warn
  return matter.stringify('', data);
}

function pickDescriptionFromMarkdown(md) {
  const lines = md.split(/\r?\n/);
  const paras = [];
  let current = [];
  for (const line of lines) {
    if (line.trim() === '') {
      if (current.length) { paras.push(current.join(' ').trim()); current = []; }
    } else if (!line.startsWith('#')) {
      current.push(line.trim());
    }
  }
  if (current.length) paras.push(current.join(' ').trim());
  return (paras.find(p => p.length > 60) || paras[0] || '').slice(0, 280);
}

function filenameFor({ pubDate, title }) {
  const datePrefix = pubDate ? safeDateString(pubDate) : formatDate(new Date(), 'yyyy-MM-dd');
  return `${datePrefix}--${toSlug(title || 'post')}.md`;
}

function writePost({ outDir, fm, body, filename, force }) {
  const fp = path.join(outDir, filename);
  if (fs.existsSync(fp) && !force) {
    console.warn(`Skip (exists): ${fp}`);
    return { path: fp, skipped: true };
  }
  writeText(fp, `${fm}\n${body}\n`);
  return { path: fp, skipped: false };
}

// Medium import: parse HTML files in <input>/posts
function importMedium(opts) {
  if (!TurndownService || !JSDOM) {
    console.error('Medium import requires turndown and jsdom. Install with: yarn add -D turndown jsdom');
    process.exit(1);
  }
  const postsDir = path.join(opts.input, 'posts');
  const imagesDir = path.join(opts.input, 'images'); // not moved automatically
  if (!fs.existsSync(postsDir)) {
    console.error(`Could not find Medium posts directory: ${postsDir}`);
    process.exit(1);
  }
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.html'));
  let imported = 0;
  for (const f of files) {
    const html = readText(path.join(postsDir, f));
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const title = (doc.querySelector('h1')?.textContent || '').trim();
    const timeEl = doc.querySelector('time');
    const pubDate = timeEl?.getAttribute('datetime') || timeEl?.textContent || '';
    const main = doc.querySelector('article') || doc.body;
    const md = td.turndown(main.innerHTML);
    const description = pickDescriptionFromMarkdown(md);

    const fm = buildFrontmatter({
      title,
      description,
      pubDate,
      heroImage: undefined,
      tags: [...opts.tags, 'medium'],
      author: opts.author,
      draft: opts.draft,
    });

    const filename = filenameFor({ pubDate, title });
    const res = writePost({ outDir: opts.out, fm, body: md, filename, force: opts.force });
    if (!res.skipped) imported++;
  }
  console.log(`Medium import complete. Imported ${imported} posts into ${opts.out}`);
}

// Substack import: use posts/*.md or *.html and posts.csv for metadata enrichment
function importSubstack(opts) {
  const postsDir = path.join(opts.input, 'posts');
  if (!fs.existsSync(postsDir)) {
    console.error(`Could not find Substack posts directory: ${postsDir}`);
    process.exit(1);
  }
  
  // Load CSV metadata if present
  let meta = new Map();
  const csvPath = path.join(opts.input, 'posts.csv');
  if (fs.existsSync(csvPath)) {
    const csv = readText(csvPath);
    const lines = csv.split(/\r?\n/);
    const header = lines.shift();
    if (header) {
      const cols = header.split(',');
      for (const line of lines) {
        if (!line.trim()) continue;
        // Handle CSV with quoted fields properly
        const parts = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"' && (i === 0 || line[i-1] === ',')) {
            inQuotes = true;
          } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i+1] === ',')) {
            inQuotes = false;
          } else if (char === ',' && !inQuotes) {
            parts.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        parts.push(current.trim());
        
        const row = Object.fromEntries(cols.map((c, i) => [c.trim(), (parts[i] || '').replace(/^"|"$/g, '').trim()]));
        const filename = row['post_id'] || row['title'];
        if (filename) meta.set(filename, row);
      }
    }
  }

  // Look for both .md and .html files
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md') || f.endsWith('.html'));
  let imported = 0;
  
  for (const f of files) {
    const filePath = path.join(postsDir, f);
    const raw = readText(filePath);
    let title, description, pubDate, content;
    
    if (f.endsWith('.html')) {
      // Handle HTML files (like your Substack export)
      if (!TurndownService || !JSDOM) {
        console.error('HTML import requires turndown and jsdom. Install with: yarn add -D turndown jsdom');
        process.exit(1);
      }
      
      const dom = new JSDOM(raw);
      const doc = dom.window.document;
      
      // Extract metadata from CSV
      const baseFilename = f.replace('.html', '');
      const row = meta.get(baseFilename) || meta.get(f) || null;
      
      title = row?.title || baseFilename.split('.').slice(1).join('-').replace(/-/g, ' ');
      pubDate = row?.post_date || null;
      
      // Convert HTML to Markdown
      const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
      content = td.turndown(raw);
      description = row?.subtitle || pickDescriptionFromMarkdown(content);
    } else {
      // Handle Markdown files
      const parsed = matter(raw);
      let { date } = parsed.data || {};
      title = parsed.data?.title;
      pubDate = date || parsed.data?.pubDate;
      content = parsed.content;
      
      if (!title) {
        // try from first heading
        const h1 = content.match(/^#\s+(.+)$/m);
        if (h1) title = h1[1].trim();
      }
      description = parsed.data?.description || pickDescriptionFromMarkdown(content);
    }

    // Enrich from CSV when available
    const baseFilename = f.replace(/\.(md|html)$/, '');
    const row = meta.get(baseFilename) || meta.get(f) || meta.get(title) || null;
    const heroImage = row?.HeroImage || undefined;
    const tags = [...opts.tags, 'substack'].filter(Boolean);

    const fm = buildFrontmatter({
      title,
      description,
      pubDate,
      heroImage,
      tags,
      author: opts.author,
      draft: opts.draft,
    });

    const filename = filenameFor({ pubDate, title });
    const res = writePost({ outDir: opts.out, fm, body: content.trim() + '\n', filename, force: opts.force });
    if (!res.skipped) imported++;
  }
  console.log(`Substack import complete. Imported ${imported} posts into ${opts.out}`);
}

function main() {
  const opts = parseArgs();
  if (opts.source === 'medium') return importMedium(opts);
  if (opts.source === 'substack') return importSubstack(opts);
  console.error(`Unknown source: ${opts.source}. Expected 'medium' or 'substack'.`);
  process.exit(1);
}

main();