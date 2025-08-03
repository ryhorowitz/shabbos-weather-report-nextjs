import React from "react";
import { Document, Page, Text, View, Font, Svg } from "@react-pdf/renderer";
import { usePDFStyles } from "../../context/PDFStylesContext";
import { extractCandleItems } from "../../utils/candleDataUtils.js";
import { cleanDetailedForecast } from "../../utils/forecastUtils.js";
import { getPDFWeatherIcon } from "../../utils/pdfWeatherIcons.js";
import DailySummaryPDF from "./DailySummaryPDF.jsx";

// Register a default font
Font.register({
  family: "Helvetica",
  src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf",
});
Font.register({
  family: "NotoSansHebrew",
  src: "/fonts/static/NotoSansHebrew-Regular.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});

const WeatherPDF = ({
  fridayPeriods,
  saturdayPeriods,
  fridaySummary,
  saturdaySummary,
  fridayHourly,
  saturdayHourly,
  candleData,
  geoData,
  forecastType = "daily", // "daily" or "hourly"
}) => {
  const styles = usePDFStyles();

  const { candleItem, parshahItem, havdalahItem } =
    extractCandleItems(candleData);

  const getTimeLabel = (period, dayLabel) => {
    if (dayLabel === "Friday") {
      if (period.temperature) {
        const hour = new Date(period.startTime).getHours();
        if (hour === 16) return "Afternoon 4pm";
        if (hour === 20) return "Evening 8pm";
        if (hour === 0) return "Night 12am";
      }
    } else if (dayLabel === "Saturday") {
      if (period.temperature) {
        const hour = new Date(period.startTime).getHours();
        if (hour === 8) return "Morning 8am";
        if (hour === 12) return "Day 12pm";
        if (hour === 16) return "Afternoon 4pm";
        if (hour === 20) return "Evening 8pm";
      }
    }
    return period.name || "";
  };

  const formatHourlyTime = (startTime) => {
    const date = new Date(startTime);
    const hour = date.getHours();
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12}${ampm}`;
  };

  const parshahEnglish = "Parshas " + parshahItem.title.split(" ")[1];

  // Error handling
  if (!fridayPeriods || !saturdayPeriods || !candleData || !geoData) {
    console.error("WeatherPDF: Missing required props", {
      fridayPeriods: !!fridayPeriods,
      saturdayPeriods: !!saturdayPeriods,
      candleData: !!candleData,
      geoData: !!geoData,
    });
    return (
      <Document title="Shabbos Weather & Times">
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>Error: Missing data for PDF generation</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document title="Shabbos Weather & Times">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            {parshahEnglish}
            <Text style={{ fontFamily: "NotoSansHebrew" }}>
              {" "}
              {parshahItem.hebrew}
            </Text>
          </Text>
          {parshahItem && (
            <View>
              {parshahItem.hdate && (
                <View style={{ alignItems: "center", width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {parshahItem.hdate}
                  </Text>
                </View>
              )}
            </View>
          )}
          <View style={{ alignItems: "center", width: "100%" }}>
            <Text style={{ fontSize: 14, textAlign: "center" }}>
              {geoData.city}, {geoData.region}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          {/* Candle Times Section */}
          <View style={styles.candleSection}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              {candleItem && (
                <Text style={styles.candleTitle}>
                  Candle Lighting{" "}
                  {new Date(candleItem.date).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Text>
              )}
              {havdalahItem && (
                <Text style={styles.candleTitle}>
                  Havdalah{" "}
                  {new Date(havdalahItem.date).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Text>
              )}
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {candleItem && (
                <Text style={styles.candleInfo}>
                  {new Date(candleItem.date).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              )}
              {havdalahItem && (
                <Text style={styles.candleInfo}>
                  {new Date(havdalahItem.date).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              )}
            </View>
          </View>

          {/* Weather Forecast Section */}
          {forecastType === "daily" &&
            [
              {
                label: "Friday",
                periods: fridayPeriods,
                summary: fridaySummary,
              },
              {
                label: "Saturday",
                periods: saturdayPeriods,
                summary: saturdaySummary,
              },
            ].map(
              ({ label, periods, summary }) =>
                periods &&
                periods.length > 0 && (
                  <View style={styles.card} key={label}>
                    <View style={styles.weatherHeader}>
                      <Text style={styles.dayTitle}>{label}</Text>
                    </View>

                    <DailySummaryPDF summary={summary} />

                    <View style={styles.tempTableRow}>
                      {periods.map(
                        (period, idx) =>
                          period &&
                          period.temperature && (
                            <View style={styles.tempTableCol} key={idx}>
                              <Text style={styles.tempPeriodLabel}>
                                {getTimeLabel(period, label)}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginBottom: 2,
                                }}
                              >
                                {period.shortForecast &&
                                  getPDFWeatherIcon(
                                    period.shortForecast,
                                    period.isDaytime,
                                    16
                                  )}
                                <Text style={styles.tempPeriodValue}>
                                  {period.temperature}°
                                  {period.temperatureUnit || "F"}
                                </Text>
                              </View>
                              <Text style={styles.feelsLikeTemp}>
                                {period.shortForecast || "No forecast"}
                              </Text>
                            </View>
                          )
                      )}
                    </View>
                  </View>
                )
            )}

          {/* Hourly Forecast Section */}
          {forecastType === "hourly" &&
            [
              {
                label: "Friday",
                hourlyData: fridayHourly,
                summary: fridaySummary,
              },
              {
                label: "Saturday",
                hourlyData: saturdayHourly,
                summary: saturdaySummary,
              },
            ].map(
              ({ label, hourlyData, summary }) =>
                hourlyData &&
                hourlyData.length > 0 && (
                  <View style={styles.card} key={`${label}-hourly`}>
                    <View style={styles.weatherHeader}>
                      <Text style={styles.dayTitle}>
                        {label} Hourly Forecast
                      </Text>
                    </View>

                    {/* Daily summary container */}
                    <DailySummaryPDF summary={summary} />

                    {/* Hourly Table Header */}
                    <View style={styles.hourlyTableHeader}>
                      <Text style={styles.hourlyHeaderCell}>Time</Text>
                      <Text style={styles.hourlyHeaderCell}>Temp</Text>
                      <Text style={styles.hourlyHeaderCell}>Weather</Text>
                      <Text style={styles.hourlyHeaderCell}>Precip</Text>
                      <Text style={styles.hourlyHeaderCell}>Wind</Text>
                    </View>

                    {/* Hourly Rows */}
                    {hourlyData.map((hour, idx) => (
                      <View style={styles.hourlyTableRow} key={idx}>
                        <Text style={styles.hourlyCell}>
                          {hour ? formatHourlyTime(hour.startTime) : "N/A"}
                        </Text>
                        <Text style={styles.hourlyCell}>
                          {hour
                            ? `${hour.temperature}°${hour.temperatureUnit}`
                            : "N/A"}
                        </Text>
                        <View style={styles.hourlyCell}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {hour?.shortForecast &&
                              getPDFWeatherIcon(
                                hour.shortForecast,
                                hour.isDaytime,
                                12
                              )}
                            <Text style={{ fontSize: 8, fontWeight: 500 }}>
                              {hour?.shortForecast || "N/A"}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.hourlyCell}>
                          {hour?.probabilityOfPrecipitation?.value !== null
                            ? `${hour.probabilityOfPrecipitation.value}%`
                            : "0%"}
                        </Text>
                        <Text style={styles.hourlyCell}>
                          {hour && hour.windSpeed && hour.windDirection
                            ? `${hour.windDirection} ${hour.windSpeed}`
                            : "N/A"}
                        </Text>
                      </View>
                    ))}
                  </View>
                )
            )}
        </View>
      </Page>
    </Document>
  );
};

export default WeatherPDF;
