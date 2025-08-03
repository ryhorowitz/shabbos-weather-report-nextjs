// Test script for day/night detection
// Run with: node test_day_night.js

// Mock the day/night utilities for testing
const calculateSunTimes = (date, latitude, longitude) => {
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

const isDaytime = (currentTime = new Date(), latitude, longitude) => {
  const sunTimes = calculateSunTimes(currentTime, latitude, longitude);
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
  return currentHour >= sunTimes.sunrise && currentHour <= sunTimes.sunset;
};

const getTimePeriod = (currentTime = new Date(), latitude, longitude) => {
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

// Test locations
const testLocations = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Miami", lat: 25.7617, lon: -80.1918 },
  { name: "Seattle", lat: 47.6062, lon: -122.3321 },
  { name: "Denver", lat: 39.7392, lon: -104.9903 },
  { name: "Anchorage", lat: 61.2181, lon: -149.9003 },
];

// Test times (different times of day)
const testTimes = [
  { name: "Early Morning", time: new Date(2025, 6, 29, 6, 0) }, // 6:00 AM
  { name: "Mid Morning", time: new Date(2025, 6, 29, 10, 0) }, // 10:00 AM
  { name: "Noon", time: new Date(2025, 6, 29, 12, 0) }, // 12:00 PM
  { name: "Afternoon", time: new Date(2025, 6, 29, 15, 0) }, // 3:00 PM
  { name: "Evening", time: new Date(2025, 6, 29, 18, 0) }, // 6:00 PM
  { name: "Night", time: new Date(2025, 6, 29, 22, 0) }, // 10:00 PM
  { name: "Late Night", time: new Date(2025, 6, 29, 2, 0) }, // 2:00 AM
];

console.log("🌅 Day/Night Detection Test Results\n");
console.log("=".repeat(80));

// Test each location at different times
testLocations.forEach((location) => {
  console.log(
    `\n📍 ${location.name} (${location.lat.toFixed(2)}°, ${location.lon.toFixed(
      2
    )}°)`
  );
  console.log("-".repeat(60));

  testTimes.forEach((timeTest) => {
    const sunTimes = calculateSunTimes(
      timeTest.time,
      location.lat,
      location.lon
    );
    const isDay = isDaytime(timeTest.time, location.lat, location.lon);
    const timePeriod = getTimePeriod(timeTest.time, location.lat, location.lon);

    console.log(
      `${timeTest.name.padEnd(12)} | ${timeTest.time
        .toLocaleTimeString()
        .padEnd(8)} | ` +
        `${isDay ? "☀️ Day" : "🌙 Night"} | ${timePeriod.padEnd(4)} | ` +
        `Sunrise: ${sunTimes.sunrise.toFixed(
          1
        )}h, Sunset: ${sunTimes.sunset.toFixed(1)}h`
    );
  });
});

// Test weather icon mapping
console.log("\n" + "=".repeat(80));
console.log("🌤️ Weather Icon Day/Night Mapping Examples\n");

const weatherIcons = {
  sunny: {
    day: "/img/weather/sunny-day.svg",
    night: "/img/weather/sunny-night.svg",
  },
  clear: {
    day: "/img/weather/clear-day.svg",
    night: "/img/weather/clear-night.svg",
  },
  thunderstorms: {
    day: "/img/weather/thunderstorms-day.svg",
    night: "/img/weather/thunderstorms-night.svg",
  },
};

const getWeatherIcon = (shortForecast, isDaytime) => {
  // Simplified mapping for demo
  let iconKey = "clear";
  if (shortForecast.toLowerCase().includes("sunny")) iconKey = "sunny";
  if (shortForecast.toLowerCase().includes("thunderstorm"))
    iconKey = "thunderstorms";

  const timeOfDay = isDaytime ? "day" : "night";
  return weatherIcons[iconKey]?.[timeOfDay] || weatherIcons.clear[timeOfDay];
};

const testForecasts = ["Sunny", "Clear", "Showers And Thunderstorms"];
const testLocation = { lat: 40.7128, lon: -74.006 }; // New York

testForecasts.forEach((forecast) => {
  console.log(`\n📋 Forecast: "${forecast}"`);
  testTimes.slice(0, 3).forEach((timeTest) => {
    const isDay = isDaytime(timeTest.time, testLocation.lat, testLocation.lon);
    const iconPath = getWeatherIcon(forecast, isDay);
    console.log(
      `  ${timeTest.name.padEnd(12)} | ${timeTest.time
        .toLocaleTimeString()
        .padEnd(8)} | ` + `${isDay ? "☀️" : "🌙"} | Icon: ${iconPath}`
    );
  });
});

console.log("\n" + "=".repeat(80));
console.log("📊 Summary:");
console.log(`• Tested ${testLocations.length} locations`);
console.log(`• Tested ${testTimes.length} different times of day`);
console.log(`• Each location shows sunrise/sunset times and day/night status`);
console.log(`• Weather icons automatically switch between day/night versions`);
console.log("\n🎯 Next Steps:");
console.log("1. Create day and night versions of your weather icons");
console.log("2. Use getWeatherIconEnhanced() in your components");
console.log(
  "3. Pass location coordinates and weather data for automatic day/night detection"
);
