#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Common patterns to replace
const patterns = [
  // Background colors
  { from: /bg-white dark:bg-gray-900/g, to: 'bg-gray-900' },
  { from: /bg-white dark:bg-gray-800/g, to: 'bg-gray-800' },
  { from: /bg-gray-50 dark:bg-gray-800/g, to: 'bg-gray-800' },
  { from: /bg-gray-100 dark:bg-gray-700/g, to: 'bg-gray-700' },
  { from: /bg-gray-100 dark:bg-gray-800/g, to: 'bg-gray-800' },
  { from: /bg-gray-100 dark:bg-gray-900/g, to: 'bg-gray-900' },
  
  // Text colors
  { from: /text-gray-900 dark:text-white/g, to: 'text-white' },
  { from: /text-gray-800 dark:text-white/g, to: 'text-white' },
  { from: /text-gray-700 dark:text-gray-300/g, to: 'text-gray-300' },
  { from: /text-gray-600 dark:text-gray-300/g, to: 'text-gray-300' },
  { from: /text-gray-600 dark:text-gray-400/g, to: 'text-gray-400' },
  { from: /text-gray-500 dark:text-gray-500/g, to: 'text-gray-500' },
  { from: /text-gray-500 dark:text-gray-400/g, to: 'text-gray-400' },
  
  // Border colors
  { from: /border-gray-200 dark:border-gray-700/g, to: 'border-gray-700' },
  { from: /border-gray-300 dark:border-gray-600/g, to: 'border-gray-600' },
  
  // Background gradients
  { from: /from-slate-50 to-brand-neutral\/20 dark:from-gray-900 dark:to-gray-800/g, to: 'from-gray-900 to-gray-800' },
  { from: /from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800/g, to: 'from-gray-900 to-gray-800' },
  
  // Hover states
  { from: /hover:text-brand-primary dark:hover:text-brand-accent/g, to: 'hover:text-brand-accent' },
  { from: /hover:text-blue-600 dark:hover:text-blue-400/g, to: 'hover:text-blue-400' },
  
  // Link colors
  { from: /text-brand-primary dark:text-brand-accent/g, to: 'text-brand-accent' },
  { from: /text-blue-600 dark:text-blue-400/g, to: 'text-blue-400' },
  { from: /text-green-600 dark:text-green-400/g, to: 'text-green-400' },
  { from: /text-purple-600 dark:text-purple-400/g, to: 'text-purple-400' },
  { from: /text-teal-600 dark:text-teal-400/g, to: 'text-teal-400' },
  { from: /text-red-600 dark:text-red-400/g, to: 'text-red-400' },
  { from: /text-orange-600 dark:text-orange-400/g, to: 'text-orange-400' },
  
  // Complex background patterns
  { from: /bg-brand-primary\/10 dark:bg-brand-primary\/20 text-brand-primary dark:text-brand-neutral/g, to: 'bg-brand-primary/20 text-brand-neutral' },
  { from: /bg-brand-secondary\/10 dark:bg-brand-secondary\/20 text-brand-secondary dark:text-brand-secondary/g, to: 'bg-brand-secondary/20 text-brand-secondary' },
  { from: /bg-brand-accent\/10 dark:bg-brand-accent\/20 text-brand-accent dark:text-lime-400/g, to: 'bg-brand-accent/20 text-lime-400' },
  { from: /bg-brand-neutral\/20 dark:bg-brand-neutral\/30 text-brand-primary dark:text-brand-neutral/g, to: 'bg-brand-neutral/30 text-brand-neutral' },
];

function processFile(filePath) {
  if (!filePath.endsWith('.astro')) return;
  
  console.log(`Processing ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const pattern of patterns) {
    if (pattern.from.test(content)) {
      content = content.replace(pattern.from, pattern.to);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ Updated ${filePath}`);
  }
}

// Process all .astro files in src/pages
const pagesDir = './src/pages';
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else {
      processFile(filePath);
    }
  }
}

console.log('Starting dark mode class cleanup...');
processDirectory(pagesDir);
console.log('Done!');