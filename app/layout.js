import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "Shabbos Report",
  description: "Erev Shabbos Weather Report - Get up-to-date weather forecasts and candle lighting times to help you prepare for Shabbos.",
  icons: {
    icon: "/shabbat-candles.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 