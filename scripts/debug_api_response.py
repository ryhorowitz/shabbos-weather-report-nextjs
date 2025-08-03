import requests
import json

# Test with just one location to see the response structure
url = "https://api.weather.gov/gridpoints/PHI/50,76/forecast"

headers = {
    "User-Agent": "ShabbosWeatherApp (test@example.com)",
    "Accept": "application/ld+json",
}

try:
    print(f"Fetching: {url}")
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    data = response.json()

    print(f"Response status: {response.status_code}")
    print(f"Response headers: {dict(response.headers)}")

    # Save the full response for inspection
    with open("debug_response.json", "w") as f:
        json.dump(data, f, indent=2)

    print("\nFull response saved to debug_response.json")

    # Check the structure
    if "properties" in data:
        print("✓ 'properties' key found")
        if "periods" in data["properties"]:
            print(
                f"✓ 'periods' key found with {len(data['properties']['periods'])} items"
            )

            # Show first few periods
            for i, period in enumerate(data["properties"]["periods"][:3]):
                print(f"\nPeriod {i+1}:")
                print(f"  Keys: {list(period.keys())}")
                if "shortForecast" in period:
                    print(f"  shortForecast: {period['shortForecast']}")
                else:
                    print("  ❌ No shortForecast key found")
        else:
            print("❌ No 'periods' key in properties")
    else:
        print("❌ No 'properties' key in response")
        print(f"Top-level keys: {list(data.keys())}")

except Exception as e:
    print(f"Error: {e}")
