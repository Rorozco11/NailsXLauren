# Instagram Gallery Setup Instructions

## Overview
The gallery page now includes an auto-updating Instagram feed that pulls photos and videos from Lauren's Instagram account (@nailxlauren).

## Setup Steps

### 1. Create a Behold Account
1. Go to [Behold.so](https://behold.so)
2. Sign up for a free account
3. Connect your Instagram account (@nailxlauren)

### 2. Create a Feed
1. In your Behold dashboard, create a new feed
2. Select the Instagram account (@nailxlauren)
3. Choose your display preferences (grid layout, number of posts, etc.)
4. Copy the feed token provided

### 3. Update the Feed Token
1. Open `/src/app/components/BeholdFeed.tsx`
2. Replace `"YOUR_BEHOLD_FEED_TOKEN"` with your actual feed token
3. Or update the `feedId` prop when using the component

### 4. Deploy
The gallery is now ready to display Lauren's Instagram content automatically!

## Features
- ✅ Auto-updating Instagram feed
- ✅ Responsive design
- ✅ Beautiful gallery layout
- ✅ Direct link to Instagram profile
- ✅ Call-to-action for booking appointments

## Customization
You can customize the feed appearance by:
- Modifying the Behold feed settings in your dashboard
- Updating the CSS classes in the gallery page
- Adjusting the component props in `BeholdFeed.tsx`

## Instagram Account
- **Username**: @nailxlauren
- **URL**: https://www.instagram.com/nailxlauren?igsh=OTcxOXZ2Mmg4ZWFs
