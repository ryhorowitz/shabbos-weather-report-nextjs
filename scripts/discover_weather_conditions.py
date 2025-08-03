import requests
import time
import json

# Gridpoints to test: [office, gridX, gridY]
locations = [
    ["PHI", 50, 76],  # Philadelphia
    ["OKX", 33, 35],  # New York
    ["LOX", 154, 44],  # Los Angeles
    ["LOT", 74, 70],  # Chicago
    ["HGX", 70, 96],  # Houston
    ["PSR", 65, 60],  # Phoenix
    ["SEW", 129, 68],  # Seattle
    ["BOU", 62, 61],  # Denver
    ["SLC", 122, 146],  # Salt Lake City
    ["HNX", 97, 47],  # Central California
    ["TOP", 44, 59],  # Kansas
    ["BOX", 70, 84],  # Boston
    ["MPX", 107, 71],  # Minneapolis
    ["AFC", 121, 98],  # Anchorage
    ["HFO", 22, 20],  # Honolulu
    ["VEF", 90, 60],  # Las Vegas
    ["DTX", 60, 75],  # Detroit
    ["FFC", 60, 75],  # Atlanta
    ["LSX", 80, 68],  # St. Louis
    ["LIX", 70, 60],  # New Orleans
    ["MTR", 88, 126],  # San Francisco
    ["MFL", 110, 57],  # Miami
]

headers = {
    "User-Agent": "ShabbosWeatherApp (test@example.com)",  # Replace with your info
    "Accept": "application/ld+json",
}

unique_forecasts = set()

for office, x, y in locations:
    url = f"https://api.weather.gov/gridpoints/{office}/{x},{y}/forecast"
    try:
        print(f"Fetching: {url}")
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()

        # Fixed: periods is at the top level, not under properties
        for period in data.get("periods", []):
            short = period.get("shortForecast")
            if short:
                unique_forecasts.add(short)
                print(f"  Found: {short}")
    except Exception as e:
        print(f"Error fetching from {url}: {e}")
    time.sleep(1)  # Be polite to the API

# Convert to sorted list
sorted_forecasts = sorted(unique_forecasts)

# Print results
print(f"\nUnique shortForecast values found ({len(sorted_forecasts)} total):")
for forecast in sorted_forecasts:
    print("-", forecast)

# Optionally save to file
with open("shortForecast_values.json", "w") as f:
    json.dump(sorted_forecasts, f, indent=2)

# Or as plain text
with open("shortForecast_values.txt", "w") as f:
    for forecast in sorted_forecasts:
        f.write(forecast + "\n")

print(f"\nResults saved to:")
print("- shortForecast_values.json")
print("- shortForecast_values.txt")
