# Scripts Directory

This directory contains utility scripts for the Shabbos Weather Report project.

## discover_weather_conditions.py

A Python script that discovers all possible `shortForecast` values from the weather.gov API by querying multiple locations across the United States.

### Purpose

This script helps ensure that the weather icon mapping system covers all possible weather conditions that the API might return.

### Usage

1. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Update the User-Agent header:**
   Edit the script and replace `"MyWeatherApp (myemail@example.com)"` with your actual application name and contact information.

3. **Run the script:**
   ```bash
   python3 discover_weather_conditions.py
   ```

### Output

The script will:

- Print progress as it fetches data from each location
- Display all unique `shortForecast` values found
- Save results to:
  - `shortForecast_values.json` - JSON format
  - `shortForecast_values.txt` - Plain text format

### Locations Covered

The script queries weather data from 10 major US cities:

- Philadelphia, PA
- New York, NY
- Los Angeles, CA
- Seattle, WA
- Miami, FL
- Minneapolis, MN
- Denver, CO
- Salt Lake City, UT
- Central California
- Kansas

### API Rate Limiting

The script includes a 1-second delay between requests to be respectful to the weather.gov API.

### Integration with Weather Icon Mapping

After running this script, you can:

1. Review the discovered weather conditions
2. Update `src/utils/weatherIconMapping.js` to handle any missing conditions
3. Add corresponding weather icons to `public/img/weather/`

### Example Output

```
Fetching: https://api.weather.gov/gridpoints/PHI/50,76/forecast
Fetching: https://api.weather.gov/gridpoints/OKX/33,35/forecast
...

Unique shortForecast values found:
- Clear
- Mostly Clear
- Mostly Sunny
- Partly Cloudy
- Rain Showers
- Sunny
- Thunderstorms
...
```
