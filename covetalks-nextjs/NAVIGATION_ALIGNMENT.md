# CoveTalks Next.js - Navigation & Pages Alignment

## Navigation Comparison

### Original Site Navigation (Logged Out)
- **Home** → `/index.html`
- **Find Speakers** → `/members.html` 
- **Pricing** → `/pricing.html`
- **Register** → `/register.html`
- **Contact** → `/contact.html`
- **Join** button → `/register.html`
- **Login** button → `/login.html`

### Current Next.js Navigation
- **Speakers** → `/speakers` ❌ Should be "Find Speakers"
- **Opportunities** → `/opportunities` ❌ Not in main nav on original
- **About** → `/about` ❌ Not in main nav on original
- **How It Works** → `/how-it-works` ❌ Not in main nav on original
- **Join Now** button → `/register` ✅
- **Login** button → `/login` ✅

## Footer Links Comparison

### Original Footer Sections

#### Quick Links
- Home ✅
- Find Speakers ✅  
- Browse Opportunities ✅
- Register ✅
- Pricing ✅
- About Us ✅

#### For Organizations
- Register Your Organization ✅
- Post Speaking Opportunity ❌ (needs login)
- Browse Speakers ✅
- Organization Plans ✅
- Organization Guide ❌ (missing)

#### For Speakers  
- Become a Speaker ✅
- Find Opportunities ✅
- Speaker Resources ❌ (missing)
- Speaker Plans ✅
- Success Stories ❌ (missing)

#### Support
- Help Center ❌ (missing)
- FAQ ❌ (missing)
- Contact Us ✅
- Privacy Policy ✅
- Terms of Service ✅
- Accessibility ❌ (missing)

## Font Paths

### Original Site
- `/fonts/brandontext-regular.woff`
- `/fonts/brandontext-medium.woff`
- `/fonts/brandontext-bold.woff`
- `/fonts/brandontext-black.woff`

### Current Next.js
- Fixed to match original ✅

## Image Paths

### Original Site
- Logo: `/Images/CoveTalks_logo.svg`
- Icons: `/Images/icon-*.png`
- Other images in `/Images/` folder

### Current Next.js
- Should use `/images/` folder (lowercase)
- Need to copy original images

## Pages Status

### ✅ Complete
- Home (`/`)
- Speakers (`/speakers`) - but should be accessible as "Find Speakers"
- Opportunities (`/opportunities`)
- Pricing (`/pricing`)
- Contact (`/contact`)
- About (`/about`)
- How It Works (`/how-it-works`)
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)

### ❌ Missing (Non-Auth)
- FAQ (`/faq`)
- Help Center (`/help`)
- Success Stories (`/success-stories`)
- Accessibility (`/accessibility`)
- Organization Guide (`/resources/organization-guide`)
- Speaker Resources (`/resources/speaker-tips`)

### 🔒 Require Auth (Not Built Yet)
- Login (`/login`)
- Register (`/register`)
- Dashboard (`/dashboard`)
- Profile (`/profile`)
- Settings (`/settings`)
- Inbox (`/inbox`)
- Bookings (`/bookings`)
- Billing (`/billing`)

## Action Items

1. **Update Header Navigation** to match original:
   - Home
   - Find Speakers (not just "Speakers")
   - Pricing
   - Register  
   - Contact

2. **Keep Additional Pages** but move to footer or secondary nav:
   - Opportunities
   - About
   - How It Works

3. **Create Missing Pages**:
   - FAQ page
   - Help Center page
   - Success Stories page
   - Accessibility page

4. **Update Footer** to match original structure exactly

5. **Font & Image Paths**:
   - Fonts already fixed ✅
   - Need to ensure images folder structure matches
