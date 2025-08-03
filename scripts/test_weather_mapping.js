// Test script to validate weather icon mapping
// Run with: node test_weather_mapping.js

// Import the mapping functions (you'll need to adjust the path based on your setup)
// For testing purposes, we'll define the functions here

const weatherIcons = {
  // Clear/Sunny conditions
  sunny: "/img/weather/sunny.svg",
  clear: "/img/weather/clear.svg",
  mostlyClear: "/img/weather/mostly-clear.svg",
  mostlySunny: "/img/weather/mostly-sunny.svg",

  // Cloudy conditions
  cloudy: "/img/weather/cloudy.svg",
  mostlyCloudy: "/img/weather/mostly-cloudy.svg",
  partlyCloudy: "/img/weather/partly-cloudy.svg",
  partlySunny: "/img/weather/partly-sunny.svg",

  // Rain conditions
  rain: "/img/weather/rain.svg",
  lightRain: "/img/weather/light-rain.svg",
  heavyRain: "/img/weather/heavy-rain.svg",
  rainShowers: "/img/weather/rain-showers.svg",

  // Thunderstorm conditions
  thunderstorm: "/img/weather/thunderstorm.svg",
  thunderstorms: "/img/weather/thunderstorms.svg",

  // Snow conditions
  snow: "/img/weather/snow.svg",
  lightSnow: "/img/weather/light-snow.svg",
  heavySnow: "/img/weather/heavy-snow.svg",

  // Mixed conditions
  rainAndSnow: "/img/weather/rain-snow.svg",
  sleet: "/img/weather/sleet.svg",

  // Fog/Mist conditions
  fog: "/img/weather/fog.svg",
  mist: "/img/weather/mist.svg",
  haze: "/img/weather/haze.svg",
  patchyFog: "/img/weather/patchy-fog.svg",

  // Wind conditions
  windy: "/img/weather/windy.svg",
  breezy: "/img/weather/breezy.svg",

  // Smoke/Haze conditions
  smoke: "/img/weather/smoke.svg",

  // Default fallback
  default: "/img/weather/default.svg",
};

const getWeatherIconKey = (shortForecast, isDaytime = true) => {
  if (!shortForecast) return "default";

  const forecast = shortForecast.toLowerCase();

  // Handle complex multi-condition forecasts
  // We'll use the first condition for the icon

  // Clear/Sunny conditions
  if (forecast.includes("sunny")) return "sunny";
  if (forecast.includes("clear")) return "clear";
  if (forecast.includes("mostly clear")) return "mostlyClear";
  if (forecast.includes("mostly sunny")) return "mostlySunny";

  // Cloudy conditions
  if (forecast.includes("cloudy")) {
    if (forecast.includes("mostly cloudy")) return "mostlyCloudy";
    if (forecast.includes("partly cloudy")) return "partlyCloudy";
    return "cloudy";
  }

  // Partly Sunny conditions
  if (forecast.includes("partly sunny")) return "partlySunny";

  // Rain conditions
  if (forecast.includes("rain")) {
    if (forecast.includes("heavy rain") || forecast.includes("heavy rainfall"))
      return "heavyRain";
    if (forecast.includes("light rain") || forecast.includes("drizzle"))
      return "lightRain";
    if (forecast.includes("rain showers") || forecast.includes("showers"))
      return "rainShowers";
    return "rain";
  }

  // Thunderstorm conditions
  if (forecast.includes("thunderstorm")) {
    if (forecast.includes("thunderstorms")) return "thunderstorms";
    return "thunderstorm";
  }

  // Snow conditions
  if (forecast.includes("snow")) {
    if (forecast.includes("heavy snow")) return "heavySnow";
    if (forecast.includes("light snow")) return "lightSnow";
    return "snow";
  }

  // Mixed conditions
  if (forecast.includes("rain") && forecast.includes("snow"))
    return "rainAndSnow";
  if (forecast.includes("sleet")) return "sleet";

  // Fog/Mist conditions
  if (forecast.includes("fog")) {
    if (forecast.includes("patchy fog")) return "patchyFog";
    return "fog";
  }
  if (forecast.includes("mist")) return "mist";
  if (forecast.includes("haze")) return "haze";

  // Wind conditions
  if (forecast.includes("windy")) return "windy";
  if (forecast.includes("breezy")) return "breezy";

  // Smoke conditions
  if (forecast.includes("smoke")) return "smoke";

  // Chance conditions - use the base weather type
  if (forecast.includes("chance")) {
    if (forecast.includes("rain")) return "rainShowers";
    if (forecast.includes("snow")) return "lightSnow";
    if (forecast.includes("thunderstorm")) return "thunderstorm";
  }

  // Slight chance conditions
  if (forecast.includes("slight chance")) {
    if (forecast.includes("rain")) return "lightRain";
    if (forecast.includes("snow")) return "lightSnow";
    if (forecast.includes("thunderstorm")) return "thunderstorm";
  }

  // Likely conditions
  if (forecast.includes("likely")) {
    if (forecast.includes("rain")) return "rain";
    if (forecast.includes("snow")) return "snow";
    if (forecast.includes("thunderstorm")) return "thunderstorms";
  }

  return "default";
};

const getWeatherIcon = (shortForecast, isDaytime = true) => {
  const iconKey = getWeatherIconKey(shortForecast, isDaytime);
  return weatherIcons[iconKey] || weatherIcons.default;
};

// Test all discovered forecasts
const discoveredForecasts = [
  "Chance Rain Showers",
  "Chance Rain Showers then Chance Showers And Thunderstorms",
  "Chance Showers And Thunderstorms",
  "Chance Showers And Thunderstorms then Mostly Cloudy",
  "Chance Showers And Thunderstorms then Partly Cloudy",
  "Chance Showers And Thunderstorms then Showers And Thunderstorms Likely",
  "Chance Showers And Thunderstorms then Slight Chance Showers And Thunderstorms",
  "Clear",
  "Mostly Clear",
  "Mostly Clear then Patchy Fog",
  "Mostly Cloudy",
  "Mostly Cloudy then Patchy Fog",
  "Mostly Cloudy then Slight Chance Rain Showers",
  "Mostly Sunny",
  "Mostly Sunny then Chance Showers And Thunderstorms",
  "Mostly Sunny then Slight Chance Showers And Thunderstorms",
  "Partly Cloudy",
  "Partly Cloudy then Chance Showers And Thunderstorms",
  "Partly Cloudy then Patchy Fog",
  "Partly Cloudy then Slight Chance Rain Showers",
  "Partly Cloudy then Slight Chance Showers And Thunderstorms",
  "Partly Sunny",
  "Partly Sunny then Chance Showers And Thunderstorms",
  "Partly Sunny then Showers And Thunderstorms Likely",
  "Partly Sunny then Slight Chance Showers And Thunderstorms",
  "Patchy Fog",
  "Patchy Fog then Chance Showers And Thunderstorms",
  "Patchy Fog then Mostly Sunny",
  "Patchy Fog then Partly Sunny",
  "Patchy Fog then Sunny",
  "Rain Showers Likely",
  "Showers And Thunderstorms",
  "Showers And Thunderstorms Likely",
  "Showers And Thunderstorms Likely then Chance Showers And Thunderstorms",
  "Showers And Thunderstorms Likely then Showers And Thunderstorms",
  "Showers And Thunderstorms then Chance Showers And Thunderstorms",
  "Slight Chance Rain Showers",
  "Slight Chance Rain Showers then Chance Showers And Thunderstorms",
  "Slight Chance Rain Showers then Partly Cloudy",
  "Slight Chance Rain Showers then Slight Chance Showers And Thunderstorms",
  "Slight Chance Showers And Thunderstorms",
  "Slight Chance Showers And Thunderstorms then Chance Showers And Thunderstorms",
  "Slight Chance Showers And Thunderstorms then Mostly Clear",
  "Slight Chance Showers And Thunderstorms then Partly Cloudy",
  "Slight Chance Showers And Thunderstorms then Showers And Thunderstorms Likely",
  "Sunny",
  "Sunny then Patchy Smoke",
  "Sunny then Slight Chance Showers And Thunderstorms",
];

console.log("🌤️  Weather Icon Mapping Test Results\n");
console.log("=".repeat(80));

// Group by icon type for better readability
const iconGroups = {};

discoveredForecasts.forEach((forecast) => {
  const iconKey = getWeatherIconKey(forecast, true);
  const iconPath = getWeatherIcon(forecast, true);

  if (!iconGroups[iconKey]) {
    iconGroups[iconKey] = [];
  }
  iconGroups[iconKey].push(forecast);
});

// Display results grouped by icon
Object.keys(iconGroups)
  .sort()
  .forEach((iconKey) => {
    console.log(`\n📁 ${iconKey.toUpperCase()}:`);
    console.log(`   Icon: ${weatherIcons[iconKey]}`);
    console.log(`   Forecasts (${iconGroups[iconKey].length}):`);

    iconGroups[iconKey].forEach((forecast) => {
      console.log(`     • ${forecast}`);
    });
  });

// Summary
console.log("\n" + "=".repeat(80));
console.log("📊 SUMMARY:");
console.log(`Total forecasts: ${discoveredForecasts.length}`);
console.log(`Unique icons needed: ${Object.keys(iconGroups).length}`);
console.log(`Icon types: ${Object.keys(iconGroups).sort().join(", ")}`);

// Check for any unmapped forecasts
const unmapped = discoveredForecasts.filter((forecast) => {
  const iconKey = getWeatherIconKey(forecast, true);
  return iconKey === "default";
});

if (unmapped.length > 0) {
  console.log(`\n⚠️  UNMAPPED FORECASTS (${unmapped.length}):`);
  unmapped.forEach((forecast) => {
    console.log(`   • ${forecast}`);
  });
} else {
  console.log("\n✅ All forecasts are mapped to icons!");
}
