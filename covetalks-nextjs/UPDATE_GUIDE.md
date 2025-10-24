# CoveTalks Next.js - Updates to Match Original Site

## ✅ Changes Made

### 1. Navigation Menu Updated
The header navigation now matches your original site:
- **Home** (/)
- **Find Speakers** (/speakers)
- **Pricing** (/pricing)
- **Register** (/register)
- **Contact** (/contact)
- **Join** button
- **Login** button

### 2. Footer Updated
Footer sections now match exactly:
- **Quick Links**: Home, Find Speakers, Browse Opportunities, Register, Pricing, About Us
- **For Organizations**: Register Your Organization, Post Speaking Opportunity, Browse Speakers, Organization Plans, Organization Guide
- **For Speakers**: Become a Speaker, Find Opportunities, Speaker Resources, Speaker Plans, Success Stories
- **Support**: Help Center, FAQ, Contact Us, Privacy Policy, Terms of Service, Accessibility

### 3. Font Paths Fixed
Updated to match your original paths:
- `/fonts/brandontext-regular.woff`
- `/fonts/brandontext-medium.woff`
- `/fonts/brandontext-bold.woff`
- `/fonts/brandontext-black.woff`

### 4. Social Links
Added your LinkedIn company page: https://www.linkedin.com/company/108118017

## 📝 To Update Your Current Project

### Quick Update (Replace Files)

```powershell
# Download the aligned version
# Extract it to a temp folder
cd C:\Users\ander\Downloads
tar -xzf covetalks-nextjs-aligned.tar.gz

# Copy the updated files to your project
Copy-Item -Path "covetalks-nextjs\components\layout\Header.tsx" -Destination "C:\Users\ander\OneDrive\Documents\GitHub\CoveTalksMain\covetalks-nextjs\components\layout\Header.tsx" -Force
Copy-Item -Path "covetalks-nextjs\components\layout\Footer.tsx" -Destination "C:\Users\ander\OneDrive\Documents\GitHub\CoveTalksMain\covetalks-nextjs\components\layout\Footer.tsx" -Force
Copy-Item -Path "covetalks-nextjs\app\globals.css" -Destination "C:\Users\ander\OneDrive\Documents\GitHub\CoveTalksMain\covetalks-nextjs\app\globals.css" -Force

# Clean up temp folder
Remove-Item -Path "covetalks-nextjs" -Recurse -Force
```

### Then restart your dev server:
```powershell
cd C:\Users\ander\OneDrive\Documents\GitHub\CoveTalksMain\covetalks-nextjs
npm run dev
```

## 🎯 Pages We Have

### ✅ Public Pages (Complete)
1. **Home** (/) - Landing page
2. **Find Speakers** (/speakers) - Browse speakers directory
3. **Opportunities** (/opportunities) - Browse speaking opportunities
4. **Pricing** (/pricing) - Subscription plans
5. **Contact** (/contact) - Contact form and info
6. **About** (/about) - Company information
7. **How It Works** (/how-it-works) - Platform guide
8. **Privacy Policy** (/privacy) - Privacy information
9. **Terms of Service** (/terms) - Legal terms

### 📋 Pages You Might Want to Add

These pages are referenced in the footer but not critical:

1. **FAQ** (/faq) - Frequently asked questions
2. **Help Center** (/help) - Support documentation
3. **Success Stories** (/success-stories) - Case studies
4. **Accessibility** (/accessibility) - Accessibility statement

## 🎨 What You Need to Add

### 1. Font Files
Copy your Brandon Text font files to:
```
public/fonts/
├── brandontext-regular.woff
├── brandontext-regular.woff2
├── brandontext-medium.woff
├── brandontext-medium.woff2
├── brandontext-bold.woff
├── brandontext-bold.woff2
├── brandontext-black.woff
└── brandontext-black.woff2
```

### 2. Image Files
Copy your images to:
```
public/images/
├── CoveTalks_logo.svg
├── logo-white.svg
├── hero-speaker.jpg
├── dashboard-preview.jpg
└── ... other images
```

## 🚀 Next Steps

1. **Test the navigation** - All menu items should work
2. **Check the footer** - All links should be correct
3. **Add font files** - Copy from your original project
4. **Add images** - Copy from your original project
5. **Create auth pages** - Login and Register (when ready)

The site now maintains the same navigation structure as your original while keeping the improved Next.js architecture and modern design!
