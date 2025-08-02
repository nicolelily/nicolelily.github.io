#!/bin/bash

# Cleanup script for placeholder files
# This script helps identify and remove placeholder content

echo "🔍 Scanning for placeholder files..."

# Find files with placeholder content
echo "📝 Files with 'sample', 'example', or 'placeholder' in content:"
grep -r -l -i "sample\|example\|placeholder\|lorem ipsum" _posts/ _publications/ _talks/ _teaching/ 2>/dev/null || echo "No placeholder content found"

echo ""
echo "📁 Files with generic names (likely placeholders):"
find _posts/ _publications/ _talks/ _teaching/ -name "*blog-post*" -o -name "*paper-title*" -o -name "*talk-*" -o -name "*tutorial-*" -o -name "*teaching-*" 2>/dev/null

echo ""
echo "💡 To remove placeholder files, run:"
echo "   ./scripts/remove_placeholders.sh"
echo ""
echo "💡 To move them to a backup directory instead:"
echo "   ./scripts/backup_placeholders.sh" 