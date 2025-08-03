import { Helmet } from "react-helmet-async";

const SeoHelmet = () => {
  return (
    <Helmet>
      <title>Erev Shabbos Weather Report</title>
      <meta
        name="description"
        content="Get up-to-date weather forecasts and candle lighting times for Shabbos. Download printable PDFs and stay prepared for a peaceful Shabbos."
      />
      <meta
        name="keywords"
        content="Shabbos, Weather, Candle Lighting, PDF, Jewish, Sabbath, Forecast"
      />
      <meta name="author" content="Your Name or Organization" />
      <meta property="og:title" content="Erev Shabbos Weather Report" />
      <meta
        property="og:description"
        content="Get up-to-date weather forecasts and candle lighting times for Shabbos."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://shabbosweather.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Erev Shabbos Weather Report" />
      <meta
        name="twitter:description"
        content="Get up-to-date weather forecasts and candle lighting times for Shabbos."
      />
    </Helmet>
  );
};
export default SeoHelmet;
