# Weather Icon Requirements

Based on the analysis of 48 unique weather conditions from the weather.gov API, here are the exact icons you need to create.

## 📊 Summary

- **Total weather conditions discovered**: 48
- **Unique icons needed**: 7
- **Coverage**: 100% of all discovered conditions are mapped

## 🎯 Required Icons

### 1. **Clear Conditions** (4 forecasts)

**Icon**: `/img/weather/sunny.svg`
**Forecasts**:

- Clear
- Mostly Clear
- Mostly Clear then Patchy Fog
- Slight Chance Showers And Thunderstorms then Mostly Clear

### 2. **Mostly Cloudy** (4 forecasts)

**Icon**: `/img/weather/mostly-cloudy.svg`
**Forecasts**:

- Chance Showers And Thunderstorms then Mostly Cloudy
- Mostly Cloudy
- Mostly Cloudy then Patchy Fog
- Mostly Cloudy then Slight Chance Rain Showers

### 3. **Partly Cloudy** (8 forecasts)

**Icon**: `/img/weather/partly-cloudy.svg`
**Forecasts**:

- Chance Showers And Thunderstorms then Partly Cloudy
- Partly Cloudy
- Partly Cloudy then Chance Showers And Thunderstorms
- Partly Cloudy then Patchy Fog
- Partly Cloudy then Slight Chance Rain Showers
- Partly Cloudy then Slight Chance Showers And Thunderstorms
- Slight Chance Rain Showers then Partly Cloudy
- Slight Chance Showers And Thunderstorms then Partly Cloudy

### 4. **Patchy Fog** (1 forecast)

**Icon**: `/img/weather/patchy-fog.svg`
**Forecasts**:

- Patchy Fog

### 5. **Rain Showers** (6 forecasts)

**Icon**: `/img/weather/rain-showers.svg`
**Forecasts**:

- Chance Rain Showers
- Chance Rain Showers then Chance Showers And Thunderstorms
- Rain Showers Likely
- Slight Chance Rain Showers
- Slight Chance Rain Showers then Chance Showers And Thunderstorms
- Slight Chance Rain Showers then Slight Chance Showers And Thunderstorms

### 6. **Sunny** (13 forecasts)

**Icon**: `/img/weather/sunny.svg`
**Forecasts**:

- Mostly Sunny
- Mostly Sunny then Chance Showers And Thunderstorms
- Mostly Sunny then Slight Chance Showers And Thunderstorms
- Partly Sunny
- Partly Sunny then Chance Showers And Thunderstorms
- Partly Sunny then Showers And Thunderstorms Likely
- Partly Sunny then Slight Chance Showers And Thunderstorms
- Patchy Fog then Mostly Sunny
- Patchy Fog then Partly Sunny
- Patchy Fog then Sunny
- Sunny
- Sunny then Patchy Smoke
- Sunny then Slight Chance Showers And Thunderstorms

### 7. **Thunderstorms** (12 forecasts)

**Icon**: `/img/weather/thunderstorms.svg`
**Forecasts**:

- Chance Showers And Thunderstorms
- Chance Showers And Thunderstorms then Showers And Thunderstorms Likely
- Chance Showers And Thunderstorms then Slight Chance Showers And Thunderstorms
- Patchy Fog then Chance Showers And Thunderstorms
- Showers And Thunderstorms
- Showers And Thunderstorms Likely
- Showers And Thunderstorms Likely then Chance Showers And Thunderstorms
- Showers And Thunderstorms Likely then Showers And Thunderstorms
- Showers And Thunderstorms then Chance Showers And Thunderstorms
- Slight Chance Showers And Thunderstorms
- Slight Chance Showers And Thunderstorms then Chance Showers And Thunderstorms
- Slight Chance Showers And Thunderstorms then Showers And Thunderstorms Likely

## 🎨 Icon Design Guidelines

### **Recommended Specifications:**

- **Format**: SVG (scalable vector graphics)
- **Size**: 32x32px for hourly table, 100x100px for summary
- **Style**: Consistent design language across all icons
- **Colors**: Consider both light and dark themes
- **Transparency**: Use transparent backgrounds

### **Icon Style Suggestions:**

- **Clear/Sunny**: Bright sun with clear sky
- **Mostly Cloudy**: Sun partially obscured by clouds
- **Partly Cloudy**: Sun with scattered clouds
- **Patchy Fog**: Misty/foggy atmosphere
- **Rain Showers**: Rain drops falling
- **Thunderstorms**: Lightning bolt with rain

## 📁 Directory Structure

Create this directory structure in your `public` folder:

```bash
public/
  img/
    weather/
      # Day versions
      sunny-day.svg
      clear-day.svg
      mostly-clear-day.svg
      mostly-sunny-day.svg
      mostly-cloudy-day.svg
      partly-cloudy-day.svg
      partly-sunny-day.svg
      patchy-fog-day.svg
      rain-showers-day.svg
      thunderstorms-day.svg
      default-day.svg

      # Night versions
      sunny-night.svg
      clear-night.svg
      mostly-clear-night.svg
      mostly-sunny-night.svg
      mostly-cloudy-night.svg
      partly-cloudy-night.svg
      partly-sunny-night.svg
      patchy-fog-night.svg
      rain-showers-night.svg
      thunderstorms-night.svg
      default-night.svg
```

## 🔧 Implementation Notes

### **Day/Night Detection:**

The system automatically detects whether it's daytime or nighttime at the user's location and displays appropriate weather icons:

- **Day icons**: Bright, colorful icons for daytime conditions
- **Night icons**: Darker, muted icons for nighttime conditions

**Automatic Detection:**

- Uses the weather API's `isDaytime` property when available
- Falls back to astronomical calculations based on latitude/longitude
- Considers civil twilight (30 minutes before sunrise/after sunset)

**Usage in Components:**

```javascript
import { getWeatherIconEnhanced } from "../utils/weatherIconMapping.js";

// Automatic day/night detection
const iconPath = getWeatherIconEnhanced(
  weatherData.shortForecast,
  weatherData, // Contains isDaytime property
  latitude, // User's latitude
  longitude, // User's longitude
  new Date() // Current time (optional)
);
```

### **Complex Forecasts:**

Many forecasts contain multiple conditions (e.g., "Partly Cloudy then Slight Chance Rain Showers"). The mapping system uses the **first condition** for the icon selection. This provides a good visual representation while keeping the system simple.

### **Fallback System:**

The system includes a robust fallback mechanism:

1. **Primary**: Custom weather icon based on `shortForecast`
2. **Secondary**: API-provided icon if custom icon fails to load
3. **Tertiary**: Default icon if both fail

### **Testing:**

Use the test script to validate your icons:

```bash
cd scripts
node test_weather_mapping.js
```

## 🚀 Next Steps

1. **Create the 7 required icons** in SVG format
2. **Place them in** `public/img/weather/`
3. **Test the mapping** with the test script
4. **Verify in your app** that icons display correctly
5. **Add a default icon** for any unmapped conditions

## 📈 Coverage Analysis

The mapping system successfully covers **100%** of discovered weather conditions with just **7 unique icons**. This is an efficient approach that provides good visual representation while minimizing the number of required assets.

### **Icon Usage Distribution:**

- **Sunny**: 13 forecasts (27%)
- **Thunderstorms**: 12 forecasts (25%)
- **Partly Cloudy**: 8 forecasts (17%)
- **Rain Showers**: 6 forecasts (13%)
- **Clear**: 4 forecasts (8%)
- **Mostly Cloudy**: 4 forecasts (8%)
- **Patchy Fog**: 1 forecast (2%)

This distribution shows that sunny and stormy conditions are the most common, which aligns with typical weather patterns.
