#!/bin/bash

# Script to remove placeholder files
# This script will ask for confirmation before deleting each file

echo "🗑️  Placeholder File Removal Script"
echo "This script will remove placeholder files from your project."
echo ""

# Function to remove a file with confirmation
remove_file() {
    local file="$1"
    if [ -f "$file" ]; then
        echo "Found: $file"
        read -p "Delete this file? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm "$file"
            echo "✅ Deleted: $file"
        else
            echo "⏭️  Skipped: $file"
        fi
        echo ""
    fi
}

# Remove placeholder blog posts
echo "📝 Checking blog posts..."
for file in _posts/*blog-post*.md; do
    if [ -f "$file" ]; then
        remove_file "$file"
    fi
done

# Remove placeholder publications
echo "📄 Checking publications..."
for file in _publications/*paper-title*.md; do
    if [ -f "$file" ]; then
        remove_file "$file"
    fi
done

# Remove placeholder talks
echo "🎤 Checking talks..."
for file in _talks/*talk*.md _talks/*tutorial*.md; do
    if [ -f "$file" ]; then
        remove_file "$file"
    fi
done

# Remove placeholder teaching
echo "📚 Checking teaching..."
for file in _teaching/*teaching*.md; do
    if [ -f "$file" ]; then
        remove_file "$file"
    fi
done

echo "🎉 Cleanup complete!"
echo "💡 Don't forget to update your _data/cv.json file with your actual information." 