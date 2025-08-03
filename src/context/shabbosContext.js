import React, { createContext, useContext, useState, useEffect } from "react";

const ShabbosContext = createContext();

export const useShabbos = () => {
  const context = useContext(ShabbosContext);
  if (!context) {
    throw new Error("useShabbos must be used within a ShabbosProvider");
  }
  return context;
};

export const ShabbosProvider = ({ children }) => {
  // Candle logic
  const [candleData, setCandleData] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [candleLoading, setCandleLoading] = useState(true);
  const [candleError, setCandleError] = useState(null);

  useEffect(() => {
    const getGeoData = async () => {
      // Use browser geolocation with reverse geocoding
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(`Location: Latitude: ${lat}, Longitude: ${lon}`);
            console.log("Position:", position);

            // Try to get city and region from coordinates using reverse geocoding
            let city = "Unknown";
            let region = "Unknown";

            try {
              // Use a free reverse geocoding service
              const reverseGeocodeResponse = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
              );
              if (reverseGeocodeResponse.ok) {
                const geoData = await reverseGeocodeResponse.json();
                city = geoData.city || geoData.locality || "Unknown";
                region =
                  geoData.principalSubdivision ||
                  geoData.countryName ||
                  "Unknown";
                console.log("Reverse geocoding result:", geoData);
              }
            } catch (reverseError) {
              console.error("Reverse geocoding failed:", reverseError);
            }

            // Create geoData object with same structure as ipinfo.io
            const fallbackGeoData = {
              loc: `${lat},${lon}`,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              city: city,
              region: region,
            };
            setGeoData(fallbackGeoData);
          },
          (error) => {
            console.error("Geolocation error:", error);
            setCandleError("Failed to get location data");
            setCandleLoading(false);
          }
        );
      } else {
        console.error("Geolocation not supported");
        setCandleError("Failed to get location data");
        setCandleLoading(false);
      }
    };
    getGeoData();
  }, []);

  useEffect(() => {
    if (!geoData) return;
    const fetchCandleTimes = async () => {
      try {
        setCandleLoading(true);
        setCandleError(null);
        const lat = geoData.loc.split(",")[0];
        const lon = geoData.loc.split(",")[1];
        const timezone = geoData.timezone;
        const response = await fetch(
          `https://www.hebcal.com/shabbat?cfg=json&latitude=${lat}&longitude=${lon}&tzid=${timezone}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch candle times");
        }
        const data = await response.json();
        setCandleData(data);
      } catch (err) {
        console.error("Error fetching candle times:", err);
        setCandleError(err.message);
      } finally {
        setCandleLoading(false);
      }
    };
    fetchCandleTimes();
  }, [geoData]);

  // Weather.gov logic
  const [hourlyURL, setHourlyURL] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null);

  // Step 1: Get grid info from weather.gov
  useEffect(() => {
    const fetchHourlyURL = async () => {
      if (!geoData) return;
      try {
        const [lat, lon] = geoData.loc.split(",");
        const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
        const response = await fetch(pointsUrl);
        if (!response.ok) throw new Error("Failed to fetch grid info");
        const data = await response.json();
        setHourlyURL(data.properties.forecastHourly);
        setDailyForecastURL(data.properties.forecast);
      } catch (err) {
        setWeatherError("Failed to get grid info");
        setWeatherLoading(false);
      }
    };
    if (geoData?.loc) fetchHourlyURL();
  }, [geoData]);

  // Step 2: Get hourly forecast from weather.gov
  useEffect(() => {
    const fetchHourlyForecast = async () => {
      if (!hourlyURL) return;
      try {
        setWeatherLoading(true);
        setWeatherError(null);
        const response = await fetch(hourlyURL);
        if (!response.ok) throw new Error("Failed to fetch hourly forecast");
        const data = await response.json();
        setWeatherData(data.properties.periods);
      } catch (err) {
        setWeatherError("Failed to fetch weather data");
      } finally {
        setWeatherLoading(false);
      }
    };
    if (hourlyURL) fetchHourlyForecast();
  }, [hourlyURL]);

  // Step 3: Get daily (12hr) forecast from weather.gov
  const [dailyForecastURL, setDailyForecastURL] = useState(null);
  useEffect(() => {
    const fetchDailyForecast = async () => {
      if (!dailyForecastURL) return;
      try {
        const response = await fetch(dailyForecastURL);
        if (!response.ok) throw new Error("Failed to fetch daily forecast");
        const data = await response.json();
        setDailyForecastData(data.properties.periods);
      } catch (err) {
        setWeatherError("Failed to fetch daily forecast");
      }
    };
    if (dailyForecastURL) fetchDailyForecast();
  }, [dailyForecastURL]);

  // Helper: Get forecast periods for a given date and list of hours (local time)
  const getForecastForDateAndHours = (dateObj, hoursArr) => {
    if (!weatherData) return [];
    // dateObj: JS Date, hoursArr: [16, 20, 0] etc.
    return hoursArr.map((hour) => {
      // For 0 (midnight), if date is Friday, midnight is technically Saturday
      let targetDate = new Date(dateObj);
      if (hour === 0) {
        targetDate.setDate(targetDate.getDate() + 1);
      }
      targetDate.setHours(hour, 0, 0, 0);
      // Find the period with matching startTime (local)
      return weatherData.find((period) => {
        const periodDate = new Date(period.startTime);
        return (
          periodDate.getFullYear() === targetDate.getFullYear() &&
          periodDate.getMonth() === targetDate.getMonth() &&
          periodDate.getDate() === targetDate.getDate() &&
          periodDate.getHours() === targetDate.getHours()
        );
      });
    });
  };

  // Helper: Get daily summary for a given date (returns the first period that matches the date)
  const getDailySummaryForDate = (dateObj) => {
    if (!dailyForecastData) return null;
    return dailyForecastData.find((period) => {
      const periodDate = new Date(period.startTime);
      return (
        periodDate.getFullYear() === dateObj.getFullYear() &&
        periodDate.getMonth() === dateObj.getMonth() &&
        periodDate.getDate() === dateObj.getDate()
      );
    });
  };

  // Helper: Get Friday and Saturday forecast periods for the required hours
  const getShabbosForecasts = (candleData) => {
    // Use extractCandleItems to get Friday and Saturday dates
    // Friday: 4pm (16), 8pm (20), 12am (0, Sat)
    // Saturday: 8am (8), 12pm (12), 4pm (16), 8pm (20)
    if (!candleData) return { friday: [], saturday: [] };
    // Get Friday candle lighting date (should be Friday)
    let fridayDate = null;
    let saturdayDate = null;
    try {
      const { candleItem, havdalahItem } =
        require("../utils/candleDataUtils.js").extractCandleItems(candleData);
      if (candleItem && candleItem.date) fridayDate = new Date(candleItem.date);
      if (havdalahItem && havdalahItem.date)
        saturdayDate = new Date(havdalahItem.date);
      // For Saturday, use the date part of havdalah (should be Sat night)
      if (saturdayDate) saturdayDate.setHours(0, 0, 0, 0);
    } catch (e) {}
    return {
      friday: fridayDate
        ? getForecastForDateAndHours(fridayDate, [16, 20, 0])
        : [],
      saturday: fridayDate
        ? getForecastForDateAndHours(
            new Date(fridayDate.getTime() + 24 * 60 * 60 * 1000),
            [8, 12, 16, 20]
          )
        : [],
    };
  };

  // Helper: Get Friday and Saturday daily summaries
  const getShabbosDailySummaries = (candleData) => {
    if (!candleData) return { friday: null, saturday: null };
    let fridayDate = null;
    let saturdayDate = null;
    try {
      const { candleItem, havdalahItem } =
        require("../utils/candleDataUtils.js").extractCandleItems(candleData);
      if (candleItem && candleItem.date) fridayDate = new Date(candleItem.date);
      if (havdalahItem && havdalahItem.date)
        saturdayDate = new Date(havdalahItem.date);
      if (saturdayDate) saturdayDate.setHours(0, 0, 0, 0);
    } catch (e) {}
    return {
      friday: fridayDate ? getDailySummaryForDate(fridayDate) : null,
      saturday: fridayDate
        ? getDailySummaryForDate(
            new Date(fridayDate.getTime() + 24 * 60 * 60 * 1000)
          )
        : null,
    };
  };

  // Helper: Get hourly forecasts for a specific date range
  const getHourlyForecastsForDateRange = (startDate, endDate) => {
    if (!weatherData) return [];

    return weatherData.filter((period) => {
      const periodDate = new Date(period.startTime);
      return periodDate >= startDate && periodDate <= endDate;
    });
  };

  // Helper: Get Friday and Saturday hourly forecasts
  const getShabbosHourlyForecasts = (candleData) => {
    if (!candleData) return { friday: [], saturday: [] };

    let fridayDate = null;
    let saturdayDate = null;
    try {
      const { candleItem, havdalahItem } =
        require("../utils/candleDataUtils.js").extractCandleItems(candleData);
      if (candleItem && candleItem.date) fridayDate = new Date(candleItem.date);
      if (havdalahItem && havdalahItem.date)
        saturdayDate = new Date(havdalahItem.date);
    } catch (e) {}

    if (!fridayDate) return { friday: [], saturday: [] };

    // Friday: from 4pm to 11pm (candle lighting to end of Friday)
    const fridayStart = new Date(fridayDate);
    fridayStart.setHours(16, 0, 0, 0);
    const fridayEnd = new Date(fridayDate);
    fridayEnd.setHours(23, 59, 59, 999);

    // Saturday: from 8am to 8pm (morning to evening)
    const saturdayStart = new Date(fridayDate.getTime() + 24 * 60 * 60 * 1000);
    saturdayStart.setHours(8, 0, 0, 0);
    const saturdayEnd = new Date(fridayDate.getTime() + 24 * 60 * 60 * 1000);
    saturdayEnd.setHours(20, 59, 59, 999);

    return {
      friday: getHourlyForecastsForDateRange(fridayStart, fridayEnd),
      saturday: getHourlyForecastsForDateRange(saturdayStart, saturdayEnd),
    };
  };

  const value = {
    // Candle
    candleData,
    geoData,
    candleLoading,
    candleError,
    // Weather
    weatherData, // array of hourly periods
    weatherLoading,
    weatherError,
    getShabbosForecasts,
    getShabbosDailySummaries,
    getShabbosHourlyForecasts,
  };

  return (
    <ShabbosContext.Provider value={value}>{children}</ShabbosContext.Provider>
  );
};
