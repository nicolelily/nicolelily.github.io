# BackstopJS Visual Testing for Jekyll Website

This project uses BackstopJS for visual regression testing to ensure your Jekyll
website looks consistent across different browsers and devices.

## What is BackstopJS?

BackstopJS is a visual regression testing tool that:

- Takes screenshots of your website at different viewport sizes
- Compares new screenshots with baseline (reference) images
- Detects visual changes and reports differences
- Helps maintain visual consistency across updates

## Prerequisites

- Node.js (version 14 or higher)
- Jekyll running locally on `http://localhost:4000`

## Setup

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start your Jekyll site locally**:
   ```bash
   bundle exec jekyll serve
   ```
   Your site should be running at `http://localhost:4000`

## Available Commands

### Basic Testing Commands

- **`npm run backstop:reference`** - Capture baseline/reference screenshots
- **`npm run backstop:test`** - Run visual tests against baseline
- **`npm run backstop:approve`** - Approve new screenshots as new baseline
- **`npm run backstop:openReport`** - Open the test report in browser

### Workflow

1. **First time setup**:
   ```bash
   # Start Jekyll
   bundle exec jekyll serve

   # In another terminal, capture reference screenshots
   npm run backstop:reference
   ```

2. **After making changes**:
   ```bash
   # Run tests to see what changed
   npm run backstop:test

   # Review the report and approve changes if they're intentional
   npm run backstop:approve
   ```

## What Gets Tested

The configuration tests these pages at multiple viewport sizes:

- **Mobile (375x667)** - iPhone SE
- **Tablet (768x1024)** - iPad
- **Desktop (1200x800)** - Standard desktop
- **Wide (1920x1080)** - Large desktop

### Tested Pages

1. **Homepage** (`/`) - Main landing page
2. **About Page** (`/about/`) - Author information
3. **Publications** (`/publications/`) - Research papers
4. **Portfolio** (`/portfolio/`) - Project showcase
5. **Teaching** (`/teaching/`) - Course information

## Configuration

The main configuration is in `backstop.json`. Key settings:

- **Viewports**: Different screen sizes to test
- **Scenarios**: Pages and elements to capture
- **Selectors**: Specific CSS elements to focus on
- **Delay**: Wait time for dynamic content (1000ms)
- **MisMatchThreshold**: Tolerance for visual differences (0.1 = 10%)

## Understanding Results

### Test Report

After running `npm run backstop:test`, you'll get:

- **HTML report** showing all screenshots
- **Visual diffs** highlighting changes
- **Pass/Fail status** for each test

### Common Scenarios

- **✅ PASS**: No visual changes detected
- **❌ FAIL**: Visual differences found
- **⚠️ WARNING**: Minor differences within tolerance

### What to Do When Tests Fail

1. **Review the report** to see what changed
2. **Determine if changes are intentional**:
   - Content updates ✅ (approve)
   - Layout bugs ❌ (fix)
   - Styling improvements ✅ (approve)
3. **Approve intentional changes**: `npm run backstop:approve`
4. **Fix unintentional changes** and re-test

## Customization

### Adding New Pages

Edit `backstop.json` and add new scenarios:

```json
{
    "label": "New Page",
    "url": "http://localhost:4000/new-page/",
    "selectors": ["body", ".page__content"],
    "delay": 1000
}
```

### Changing Viewports

Modify the `viewports` array to test different screen sizes:

```json
{
    "label": "custom",
    "width": 1440,
    "height": 900
}
```

### Adjusting Sensitivity

Change `misMatchThreshold` to be more or less strict:

- `0.05` = 5% tolerance (very strict)
- `0.1` = 10% tolerance (default)
- `0.2` = 20% tolerance (very lenient)

## Troubleshooting

### Common Issues

1. **Jekyll not running**: Ensure `bundle exec jekyll serve` is running
2. **Port conflicts**: Change port in Jekyll config if 4000 is busy
3. **Screenshot failures**: Check if selectors exist on the page
4. **Slow tests**: Reduce `asyncCaptureLimit` in config

### Performance Tips

- Use specific selectors instead of capturing entire pages
- Set appropriate delays for dynamic content
- Run tests during low-traffic periods
- Consider using `--only-changed` for incremental testing

## Integration with CI/CD

For automated testing, you can:

1. **Add to GitHub Actions**:
   ```yaml
   - name: Run BackstopJS tests
     run: npm run backstop:test
   ```

2. **Use in pre-commit hooks**:
   ```bash
   npm run backstop:test
   ```

3. **Generate reports for PR reviews**:
   ```bash
   npm run backstop:test -- --report=junit
   ```

## Resources

- [BackstopJS Documentation](https://github.com/garris/BackstopJS)
- [Visual Testing Best Practices](https://github.com/garris/BackstopJS#best-practices)
- [Jekyll Documentation](https://jekyllrb.com/docs/)

## Support

If you encounter issues:

1. Check the BackstopJS logs in the terminal
2. Review the HTML report for detailed information
3. Check that Jekyll is running and accessible
4. Verify all selectors exist on the tested pages
