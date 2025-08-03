import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CandleTimes from "./components/CandleTimes.jsx";
import WeatherContainer from "./components/WeatherContainer.jsx";
import { ShabbosProvider } from "./context/shabbosContext.js";
import PDFDownloadButton from "./components/pdf/PDFDownloadButton.jsx";
import EmailSignup from "./components/EmailSignup.jsx";
import SeoHelmet from "./components/SeoHelmet.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Row, Col } from "react-bootstrap";
import { getSidebarStyles } from "./utils/sidebarStyles.js";
import { useState } from "react";

function App() {
  const [forecastType, setForecastType] = useState("daily"); // "daily" or "hourly"
  return (
    <HelmetProvider>
      <SeoHelmet />
      <ShabbosProvider>
        <div className="App">
          <header
            className="App-header text-center"
            style={{ pw: "1.25rem 0" }}
          >
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              Erev Shabbos Weather Report
            </h1>
            <p
              className="intro-blurb mx-5 px-5"
              style={{ fontSize: "0.8rem", padding: "0 1rem" }}
            >
              Welcome to the Erev Shabbos Weather Report! This app provides you
              with up-to-date weather forecasts and candle lighting times to
              help you prepare for Shabbos. Download a printable PDF and stay
              informed for a peaceful and organized Shabbos experience.
            </p>
          </header>
          <main>
            <Row>
              {/* Sidebar: Candle Times */}
              <Col
                xs={12}
                md={3}
                className="sidebar"
                style={getSidebarStyles()}
              >
                <CandleTimes />
              </Col>

              {/* Main Content: Weather and Email */}
              <Col xs={12} md={9} className="main-content">
                <div className="weather-container">
                  <WeatherContainer
                    forecastType={forecastType}
                    setForecastType={setForecastType}
                  />
                </div>
                {/* <EmailSignup /> */}
              </Col>
            </Row>
          </main>
        </div>
      </ShabbosProvider>
    </HelmetProvider>
  );
}

export default App;
