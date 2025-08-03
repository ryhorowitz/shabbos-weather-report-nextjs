import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { useShabbos } from "../context/shabbosContext.js";
import DailyForecastCard from "./DailyForecastCard.jsx";
import HourlyForecastTable from "./HourlyForecastTable.jsx";
import PDFDownloadButton from "./pdf/PDFDownloadButton.jsx";

const WeatherContainer = ({ forecastType, setForecastType }) => {
  const {
    weatherLoading: loading,
    weatherError: error,
    getShabbosForecasts,
    getShabbosDailySummaries,
    getShabbosHourlyForecasts,
    candleData,
  } = useShabbos();
  if (error) {
    return (
      <div className="weather-content">
        <h2>Weather Report</h2>
        <p>Error loading weather data: {error}</p>
      </div>
    );
  }

  const { friday: fridayPeriods, saturday: saturdayPeriods } =
    getShabbosForecasts(candleData);
  const { friday: fridaySummary, saturday: saturdaySummary } =
    getShabbosDailySummaries(candleData);
  const { friday: fridayHourly, saturday: saturdayHourly } =
    getShabbosHourlyForecasts(candleData);

  return (
    <div className="weather-content">
      <div className="mb-1">
        <h3 className="mb-0">Shabbos Weather Forecast</h3>
      </div>

      {/* PDF Download Button with Forecast Toggle */}
      <div className="mb-1">
        <PDFDownloadButton
          forecastType={forecastType}
          setForecastType={setForecastType}
        />
      </div>

      {forecastType === "daily" ? (
        <Row>
          <Col md={12}>
            {fridayPeriods && fridayPeriods.length > 0 && (
              <DailyForecastCard
                dayString="Friday"
                periods={fridayPeriods}
                summary={fridaySummary}
                loading={loading}
              />
            )}
          </Col>
          <Col md={12}>
            {saturdayPeriods && saturdayPeriods.length > 0 && (
              <DailyForecastCard
                dayString="Saturday"
                periods={saturdayPeriods}
                summary={saturdaySummary}
                loading={loading}
              />
            )}
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={12}>
            {fridayHourly && fridayHourly.length > 0 && (
              <HourlyForecastTable
                dayString="Friday"
                hourlyData={fridayHourly}
                summary={fridaySummary}
                loading={loading}
              />
            )}
          </Col>
          <Col md={12}>
            {saturdayHourly && saturdayHourly.length > 0 && (
              <HourlyForecastTable
                dayString="Saturday"
                hourlyData={saturdayHourly}
                summary={saturdaySummary}
                loading={loading}
              />
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default WeatherContainer;
