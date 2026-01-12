# Website Maintenance Guide

Private guide for maintaining Victoria's websites.

---

## The Sites

| Site | Purpose | Platform |
|------|---------|----------|
| **unstoppable.ink** | Personal brand / portfolio | Ghost CMS |
| **beatwritersblock.com** | Writing productivity content | Ghost CMS |
| **tooearlytosay.com** | Blog / thought leadership | Ghost CMS |
| **caphegroup.org** | CAPHE organization site | Ghost CMS |

---

## How the Sites Run

All sites use **Ghost CMS** hosted on **Heroku**.

- Content is managed through each site's Ghost admin panel (`yoursite.com/ghost`)
- Themes control the visual appearance
- CSS changes happen in the theme files or Ghost's code injection

---

## How to Not Break Things

### Before Making Changes

1. **Test locally first** if changing theme code
2. **Take a screenshot** of the current state before major edits
3. **Use Ghost's preview** before publishing content changes

### After Making Changes

The Visual Regression Tests will catch problems automatically. They run daily at 8 AM UTC and compare screenshots to known-good baselines.

If you want to check immediately after a change:
1. Go to https://github.com/dphdame/vrt-testing/actions
2. Click "Run workflow" to trigger tests manually

### What Gets Caught

- CSS syntax errors (missing braces, typos)
- Layout breaking at different screen sizes
- Elements disappearing or moving unexpectedly
- Mobile responsiveness issues
- Footer/header/navigation problems

---

## When Tests Fail

### Step 1: Check what changed

1. Go to https://github.com/dphdame/vrt-testing/actions
2. Click the failed run (red X)
3. Download `visual-diffs` artifact - shows before/after comparison
4. Download `playwright-report` for detailed HTML report

### Step 2: Decide if it's a problem

**Unintentional change (bug)**:
- Something broke that shouldn't have
- Fix the issue on the site, tests will pass next run

**Intentional change (design update)**:
- You updated the design on purpose
- Update the baselines so tests expect the new look

### Step 3: Update baselines (if change was intentional)

1. Go to https://github.com/dphdame/vrt-testing/actions
2. Click "Visual Regression Tests" in left sidebar
3. Click **"Run workflow"** dropdown (right side)
4. Check **"Update baseline screenshots"**
5. Click **"Run workflow"**

New screenshots become the new baseline. Future tests compare against these.

---

## Common Problems & Fixes

### "I edited CSS and now the whole site looks wrong"

**Likely cause**: Missing closing brace `}` or typo in CSS.

**How to fix**: Check your recent CSS changes. A single missing `}` can break all rules after it.

**VRT catches this**: The full-page screenshot will show massive differences.

### "Site looks fine on my laptop but tests fail"

**Likely cause**: Responsive breakpoints. Site may look different at exact test viewport sizes.

**Test viewports**:
- 1920x1080 (large desktop)
- 1280x720 (small desktop/laptop)
- 768x1024 (tablet)
- 375x667 (mobile)

**How to fix**: Check the site at these exact sizes using browser dev tools.

### "Only mobile tests are failing"

**Likely cause**: Horizontal overflow - something is too wide for the screen.

**How to fix**: Look for:
- Images without `max-width: 100%`
- Fixed-width elements
- Text that doesn't wrap

### "Tests timeout for tooearlytosay.com"

That site loads slower than others. Tests have extended timeouts (60 seconds), but if it keeps failing:
- Check if the site is actually slow to load
- Could be a hosting/performance issue

---

## Quick Reference

| Task | Where |
|------|-------|
| Edit site content | `yoursite.com/ghost` |
| View test results | https://github.com/dphdame/vrt-testing/actions |
| Run tests manually | Actions page → "Run workflow" |
| Update baselines | Actions page → "Run workflow" → check "Update baseline screenshots" |
| View test code | https://github.com/dphdame/vrt-testing |

---

## Test Schedule

- **Automatic**: Daily at 8 AM UTC
- **Manual**: Anytime via GitHub Actions

---

## What's Actually Being Tested

For each site, at each viewport size:

| Test | What It Checks |
|------|----------------|
| Full page screenshot | Entire scrollable page looks correct |
| Navbar/header | Navigation renders properly |
| Hero section | Main content area looks right |
| Footer | Bottom section renders correctly |
| CSS validation | Stylesheets are loading and parsing |
| Horizontal overflow | Nothing breaks the mobile layout |

**Total**: 96 tests across all 4 sites and 4 viewport sizes.
