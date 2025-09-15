# Blog migration toolkit

This toolkit helps import posts from Medium and Substack into Astro content collection files under `src/content/blog/`.

It converts exports to Markdown with proper frontmatter matching your schema:
- title: string
- description: string
- pubDate: date
- updatedDate: date (optional)
- heroImage: string (optional)
- tags: string[] (default [])
- author: string (defaults to "Nicole L. Mark")
- draft: boolean (default false)

## 0) Install dependencies (npm)

From the repo root:

```bash
# required
npm install -D gray-matter slugify date-fns

# used for Medium HTML → Markdown
npm install -D jsdom turndown

# optional: better description extraction
npm install -D @iarna/toml
```

## 1) Export your content

- Medium
  - Settings → Download your information → Export → You’ll receive a ZIP via email
  - Unzip, you’ll see something like `medium-username/posts/` with HTML and an `images/` folder

- Substack
  - Dashboard → Settings → Import/Export → Export → You’ll get a ZIP
  - Unzip, you’ll see `posts/` containing `.md` files and `posts.csv` with metadata

## 2) Dry run the import

```bash
# Medium export directory example
node scripts/blog-migration/import.mjs medium \
  --input /path/to/medium-export/medium-username \
  --out src/content/blog \
  --author "Nicole L. Mark" --draft false --tag "medium"

# Substack export directory example
node scripts/blog-migration/import.mjs substack \
  --input /path/to/substack-export \
  --out src/content/blog \
  --author "Nicole L. Mark" --draft false --tag "substack"
```

Notes:
- For Medium, we convert each post HTML → Markdown using Turndown and extract metadata from the HTML.
- For Substack, we use the `.md` files and enrich with metadata from `posts.csv` when present.
- Output filenames follow: `YYYY-MM-DD--slug.md`. Existing files won’t be overwritten unless `--force` is passed.

## 3) Validate content

```bash
node scripts/blog-migration/validate.mjs src/content/blog
```

This checks frontmatter presence/types and warns on common issues (missing description, pubDate parse errors, etc.).

## 4) Recommended workflow

1. Create a feature branch (you already have `blog-posts`).
2. Run imports for Medium and Substack into `src/content/blog/`.
3. Run the validator and address warnings.
4. Preview locally to visually spot-check posts:
   ```bash
   npm run dev
   ```
5. Commit the imported content in small batches (e.g., 5–10 posts) with descriptive messages.
6. Open a PR for review, iterate, and merge.

## 5) Rollback and safety

- The importer never deletes existing content.
- By default, it will not overwrite existing files unless `--force` is provided.
- Use git to revert unwanted changes:
  ```bash
  git --no-pager diff
  git checkout -- src/content/blog/FILE.md
  ```

## 6) Options

Common flags for `import.mjs`:
- `--input` Path to your export directory (required)
- `--out` Output directory (default: `src/content/blog`)
- `--author` Author override (default: "Nicole L. Mark")
- `--draft` true|false (default: false)
- `--tag` Add a tag (can be repeated)
- `--force` Overwrite if file exists

## 7) Known limitations
- Medium HTML varies; the script uses best-effort parsing and may need tweaks for edge cases.
- Substack frontmatter in the `.md` files (if present) is respected but normalized to your schema.
- Hero images: The scripts keep heroImage frontmatter if they can detect one; otherwise you can add it manually.