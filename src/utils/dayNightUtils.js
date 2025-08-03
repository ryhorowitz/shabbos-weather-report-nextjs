/**
 * Day/Night utility functions
 * Determines if a location is in daytime or nighttime
 */

/**
 * Calculates sunrise and sunset times for a given date and location
 * @param {Date} date - The date to calculate for
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @returns {Object} - Object with sunrise and sunset times
 */
export const calculateSunTimes = (date, latitude, longitude) => {
  // Convert to radians
  const lat = (latitude * Math.PI) / 180;
  const lon = (longitude * Math.PI) / 180;

  // Calculate day of year
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date - start) / (1000 * 60 * 60 * 24));

  // Solar declination (approximate)
  const declination =
    0.4093 * Math.sin(((2 * Math.PI) / 365) * (dayOfYear - 80));

  // Hour angle
  const hourAngle = Math.acos(
    (-0.0145 - Math.sin(declination) * Math.sin(lat)) /
      (Math.cos(declination) * Math.cos(lat))
  );

  // Convert to hours
  const sunriseHour = 12 - (hourAngle * 180) / Math.PI / 15;
  const sunsetHour = 12 + (hourAngle * 180) / Math.PI / 15;

  // Adjust for longitude
  const timeZoneOffset = longitude / 15;
  const sunriseLocal = sunriseHour - timeZoneOffset;
  const sunsetLocal = sunsetHour - timeZoneOffset;

  return {
    sunrise: sunriseLocal,
    sunset: sunsetLocal,
  };
};

/**
 * Determines if it's currently daytime at a location
 * @param {Date} currentTime - Current time (defaults to now)
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @returns {boolean} - True if daytime, false if nighttime
 */
export const isDaytime = (currentTime = new Date(), latitude, longitude) => {
  const sunTimes = calculateSunTimes(currentTime, latitude, longitude);

  // Get current hour in local time
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;

  return currentHour >= sunTimes.sunrise && currentHour <= sunTimes.sunset;
};

/**
 * Determines if it's currently dark at a location
 * Uses civil twilight (sun 6° below horizon) for "dark" definition
 * @param {Date} currentTime - Current time (defaults to now)
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @returns {boolean} - True if dark, false if light
 */
export const isDark = (currentTime = new Date(), latitude, longitude) => {
  const sunTimes = calculateSunTimes(currentTime, latitude, longitude);

  // Civil twilight is about 30 minutes before sunrise and after sunset
  const civilTwilightOffset = 0.5; // 30 minutes
  const darkStart = sunTimes.sunset + civilTwilightOffset;
  const darkEnd = sunTimes.sunrise - civilTwilightOffset;

  // Get current hour in local time
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;

  // Handle cases where dark period crosses midnight
  if (darkStart > darkEnd) {
    // Normal case: dark period is within same day
    return currentHour >= darkStart || currentHour <= darkEnd;
  } else {
    // Dark period crosses midnight
    return currentHour >= darkStart && currentHour <= darkEnd;
  }
};

/**
 * Gets the appropriate time period (dawn, day, dusk, night)
 * @param {Date} currentTime - Current time (defaults to now)
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @returns {string} - 'dawn', 'day', 'dusk', or 'night'
 */
export const getTimePeriod = (
  currentTime = new Date(),
  latitude,
  longitude
) => {
  const sunTimes = calculateSunTimes(currentTime, latitude, longitude);
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;

  // Define twilight periods (30 minutes each)
  const twilightDuration = 0.5;
  const dawnStart = sunTimes.sunrise - twilightDuration;
  const dawnEnd = sunTimes.sunrise;
  const duskStart = sunTimes.sunset;
  const duskEnd = sunTimes.sunset + twilightDuration;

  if (currentHour >= dawnStart && currentHour < dawnEnd) {
    return "dawn";
  } else if (currentHour >= dawnEnd && currentHour < duskStart) {
    return "day";
  } else if (currentHour >= duskStart && currentHour < duskEnd) {
    return "dusk";
  } else {
    return "night";
  }
};

/**
 * Gets the appropriate weather icon suffix based on time period
 * @param {Date} currentTime - Current time (defaults to now)
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @returns {string} - 'day' or 'night'
 */
export const getWeatherIconSuffix = (
  currentTime = new Date(),
  latitude,
  longitude
) => {
  const timePeriod = getTimePeriod(currentTime, latitude, longitude);

  // Use night icons for dusk, dawn, and night periods
  if (["dusk", "dawn", "night"].includes(timePeriod)) {
    return "night";
  }

  return "day";
};

/**
 * Enhanced version that uses the weather API's isDaytime property if available
 * Falls back to calculation if not available
 * @param {Object} weatherData - Weather data object with isDaytime property
 * @param {Date} currentTime - Current time (defaults to now)
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @returns {boolean} - True if daytime, false if nighttime
 */
export const isDaytimeEnhanced = (
  weatherData,
  currentTime = new Date(),
  latitude,
  longitude
) => {
  // Use API's isDaytime property if available
  if (weatherData && typeof weatherData.isDaytime === "boolean") {
    return weatherData.isDaytime;
  }

  // Fall back to calculation
  return isDaytime(currentTime, latitude, longitude);
};
