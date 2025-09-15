#!/usr/bin/env node
/*
  Validate Astro blog frontmatter for files in a directory
*/
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const required = ['title', 'description', 'pubDate'];

function isDateStr(s) {
  const d = new Date(s);
  return !isNaN(d.getTime());
}

function validateFile(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  const fm = matter(raw).data || {};
  const problems = [];

  for (const k of required) {
    if (!(k in fm) || fm[k] === null || fm[k] === '') {
      problems.push(`missing required field: ${k}`);
    }
  }

  if (fm.pubDate && !isDateStr(fm.pubDate)) {
    problems.push('pubDate is not a valid date');
  }

  if (fm.updatedDate && !isDateStr(fm.updatedDate)) {
    problems.push('updatedDate is not a valid date');
  }

  if (fm.tags && !Array.isArray(fm.tags)) {
    problems.push('tags must be an array of strings');
  }

  return problems;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp);
    else if (e.isFile() && fp.endsWith('.md')) files.push(fp);
  }
}

const targetDir = process.argv[2] || 'src/content/blog';
if (!fs.existsSync(targetDir)) {
  console.error(`Directory not found: ${targetDir}`);
  process.exit(1);
}

const files = [];
walk(targetDir);

let hasIssues = false;
for (const fp of files) {
  const problems = validateFile(fp);
  if (problems.length) {
    hasIssues = true;
    console.log(`\n${fp}`);
    for (const p of problems) console.log(`  - ${p}`);
  }
}

if (!hasIssues) console.log(`All ${files.length} files passed validation.`);
else process.exit(2);