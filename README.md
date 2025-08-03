# Shabbos Weather Report - Next.js

A Next.js application that provides weather forecasts and candle lighting times for Shabbos preparation.

## Features

- **Weather Forecasts**: Get detailed weather information for Erev Shabbos
- **Candle Lighting Times**: Accurate candle lighting times based on location
- **PDF Generation**: Download printable weather reports
- **Responsive Design**: Works on desktop and mobile devices
- **Daily & Hourly Views**: Toggle between different forecast types

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shabbos-frontend-next
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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
shabbos-frontend-next/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   ├── page.js            # Main page component
│   └── globals.css        # Global styles
├── public/                # Static assets
│   ├── assets/            # Images and icons
│   └── fonts/             # Font files
├── src/                   # Source code
│   ├── components/        # React components
│   ├── context/           # React context providers
│   └── utils/             # Utility functions
└── scripts/               # Development scripts
```

## Migration from Create React App

This project was migrated from Create React App to Next.js. Key changes:

- **App Router**: Uses Next.js 13+ App Router instead of pages directory
- **File-based Routing**: Automatic routing based on file structure
- **Server-side Rendering**: Better SEO and performance
- **Static Assets**: Moved from `src/assets` to `public/assets`
- **CSS**: Consolidated into `app/globals.css`

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **React Bootstrap** - UI components
- **@react-pdf/renderer** - PDF generation
- **Axios** - HTTP client
- **React Helmet Async** - Document head management

## Deployment

The application can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
