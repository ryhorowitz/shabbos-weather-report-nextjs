import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useShabbos } from "../../context/shabbosContext.js";
import WeatherPDF from "./WeatherPDF.jsx";
import { PDFStylesProvider } from "../../context/PDFStylesContext";

const PDFDownloadButton = ({ forecastType, setForecastType }) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const {
    getShabbosForecasts,
    getShabbosDailySummaries,
    getShabbosHourlyForecasts,
    weatherLoading,
    candleData,
    geoData,
    candleLoading,
  } = useShabbos();

  const { friday: fridayPeriods, saturday: saturdayPeriods } =
    getShabbosForecasts(candleData);
  const { friday: fridaySummary, saturday: saturdaySummary } =
    getShabbosDailySummaries(candleData);
  const { friday: fridayHourly, saturday: saturdayHourly } =
    getShabbosHourlyForecasts(candleData);

  const isLoading = weatherLoading || candleLoading;
  const hasData =
    fridayPeriods &&
    saturdayPeriods &&
    fridayPeriods.length > 0 &&
    saturdayPeriods.length > 0 &&
    candleData &&
    geoData;

  if (isLoading) {
    return (
      <div className="text-center mt-1">
        <Button variant="primary" disabled>
          Loading data for PDF...
        </Button>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="text-center mt-1">
        <Button variant="secondary" disabled>
          No data available for PDF
        </Button>
      </div>
    );
  }

  const pdfDocument = (
    <PDFStylesProvider>
      <WeatherPDF
        fridayPeriods={fridayPeriods}
        saturdayPeriods={saturdayPeriods}
        fridaySummary={fridaySummary}
        saturdaySummary={saturdaySummary}
        fridayHourly={fridayHourly}
        saturdayHourly={saturdayHourly}
        candleData={candleData}
        geoData={geoData}
        forecastType={forecastType}
      />
    </PDFStylesProvider>
  );

  const handlePrintClick = () => {
    if (pdfBlobUrl) {
      const printWindow = window.open(pdfBlobUrl, "_blank");
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center mt-1"
      style={{ width: "100%" }}
    >
      <div className="toggle-switch-container d-flex align-items-center">
        <label
          className="toggle-label me-3"
          style={{
            fontSize: "12px",
            color: "#6c757d",
            fontWeight: "500",
            margin: 0,
          }}
        >
          Forecast Type
        </label>
        <div
          className="toggle-switch"
          onClick={() =>
            setForecastType(forecastType === "daily" ? "hourly" : "daily")
          }
          style={{
            position: "relative",
            width: "140px",
            height: "28px",
            backgroundColor: "#e9ecef",
            borderRadius: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            border: "2px solid #dee2e6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 6px",
            boxSizing: "border-box",
          }}
        >
          <span
            className="toggle-option"
            style={{
              color: forecastType === "daily" ? "#ffffff" : "#6c757d",
              fontWeight: "600",
              fontSize: "11px",
              transition: "color 0.3s ease",
              zIndex: 2,
            }}
          >
            General
          </span>
          <span
            className="toggle-option"
            style={{
              color: forecastType === "hourly" ? "#ffffff" : "#6c757d",
              fontWeight: "600",
              fontSize: "11px",
              transition: "color 0.3s ease",
              zIndex: 2,
            }}
          >
            Hourly
          </span>
          <div
            className="toggle-slider"
            style={{
              position: "absolute",
              top: "2px",
              left: forecastType === "daily" ? "2px" : "calc(50% + 2px)",
              width: "calc(50% - 4px)",
              height: "calc(100% - 4px)",
              backgroundColor: "#0d6efd",
              borderRadius: "12px",
              transition: "left 0.3s ease",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      </div>

      <div className="ms-4" style={{ flex: "1" }}>
        <PDFDownloadLink
          document={pdfDocument}
          fileName="shabbos-weather-and-candle-times.pdf"
        >
          {({ blob, url, loading: pdfLoading, error: pdfError }) => {
            // Store the blob URL for print
            if (blob && url) {
              setPdfBlobUrl(url);
            }

            return (
              <Button
                variant="outline-primary"
                disabled={pdfLoading}
                onClick={handlePrintClick}
                className="px-3 py-1 fw-semibold shadow-sm w-100"
                style={{
                  borderWidth: "2px",
                  borderRadius: "6px",
                  transition: "all 0.2s ease-in-out",
                  fontSize: "13px",
                }}
              >
                {pdfLoading ? "Generating PDF..." : "🖨️ Print PDF"}
              </Button>
            );
          }}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PDFDownloadButton;
