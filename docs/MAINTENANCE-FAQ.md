# Visual Regression Testing - Maintenance FAQ

Private guide for site maintainers.

---

## What is this?

Automated screenshot tests that run daily at 8 AM UTC against all 4 websites:
- unstoppable.ink
- beatwritersblock.com
- tooearlytosay.com
- caphegroup.org

Tests capture screenshots at 4 viewport sizes (desktop, medium desktop, tablet, mobile) and compare them to saved baselines. If something looks different, the test fails.

---

## Where do I see test results?

**GitHub Actions page**: https://github.com/dphdame/vrt-testing/actions

- Green checkmark = all tests passed
- Red X = something changed visually

---

## A test failed. What do I do?

1. Go to https://github.com/dphdame/vrt-testing/actions
2. Click on the failed run
3. Download the `visual-diffs` artifact (shows what changed)
4. Download `playwright-report` for detailed HTML report

**If the change was unintentional** (a bug): Fix the CSS/layout issue on the site.

**If the change was intentional** (you updated the design): Update the baselines (see below).

---

## How do I update baselines after a design change?

1. Go to https://github.com/dphdame/vrt-testing/actions
2. Click "Visual Regression Tests" in the left sidebar
3. Click the **"Run workflow"** dropdown button (right side)
4. Check the box: **"Update baseline screenshots"**
5. Click **"Run workflow"**

The workflow will capture new screenshots and commit them automatically. Future tests will compare against these new baselines.

---

## How do I run tests manually?

Same steps as above, but leave "Update baseline screenshots" unchecked.

---

## What viewports are tested?

| Name | Size | Use Case |
|------|------|----------|
| desktop-1920 | 1920x1080 | Full HD monitors |
| desktop-1280 | 1280x720 | Smaller laptops |
| tablet | 768x1024 | iPad portrait |
| mobile | 375x667 | iPhone SE/8 |

---

## What does each test check?

For each site:
- **Full page screenshot** - entire scrollable page
- **Navbar/header** - navigation area
- **Hero section** - main banner/content area
- **Footer** - bottom of page
- **CSS validation** - checks CSS is loading correctly
- **Horizontal overflow** - checks nothing breaks mobile layout

---

## Common issues

### "Tests fail but the site looks fine to me"

Font rendering differs between operating systems. Baselines are captured on Linux (CI environment). Small pixel differences are tolerated (2%), but larger changes will fail.

### "I made a tiny CSS change and now everything fails"

Even small changes (font weight, spacing, colors) will be detected. If the change is intentional, update the baselines.

### "Tests are timing out for tooearlytosay.com"

That site loads slower. The tests already have extended timeouts (60 seconds). If it keeps timing out, the site may have a performance issue.

---

## Quick Links

- **Actions/Logs**: https://github.com/dphdame/vrt-testing/actions
- **Repository**: https://github.com/dphdame/vrt-testing
- **Schedule**: Daily at 8 AM UTC
