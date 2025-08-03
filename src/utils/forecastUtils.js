/**
 * Removes precipitation-related sentences from detailed forecast text
 * since precipitation probability is already displayed separately in the summary
 * @param {string} detailedForecast - The detailed forecast text to clean
 * @returns {string} - The cleaned forecast text
 */
export const cleanDetailedForecast = (detailedForecast) => {
  if (!detailedForecast) return "";

  // Remove precipitation-related sentences
  const precipitationPatterns = [
    /Chance of precipitation is \d+%\.?/gi,
    /Chance of precipitation \d+%\.?/gi,
    /Precipitation chance is \d+%\.?/gi,
    /Precipitation chance \d+%\.?/gi,
    /There is a \d+% chance of precipitation\.?/gi,
    /A \d+% chance of precipitation\.?/gi,
    /\. Chance of precipitation is \d+%\.?/gi,
    /\. Chance of precipitation \d+%\.?/gi,
    /\. Precipitation chance is \d+%\.?/gi,
    /\. Precipitation chance \d+%\.?/gi,
    /\. There is a \d+% chance of precipitation\.?/gi,
    /\. A \d+% chance of precipitation\.?/gi,
  ];

  let cleanedForecast = detailedForecast;
  precipitationPatterns.forEach((pattern) => {
    cleanedForecast = cleanedForecast.replace(pattern, "");
  });

  // Clean up any double spaces or periods that might be left
  cleanedForecast = cleanedForecast.replace(/\s+/g, " ").trim();
  cleanedForecast = cleanedForecast.replace(/\.\s*\./g, ".");
  cleanedForecast = cleanedForecast.replace(/^\s*\.\s*/, "");

  return cleanedForecast;
};
