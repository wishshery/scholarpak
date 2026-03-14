#!/bin/bash
# ============================================================
# ScholarPak — Push to GitHub
# Run this script ONCE from inside the scholarPak folder
# ============================================================

echo ""
echo "🎓 ScholarPak — Pushing to GitHub..."
echo ""

# Remove any leftover lock files
find .git -name "*.lock" -delete 2>/dev/null

# Rename branch to main (GitHub default)
git branch -M main

# Add the remote (skip if already added)
git remote add origin https://github.com/wishshery/scholarpak.git 2>/dev/null || git remote set-url origin https://github.com/wishshery/scholarpak.git

# Push to GitHub
echo "📤 Pushing all 27 files to github.com/wishshery/scholarpak ..."
git push -u origin main

echo ""
echo "✅ Done! Your repo is live at:"
echo "   https://github.com/wishshery/scholarpak"
echo ""
echo "🚀 Next step — Deploy to Vercel (free):"
echo "   1. Go to https://vercel.com/new"
echo "   2. Import github.com/wishshery/scholarpak"
echo "   3. Click Deploy — done in 2 minutes!"
echo ""
