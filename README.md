# Nails X Lauren - Next.js Website

A modern, responsive website for Nails X Lauren built with Next.js, React, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Custom Styling**: Preserved original design with custom fonts and color schemes
- **Interactive Components**: React-based navigation and form handling
- **API Integration**: Built-in API routes for booking form submissions
- **Performance Optimized**: Next.js Image optimization and modern build tools

## Pages

- **Home** (`/`) - Main landing page with hero Images and call-to-action
- **Services** (`/services`) - Price list and service offerings
- **About** (`/about`) - Information about the business
- **Book Now** (`/booknow`) - Contact form for booking appointments

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NailsXLauren
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── about/          # About page
│   ├── api/            # API routes
│   ├── booknow/        # Booking page
│   ├── services/       # Services page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable React components
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
└── globals.css         # Global styles and Tailwind imports

public/
└── Images/             # Static Images and assets
```

## Customization

### Colors and Fonts

The project uses custom fonts and colors defined in `tailwind.config.js`:

- **Fonts**: Abeezee, Imperial Script, Arima
- **Colors**: Custom pink theme (#FFB6C1) and maroon accent (#b35780)

### Styling

Custom button styles are defined in the Tailwind config:
- `.btn-bookNow` - Primary booking button
- `.btn-bookNowCenter` - Center hero button

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment. You can deploy in several ways:

#### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Option 2: GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push

#### Option 3: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Deploy

### Environment Variables for Vercel

When deploying to Vercel, make sure to add these environment variables in your Vercel dashboard:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:

```
SENDEREMAIL=laurenorozco0@gmail.com
SENDERPASSWORD=hhdv zavn zhde nvmz
```

**Important**: Make sure to add these to all environments (Production, Preview, and Development).

## API Endpoints

- `POST /api/book` - Handle booking form submissions and send email notifications

## Email Configuration

The booking form automatically sends email notifications to Lauren's email when customers submit booking requests. The email functionality is configured using environment variables:

### Environment Variables

Create a `.env.local` file in the root directory with:

```bash
SENDEREMAIL=laurenorozco0@gmail.com
SENDERPASSWORD=hhdv zavn zhde nvmz
```

**Note**: The password is an App Password generated from Gmail's 2-factor authentication settings, not the regular Gmail password.

### Email Features

- **Automatic Notifications**: Every booking request is automatically emailed to Lauren
- **Formatted HTML Emails**: Professional email templates with customer information
- **Booking ID Generation**: Each request gets a unique booking ID for tracking
- **Error Handling**: Graceful error handling with user-friendly messages

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Nodemailer** - Email functionality
- **DaisyUI** - UI components (available but not used)

## License

This project is licensed under the MIT License.
