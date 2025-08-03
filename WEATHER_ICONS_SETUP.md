# Weather Icons Setup Guide

This guide explains how to implement custom weather icons for the Shabbos Weather Report app.

## Overview

The app now includes a weather icon mapping system that maps weather conditions from the API to custom weather icons. This provides a consistent, branded look across the application.

## Weather Icon Mapping System

### Files Created:

- `src/utils/weatherIconMapping.js` - Main mapping utility
- `WEATHER_ICONS_SETUP.md` - This setup guide

### How It Works:

1. **Weather Condition Detection**: The system analyzes the `shortForecast` text from the weather API
2. **Icon Mapping**: Maps specific weather conditions to custom icon files
3. **Fallback System**: Falls back to API icons if custom icons aren't available
4. **Day/Night Support**: Considers `isDaytime` parameter for appropriate icon selection

## Supported Weather Conditions

The mapping system supports these weather conditions:

### Clear/Sunny

- `sunny` - Sunny conditions
- `clear` - Clear conditions
- `mostlyClear` - Mostly clear conditions
- `mostlySunny` - Mostly sunny conditions

### Cloudy

- `cloudy` - Cloudy conditions
- `mostlyCloudy` - Mostly cloudy conditions
- `partlyCloudy` - Partly cloudy conditions

### Rain

- `rain` - General rain
- `lightRain` - Light rain/drizzle
- `heavyRain` - Heavy rain
- `rainShowers` - Rain showers

### Thunderstorms

- `thunderstorm` - Single thunderstorm
- `thunderstorms` - Multiple thunderstorms

### Snow

- `snow` - General snow
- `lightSnow` - Light snow
- `heavySnow` - Heavy snow

### Mixed Conditions

- `rainAndSnow` - Rain and snow mix
- `sleet` - Sleet conditions

### Fog/Mist

- `fog` - Foggy conditions
- `mist` - Misty conditions
- `haze` - Hazy conditions

### Wind

- `windy` - Windy conditions
- `breezy` - Breezy conditions

## Setting Up Your Weather Icons

### Step 1: Create Icon Directory

Create a directory structure for your weather icons:

```
public/
  img/
    weather/
      sunny.svg
      clear.svg
      mostly-clear.svg
      mostly-sunny.svg
      cloudy.svg
      mostly-cloudy.svg
      partly-cloudy.svg
      rain.svg
      light-rain.svg
      heavy-rain.svg
      rain-showers.svg
      thunderstorm.svg
      thunderstorms.svg
      snow.svg
      light-snow.svg
      heavy-snow.svg
      rain-snow.svg
      sleet.svg
      fog.svg
      mist.svg
      haze.svg
      windy.svg
      breezy.svg
      default.svg
```

### Step 2: Add Your Icons

Place your weather icon SVG files in the `public/img/weather/` directory. Make sure the filenames match the paths defined in `weatherIconMapping.js`.

### Step 3: Icon Requirements

- **Format**: SVG recommended for scalability
- **Size**: 32x32px for hourly table, 100x100px for summary
- **Style**: Consistent design language across all icons
- **Colors**: Consider both light and dark themes

### Step 4: Update Icon Paths (Optional)

If you use different filenames or directory structure, update the paths in `src/utils/weatherIconMapping.js`:

```javascript
const weatherIcons = {
  sunny: "/your/path/to/sunny.svg",
  clear: "/your/path/to/clear.svg",
  // ... update all paths
};
```

## Usage in Components

### Basic Usage:

```javascript
import { getWeatherIcon } from "../utils/weatherIconMapping.js";

// In your component
<img
  src={getWeatherIcon(weatherData.shortForecast, weatherData.isDaytime)}
  alt={weatherData.shortForecast}
  onError={(e) => {
    e.target.src = weatherData.icon || "/img/weather/default.svg";
  }}
/>;
```

### Advanced Usage:

```javascript
import {
  getWeatherIconKey,
  getWeatherIcon,
} from "../utils/weatherIconMapping.js";

// Get the icon key for conditional styling
const iconKey = getWeatherIconKey(
  weatherData.shortForecast,
  weatherData.isDaytime
);

// Get the icon URL
const iconUrl = getWeatherIcon(
  weatherData.shortForecast,
  weatherData.isDaytime
);
```

## API Integration

The system works with the existing weather API data structure:

```javascript
// Example API response
{
  shortForecast: "Sunny",
  isDaytime: true,
  icon: "https://api.weather.gov/icons/land/day/few?size=small"
}
```

## Fallback System

The system includes a robust fallback mechanism:

1. **Primary**: Custom weather icon based on `shortForecast`
2. **Secondary**: API-provided icon if custom icon fails to load
3. **Tertiary**: Default icon if both fail

## Testing

To test the icon mapping:

1. Add some sample weather icons to the `public/img/weather/` directory
2. Check the browser console for any 404 errors
3. Verify that fallback icons display correctly
4. Test with different weather conditions

## Customization

### Adding New Weather Conditions:

1. Add the new condition to the `getWeatherIconKey` function
2. Add the corresponding icon file
3. Update the `weatherIcons` object with the new path

### Modifying Icon Logic:

The `getWeatherIconKey` function can be customized to handle:

- Different weather condition text patterns
- Regional weather terminology
- Custom weather classifications

## Troubleshooting

### Common Issues:

1. **Icons not loading**: Check file paths and ensure icons exist
2. **Wrong icons showing**: Verify the mapping logic in `getWeatherIconKey`
3. **Fallback not working**: Ensure the `onError` handler is properly implemented

### Debug Mode:

Add console logging to debug icon selection:

```javascript
const iconKey = getWeatherIconKey(shortForecast, isDaytime);
console.log("Weather:", shortForecast, "Icon Key:", iconKey);
```

## Next Steps

1. **Design Icons**: Create or source weather icons that match your app's design
2. **Test Mapping**: Verify all weather conditions map to appropriate icons
3. **Optimize**: Consider icon optimization for performance
4. **Extend**: Add support for additional weather conditions as needed
