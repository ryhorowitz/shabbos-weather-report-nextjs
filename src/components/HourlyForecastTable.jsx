import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
const humidityIcon = "/assets/humidity-droplet-icon.svg";
import { cleanDetailedForecast } from "../utils/forecastUtils.js";
import { getWeatherIcon } from "../utils/weatherIconMapping.js";

const HourlyForecastTable = ({ dayString, hourlyData, loading, summary }) => {
  if (loading) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0" style={{ fontSize: "1.1rem" }}>
            {dayString} Hourly Forecast
          </h5>
        </div>
        <div className="p-3">
          <span style={{ fontSize: "0.95rem" }}>
            Loading hourly forecast...
          </span>
        </div>
      </Container>
    );
  }

  if (!hourlyData || hourlyData.length === 0) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0" style={{ fontSize: "1.1rem" }}>
            {dayString} Hourly Forecast
          </h5>
        </div>
        <div className="p-3">
          <span style={{ fontSize: "0.95rem" }}>
            No hourly forecast available
          </span>
        </div>
      </Container>
    );
  }

  const formatTime = (startTime) => {
    const date = new Date(startTime);
    const hour = date.getHours();
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12}${ampm}`;
  };

  const getWindDisplay = (windSpeed, windDirection) => {
    if (!windSpeed || !windDirection) return "N/A";
    return `${windDirection} ${windSpeed}`;
  };

  return (
    <Container className="mb-3 p-0 border rounded hourly-forecast-table Regular shadow">
      <div className="bg-primary text-white p-2 rounded-top">
        <h5
          className="mb-0 justify-content-center d-flex"
          style={{ fontSize: "1.5rem" }}
        >
          {dayString}
        </h5>
      </div>
      <div className="p-3 bg-gradient-info">
        {/* Daily summary container */}
        {summary && (
          <div
            className="mb-3 p-2 border rounded bg-light d-flex align-items-center"
            style={{ fontSize: "0.95rem", gap: 12 }}
          >
            {summary.shortForecast && (
              <Image
                src={getWeatherIcon(summary.shortForecast, true)}
                alt={summary.shortForecast}
                width={100}
                height={100}
                style={{ marginRight: 8 }}
                onError={(e) => {
                  // Fallback to API icon if custom icon fails to load
                  e.target.src =
                    summary.icon || "/assets/weather/sunny-day.svg";
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.95rem" }}>
                {cleanDetailedForecast(summary.detailedForecast)}
              </div>
              <div
                className="d-flex flex-wrap"
                style={{ gap: 16, fontSize: "0.92rem", marginTop: 2 }}
              >
                {summary.probabilityOfPrecipitation &&
                  summary.probabilityOfPrecipitation.value !== null && (
                    <span>
                      Precip: {summary.probabilityOfPrecipitation.value}%
                    </span>
                  )}
                {summary.relativeHumidity &&
                  summary.relativeHumidity.value !== null && (
                    <span>Humidity: {summary.relativeHumidity.value}%</span>
                  )}
                {summary.windSpeed && (
                  <span>
                    Wind: {summary.windSpeed} {summary.windDirection}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Table Header */}
        <Row
          className="mb-2 fw-bold text-center"
          style={{ fontSize: "0.9rem" }}
        >
          <Col xs={2}>Time</Col>
          <Col xs={3}>Temp</Col>
          <Col xs={4}>Weather</Col>
          <Col xs={2}>Precip</Col>
          <Col xs={1}>Wind</Col>
        </Row>

        {/* Hourly Rows */}
        {hourlyData.map((hour, idx) => (
          <Row
            key={hour?.startTime || idx}
            className="mb-2 align-items-center text-center border-bottom pb-2"
            style={{ fontSize: "0.95rem" }}
          >
            <Col xs={2} className="text-nowrap">
              {hour ? formatTime(hour.startTime) : "N/A"}
            </Col>
            <Col xs={3} className="fw-bold text-nowrap">
              {hour ? `${hour.temperature}°${hour.temperatureUnit}` : "N/A"}
            </Col>
            <Col xs={4}>
              <div
                className="d-flex align-items-center justify-content-center flex-wrap"
                style={{ gap: 2 }}
              >
                {hour?.shortForecast && (
                  <Image
                    src={getWeatherIcon(hour.shortForecast, hour.isDaytime)}
                    alt={hour.shortForecast}
                    width={24}
                    height={24}
                    style={{
                      minWidth: 20,
                      flexShrink: 0,
                    }}
                    onError={(e) => {
                      // Fallback to API icon if custom icon fails to load
                      e.target.src =
                        hour.icon || "/assets/weather/sunny-day.svg";
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: "0.6rem",
                    wordBreak: "break-word",
                    flex: 1,
                  }}
                >
                  {hour?.shortForecast || "N/A"}
                </span>
              </div>
            </Col>
            <Col xs={2}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: 2 }}
              >
                <Image
                  src={humidityIcon}
                  alt="Precipitation"
                  width={12}
                  height={12}
                  style={{ opacity: 0.7 }}
                />
                <span style={{ fontSize: "0.7rem" }}>
                  {hour?.probabilityOfPrecipitation?.value !== null
                    ? `${hour.probabilityOfPrecipitation.value}%`
                    : "0%"}
                </span>
              </div>
            </Col>
            <Col xs={1} style={{ fontSize: "0.6rem" }}>
              {hour
                ? getWindDisplay(hour.windSpeed, hour.windDirection)
                : "N/A"}
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default HourlyForecastTable;
