# 🚀 Quick Start: BackstopJS with Jekyll

## Step 1: Your Site is Already Running!

Your Jekyll site is live at: **https://nicolelily.github.io**

No need to start a local server - we'll test your live site directly!

## Step 2: Capture Reference Screenshots

In a **new terminal window** (keep Jekyll running):

```bash
# Navigate to your project directory
cd nicolelily.github.io

# Capture baseline screenshots
npm run backstop:reference
```

This creates the "golden standard" images for comparison.

## Step 3: Test Your Changes

After making changes to your website:

```bash
# Run visual regression tests
npm run backstop:test
```

## Step 4: Review Results

- **✅ PASS**: No visual changes
- **❌ FAIL**: Visual differences detected
- **📊 Report**: Open `backstop_data/html_report/index.html` to see detailed
  results

## Step 5: Approve Changes (if intentional)

```bash
# Approve new screenshots as new baseline
npm run backstop:approve
```

## 🎯 What Gets Tested

- **4 viewport sizes**: Mobile, Tablet, Desktop, Wide
- **5 key pages**: Home, About, Publications, Portfolio, Teaching
- **Smart selectors**: Focuses on important content areas

## 🚨 Troubleshooting

**"Site not accessible" error?**

- Make sure Jekyll is running: `bundle exec jekyll serve`
- Check the port (default: 4000)
- Verify the URL in `backstop.json`

**Screenshots look wrong?**

- Increase the `delay` in `backstop.json` (currently 1000ms)
- Check if CSS selectors exist on your pages
- Ensure Jekyll has finished building

## 📚 Next Steps

- Read the full [BACKSTOP_README.md](BACKSTOP_README.md)
- Customize `backstop.json` for your specific needs
- Add more pages or viewports as needed
- Integrate with your development workflow

## 💡 Pro Tips

- Run tests before committing changes
- Use `npm run backstop:openReport` to quickly view results
- Set up CI/CD integration for automated testing
- Keep your baseline images in version control
