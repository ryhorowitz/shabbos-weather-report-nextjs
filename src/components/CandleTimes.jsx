import React, { useState, useEffect } from "react";
import { useShabbos } from "../context/shabbosContext.js";
import { ListGroup, Spinner, Alert, Row, Col, Accordion } from "react-bootstrap";
import { extractCandleItems } from "../utils/candleDataUtils.js";
import { Zmanim, GeoLocation } from '@hebcal/core';

const CandleTimes = () => {
  const {
    candleData,
    geoData,
    candleLoading: loading,
    candleError: error,
  } = useShabbos();

  const [zmanimData, setZmanimData] = useState(null);
  const [zmanimLoading, setZmanimLoading] = useState(false);
  const [fridayZmanim, setFridayZmanim] = useState(null);
  const [fridayZmanimLoading, setFridayZmanimLoading] = useState(false);
  const [saturdayZmanim, setSaturdayZmanim] = useState(null);
  const [saturdayZmanimLoading, setSaturdayZmanimLoading] = useState(false);

  // Shared formatTime function
  const formatTime = (date) => {
    if (!date || isNaN(date.getTime())) return 'N/A';
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get zmanim using @hebcal/core Zmanim class
  useEffect(() => {
    if (!geoData) return;
    
    const getZmanim = () => {
      try {
        setZmanimLoading(true);
        const lat = parseFloat(geoData.loc.split(",")[0]);
        const lon = parseFloat(geoData.loc.split(",")[1]);
        
        // Create GeoLocation object for zmanim calculations
        const gloc = new GeoLocation(null, lat, lon, 0, geoData.timezone);
        
        // Get today's date
        const today = new Date();
        
        // Create Zmanim instance for today
        const zmanim = new Zmanim(gloc, today, false);
        
        // Extract zmanim times using the Zmanim class methods
        const zmanimTimes = {
          sunrise: zmanim.sunrise(),
          sunset: zmanim.sunset(),
          alotHaShachar: zmanim.alotHaShachar(),
          misheyakir: zmanim.misheyakir(),
          sofZmanShma: zmanim.sofZmanShma(),
          sofZmanTfilla: zmanim.sofZmanTfilla(),
          chatzot: zmanim.chatzot(),
          minchaGedola: zmanim.minchaGedola(),
          minchaKetana: zmanim.minchaKetana(),
          plagHaMincha: zmanim.plagHaMincha(),
          tzeit: zmanim.tzeit(),
        };
        
        const formattedZmanim = {
          sunrise: formatTime(zmanimTimes.sunrise),
          sunset: formatTime(zmanimTimes.sunset),
          alotHaShachar: formatTime(zmanimTimes.alotHaShachar),
          misheyakir: formatTime(zmanimTimes.misheyakir),
          sofZmanShma: formatTime(zmanimTimes.sofZmanShma),
          sofZmanTfilla: formatTime(zmanimTimes.sofZmanTfilla),
          chatzot: formatTime(zmanimTimes.chatzot),
          minchaGedola: formatTime(zmanimTimes.minchaGedola),
          minchaKetana: formatTime(zmanimTimes.minchaKetana),
          plagHaMincha: formatTime(zmanimTimes.plagHaMincha),
          tzeit: formatTime(zmanimTimes.tzeit),
        };
        
        setZmanimData(formattedZmanim);
      } catch (err) {
        console.error("Error getting zmanim:", err);
      } finally {
        setZmanimLoading(false);
      }
    };
    
    getZmanim();
  }, [geoData]);

  // Get Friday's zmanim for candle lighting date
  useEffect(() => {
    if (!geoData || !candleData) return;
    
    const getFridayZmanim = () => {
      try {
        setFridayZmanimLoading(true);
        const lat = parseFloat(geoData.loc.split(",")[0]);
        const lon = parseFloat(geoData.loc.split(",")[1]);
        
        // Create GeoLocation object for zmanim calculations
        const gloc = new GeoLocation(null, lat, lon, 0, geoData.timezone);
        
        // Get Friday's date from candle data
        const { candleItem } = extractCandleItems(candleData);
        if (!candleItem || !candleItem.date) return;
        
        const fridayDate = new Date(candleItem.date);
        
        // Create Zmanim instance for Friday
        const zmanim = new Zmanim(gloc, fridayDate, false);
        
        // Extract Friday's zmanim times
        const fridayZmanimTimes = {
          plagHaMincha: zmanim.plagHaMincha(),
          tzeit: zmanim.tzeit(),
        };
        
        const formattedFridayZmanim = {
          plagHaMincha: formatTime(fridayZmanimTimes.plagHaMincha),
          tzeit: formatTime(fridayZmanimTimes.tzeit),
        };
        
        setFridayZmanim(formattedFridayZmanim);
      } catch (err) {
        console.error("Error getting Friday zmanim:", err);
      } finally {
        setFridayZmanimLoading(false);
      }
    };
    
    getFridayZmanim();
  }, [geoData, candleData]);

  // Get Saturday's zmanim for Shabbat
  useEffect(() => {
    if (!geoData || !candleData) return;
    
    const getSaturdayZmanim = () => {
      try {
        setSaturdayZmanimLoading(true);
        const lat = parseFloat(geoData.loc.split(",")[0]);
        const lon = parseFloat(geoData.loc.split(",")[1]);
        
        // Create GeoLocation object for zmanim calculations
        const gloc = new GeoLocation(null, lat, lon, 0, geoData.timezone);
        
        // Get Saturday's date (day after Friday candle lighting)
        const { candleItem } = extractCandleItems(candleData);
        if (!candleItem || !candleItem.date) return;
        
        const fridayDate = new Date(candleItem.date);
        const saturdayDate = new Date(fridayDate);
        saturdayDate.setDate(fridayDate.getDate() + 1);
        
        // Create Zmanim instance for Saturday
        const zmanim = new Zmanim(gloc, saturdayDate, false);
        
        // Extract Saturday's zmanim times
        const saturdayZmanimTimes = {
          alotHaShachar: zmanim.alotHaShachar(),
          sunrise: zmanim.sunrise(),
          misheyakir: zmanim.misheyakir(),
          sofZmanShma: zmanim.sofZmanShma(),
          sofZmanTfilla: zmanim.sofZmanTfilla(),
          chatzot: zmanim.chatzot(),
          plagHaMincha: zmanim.plagHaMincha(),
          sunset: zmanim.sunset(),
        };
        
        const formattedSaturdayZmanim = {
          alotHaShachar: formatTime(saturdayZmanimTimes.alotHaShachar),
          sunrise: formatTime(saturdayZmanimTimes.sunrise),
          misheyakir: formatTime(saturdayZmanimTimes.misheyakir),
          sofZmanShma: formatTime(saturdayZmanimTimes.sofZmanShma),
          sofZmanTfilla: formatTime(saturdayZmanimTimes.sofZmanTfilla),
          chatzot: formatTime(saturdayZmanimTimes.chatzot),
          plagHaMincha: formatTime(saturdayZmanimTimes.plagHaMincha),
          sunset: formatTime(saturdayZmanimTimes.sunset),
        };
        
        setSaturdayZmanim(formattedSaturdayZmanim);
      } catch (err) {
        console.error("Error getting Saturday zmanim:", err);
      } finally {
        setSaturdayZmanimLoading(false);
      }
    };
    
    getSaturdayZmanim();
  }, [geoData, candleData]);

  if (loading) {
    return (
      <div className="candle-times text-center py-3">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading candle times...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="candle-times">
        <Alert variant="danger" className="text-center">
          Error loading candle times: {error}
        </Alert>
      </div>
    );
  }

  const { candleItem, parshahItem, havdalahItem } =
    extractCandleItems(candleData);
  const parshahEnglish = "Parshas " + parshahItem.title.split(" ")[1];
  
  return (
    <div className="candle-times text-center">
      {parshahItem && (
        <div>
          <div className="mb-3">
            <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              {parshahEnglish}
            </div>
            <div className="ms-3" style={{ fontSize: "1.2rem" }}>
              {parshahItem.hebrew}
            </div>
          </div>

          <div className="mb-3">
            {parshahItem.date ? (
              <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {parshahItem.hdate}
              </span>
            ) : (
              <div className="text-muted">No Hebrew Date found.</div>
            )}
          </div>

          <div className="mb-3 fs-3 fw-bold">
            {geoData.city}, {geoData.region}
          </div>

          {/* Friday Candle Lighting Accordion */}
          {candleItem && candleItem.title && (
            <Accordion className="shadow-sm mb-1">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Row className="mb-2 d-flex justify-content-between align-items-center w-100">
                    <span className="small text-muted px-2">
                      {new Date(candleItem.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <strong>{candleItem.title}</strong>
                  </Row>
                </Accordion.Header>
                <Accordion.Body>
                  {fridayZmanimLoading ? (
                    <div className="text-center">
                      <Spinner animation="border" size="sm" />
                      <span className="ms-2">Loading Friday zmanim...</span>
                    </div>
                  ) : fridayZmanim ? (
                    <div className="text-start">
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Plag HaMincha</small>
                        <span className="fw-bold small">{fridayZmanim.plagHaMincha}</span>
                      </div>
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Tzeit</small>
                        <span className="fw-bold small">{fridayZmanim.tzeit}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted">No Friday zmanim available.</div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}

          {/* Saturday Shabbat Accordion */}
          {saturdayZmanim && (
            <Accordion className="shadow-sm mb-1">
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <Row className="mb-2 d-flex justify-content-between align-items-center w-100">
                    <span className="small text-muted px-2">
                      {(() => {
                        const fridayDate = new Date(candleItem.date);
                        const saturdayDate = new Date(fridayDate);
                        saturdayDate.setDate(fridayDate.getDate() + 1);
                        return saturdayDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });
                      })()}
                    </span>
                    <strong>{havdalahItem.title}</strong>
                  </Row>
                </Accordion.Header>
                <Accordion.Body>
                  {saturdayZmanimLoading ? (
                    <div className="text-center">
                      <Spinner animation="border" size="sm" />
                      <span className="ms-2">Loading Saturday zmanim...</span>
                    </div>
                  ) : saturdayZmanim ? (
                    <div className="text-start">
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Alot Hashachar</small>
                        <span className="fw-bold small">{saturdayZmanim.alotHaShachar}</span>
                      </div>
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Sunrise</small>
                        <span className="fw-bold small">{saturdayZmanim.sunrise}</span>
                      </div>
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Misheyakir</small>
                        <span className="fw-bold small">{saturdayZmanim.misheyakir}</span>
                      </div>
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Sof Zman Shma</small>
                        <span className="fw-bold small">{saturdayZmanim.sofZmanShma}</span>
                      </div>
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Sof Zman Tfilla</small>
                        <span className="fw-bold small">{saturdayZmanim.sofZmanTfilla}</span>
                      </div>
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Chatzot</small>
                        <span className="fw-bold small">{saturdayZmanim.chatzot}</span>
                      </div>
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Plag HaMincha</small>
                        <span className="fw-bold small">{saturdayZmanim.plagHaMincha}</span>
                      </div>
                      <div className="mb-1 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Sunset</small>
                        <span className="fw-bold small">{saturdayZmanim.sunset}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted">No Saturday zmanim available.</div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
        </div>
      )}
    </div>
  );
};

export default CandleTimes;
