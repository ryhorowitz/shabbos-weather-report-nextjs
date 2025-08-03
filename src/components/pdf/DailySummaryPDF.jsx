import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { usePDFStyles } from "../../context/PDFStylesContext";
import { getPDFWeatherIcon } from "../../utils/pdfWeatherIcons.js";

const DailySummaryPDF = ({ summary, showCondition = true }) => {
  const styles = usePDFStyles();

  if (!summary || !summary.temperature) return null;

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryMainRow}>
        <View style={styles.summaryLeft}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            {summary.shortForecast &&
              getPDFWeatherIcon(summary.shortForecast, true, 24)}
            <Text style={styles.summaryTemp}>
              {summary.temperature}°{summary.temperatureUnit || "F"}
            </Text>
          </View>
          {showCondition && (
            <Text style={styles.summaryCondition}>
              {summary.shortForecast || "No forecast available"}
            </Text>
          )}
        </View>
        <View style={styles.summaryRight}>
          {summary.probabilityOfPrecipitation &&
            summary.probabilityOfPrecipitation.value && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Text style={styles.detailLabel}>Precipitation: </Text>
                <Text style={styles.detailValue}>
                  {summary.probabilityOfPrecipitation.value}%
                </Text>
              </View>
            )}
          {summary.windSpeed && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.detailLabel}>Wind: </Text>
              <Text style={styles.detailValue}>
                {summary.windSpeed} {summary.windDirection || ""}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DailySummaryPDF;
