import React from "react";
import { Container, Row } from "react-bootstrap";
import Image from "next/image";
import { cleanDetailedForecast } from "../utils/forecastUtils.js";
import { getWeatherIcon } from "../utils/weatherIconMapping.js";

const DailyForecastCard = ({ dayString, periods, loading, summary }) => {
  if (loading) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0" style={{ fontSize: "1.1rem" }}>
            {dayString}
          </h5>
        </div>
        <div className="p-3">
          <span style={{ fontSize: "0.95rem" }}>Loading forecast...</span>
        </div>
      </Container>
    );
  }

  if (!periods || periods.length === 0) {
    return (
      <Container className="mb-3 p-0 border rounded">
        <div className="bg-secondary text-white p-2 rounded-top">
          <h5 className="mb-0" style={{ fontSize: "1.1rem" }}>
            {dayString}
          </h5>
        </div>
        <div className="p-3">
          <span style={{ fontSize: "0.95rem" }}>No forecast available</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mb-3 p-0 border rounded daily-forecast-card Regular shadow">
      <div className="bg-primary text-white p-2 rounded-top">
        <h5
          className="mb-0 justify-content-center d-flex"
          style={{ fontSize: "1.5rem" }}
        >
          {dayString}
        </h5>
      </div>
      <div className="p-3  bg-gradient-info">
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
              {/* <div className="fw-bold" style={{ fontSize: '1.05rem' }}>{summary.name || summary.shortForecast}</div> */}
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
        {/* Detailed hourly rows */}
        {periods.map((period, idx) => (
          <Row
            key={period?.startTime || idx}
            className="mb-2 align-items-center"
            style={{ fontSize: "0.95rem" }}
          >
            <div className="fw-bold mb-1 ml-3" style={{ fontSize: "0.95rem" }}>
              {(() => {
                if (dayString === "Friday") {
                  if (idx === 0) return "Afternoon 4pm";
                  if (idx === 1) return "Evening 8pm";
                  if (idx === 2) return "Night 12am";
                } else if (dayString === "Saturday") {
                  if (idx === 0) return "Morning 8am";
                  if (idx === 1) return "Day 12pm";
                  if (idx === 2) return "Afternoon 4pm";
                  if (idx === 3) return "Evening 8pm";
                }
                return period?.name || "";
              })()}
            </div>
            {period ? (
              <div
                className="d-flex align-items-center"
                style={{ gap: 12, marginLeft: 12 }}
              >
                <div style={{ fontSize: 28, minWidth: 32 }}>
                  {period.shortForecast && (
                    <Image
                      src={getWeatherIcon(
                        period.shortForecast,
                        period.isDaytime
                      )}
                      alt={period.shortForecast}
                      width={50}
                      height={50}
                      onError={(e) => {
                        // Fallback to API icon if custom icon fails to load
                        e.target.src =
                          period.icon || "/assets/weather/sunny-day.svg";
                      }}
                    />
                  )}
                </div>
                <div
                  className="fw-bold"
                  style={{ fontSize: "1.1rem", minWidth: 48 }}
                >
                  {period.temperature}°{period.temperatureUnit}
                </div>
                <div style={{ fontSize: "0.95rem", flex: 1 }}>
                  {period.shortForecast}
                </div>
              </div>
            ) : (
              <div className="text-muted" style={{ fontSize: "0.95rem" }}>
                No data
              </div>
            )}
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default DailyForecastCard;
