/**
 * Weather icon mapping utility
 * Maps weather conditions from the API to custom weather icons
 */

import { isDaytimeEnhanced } from "./dayNightUtils.js";

// Weather icons based on actual files in public/assets/weather/
// Using fallbacks for missing day/night combinations
const weatherIcons = {
  // Clear/Sunny conditions
  sunny: {
    day: "/assets/weather/sunny-day.svg",
    night: "/assets/weather/sunny-day.svg", // Fallback to day version
  },
  clear: {
    day: "/assets/weather/sunny-day.svg", // Using sunny-day as fallback
    night: "/assets/weather/clear-night.svg",
  },
  mostlyClear: {
    day: "/assets/weather/mostly-cloudy-day.svg", // Using mostly-cloudy as fallback
    night: "/assets/weather/clear-night.svg",
  },
  mostlySunny: {
    day: "/assets/weather/sunny-day.svg",
    night: "/assets/weather/sunny-day.svg", // Fallback to day version
  },

  // Cloudy conditions
  cloudy: {
    day: "/assets/weather/mostly-cloudy-day.svg",
    night: "/assets/weather/mostly-cloudy-day.svg", // Fallback to day version
  },
  mostlyCloudy: {
    day: "/assets/weather/mostly-cloudy-day.svg",
    night: "/assets/weather/mostly-cloudy-day.svg", // Fallback to day version
  },
  partlyCloudy: {
    day: "/assets/weather/partly-cloudy-day.svg",
    night: "/assets/weather/partly-cloudy-night.svg",
  },
  partlySunny: {
    day: "/assets/weather/partly-cloudy-day.svg", // Using partly-cloudy as fallback
    night: "/assets/weather/partly-cloudy-night.svg",
  },

  // Rain conditions
  rain: {
    day: "/assets/weather/rain-day.svg",
    night: "/assets/weather/rain-night.svg",
  },
  lightRain: {
    day: "/assets/weather/rain-day.svg", // Using rain as fallback
    night: "/assets/weather/rain-night.svg",
  },
  heavyRain: {
    day: "/assets/weather/rain-day.svg", // Using rain as fallback
    night: "/assets/weather/rain-night.svg",
  },
  rainShowers: {
    day: "/assets/weather/rain-day.svg", // Using rain as fallback
    night: "/assets/weather/rain-night.svg",
  },

  // Thunderstorm conditions
  thunderstorm: {
    day: "/assets/weather/thunderstorms-day.svg",
    night: "/assets/weather/thunderstorms-day.svg", // Fallback to day version
  },
  thunderstorms: {
    day: "/assets/weather/thunderstorms-day.svg",
    night: "/assets/weather/thunderstorms-day.svg", // Fallback to day version
  },

  // Snow conditions (using rain as fallback)
  snow: {
    day: "/assets/weather/rain-day.svg", // Using rain as fallback
    night: "/assets/weather/rain-night.svg",
  },
  lightSnow: {
    day: "/assets/weather/rain-day.svg", // Using rain as fallback
    night: "/assets/weather/rain-night.svg",
  },
  heavySnow: {
    day: "/assets/weather/rain-day.svg", // Using rain as fallback
    night: "/assets/weather/rain-night.svg",
  },

  // Mixed conditions (using rain as fallback)
  rainAndSnow: {
    day: "/assets/weather/rain-day.svg", // Using rain as fallback
    night: "/assets/weather/rain-night.svg",
  },
  sleet: {
    day: "/assets/weather/rain-day.svg", // Using rain as fallback
    night: "/assets/weather/rain-night.svg",
  },

  // Fog/Mist conditions
  fog: {
    day: "/assets/weather/patchy-fog-day.svg", // Using patchy-fog as fallback
    night: "/assets/weather/patchy-fog-night.svg",
  },
  mist: {
    day: "/assets/weather/patchy-fog-day.svg", // Using patchy-fog as fallback
    night: "/assets/weather/patchy-fog-night.svg",
  },
  haze: {
    day: "/assets/weather/patchy-fog-day.svg", // Using patchy-fog as fallback
    night: "/assets/weather/patchy-fog-night.svg",
  },
  patchyFog: {
    day: "/assets/weather/patchy-fog-day.svg",
    night: "/assets/weather/patchy-fog-night.svg",
  },

  // Wind conditions (using partly-cloudy as fallback)
  windy: {
    day: "/assets/weather/partly-cloudy-day.svg", // Using partly-cloudy as fallback
    night: "/assets/weather/partly-cloudy-night.svg",
  },
  breezy: {
    day: "/assets/weather/partly-cloudy-day.svg", // Using partly-cloudy as fallback
    night: "/assets/weather/partly-cloudy-night.svg",
  },

  // Smoke/Haze conditions (using patchy-fog as fallback)
  smoke: {
    day: "/assets/weather/patchy-fog-day.svg", // Using patchy-fog as fallback
    night: "/assets/weather/patchy-fog-night.svg",
  },

  // Default fallback
  default: {
    day: "/assets/weather/sunny-day.svg", // Using sunny-day as default
    night: "/assets/weather/clear-night.svg",
  },
};

/**
 * Maps weather forecast text to icon keys
 * @param {string} shortForecast - The short forecast text from the API
 * @param {boolean} isDaytime - Whether it's daytime or nighttime
 * @returns {string} - The icon key to use
 */
export const getWeatherIconKey = (shortForecast, isDaytime = true) => {
  if (!shortForecast) return "default";

  const forecast = shortForecast.toLowerCase();

  // Handle complex multi-condition forecasts (e.g., "Partly Cloudy then Slight Chance Rain Showers")
  // We'll use the first condition for the icon, but could be enhanced to show transitions

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

/**
 * Gets the weather icon URL for a given forecast
 * @param {string} shortForecast - The short forecast text from the API
 * @param {boolean} isDaytime - Whether it's daytime or nighttime
 * @returns {string} - The icon URL
 */
export const getWeatherIcon = (shortForecast, isDaytime = true) => {
  const iconKey = getWeatherIconKey(shortForecast, isDaytime);
  const timeOfDay = isDaytime ? "day" : "night";
  return weatherIcons[iconKey]?.[timeOfDay] || weatherIcons.default[timeOfDay];
};

/**
 * Enhanced weather icon function that automatically determines day/night
 * @param {string} shortForecast - The short forecast text from the API
 * @param {Object} weatherData - Weather data object with isDaytime property
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @param {Date} currentTime - Current time (defaults to now)
 * @returns {string} - The icon URL
 */
export const getWeatherIconEnhanced = (
  shortForecast,
  weatherData,
  latitude,
  longitude,
  currentTime = new Date()
) => {
  const isDay = isDaytimeEnhanced(
    weatherData,
    currentTime,
    latitude,
    longitude
  );
  return getWeatherIcon(shortForecast, isDay);
};

/**
 * Gets all available weather icon keys
 * @returns {string[]} - Array of available icon keys
 */
export const getAvailableIconKeys = () => {
  return Object.keys(weatherIcons);
};

/**
 * Gets all weather icon URLs (both day and night versions)
 * @returns {Object} - Object with icon keys and day/night URLs
 */
export const getAllWeatherIcons = () => {
  return { ...weatherIcons };
};

/**
 * Maps all discovered shortForecast values to their corresponding icon keys
 * This function can be used for testing and validation
 * @returns {Object} - Mapping of shortForecast values to icon keys
 */
export const getForecastToIconMapping = () => {
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

  const mapping = {};
  discoveredForecasts.forEach((forecast) => {
    mapping[forecast] = getWeatherIconKey(forecast, true);
  });

  return mapping;
};
