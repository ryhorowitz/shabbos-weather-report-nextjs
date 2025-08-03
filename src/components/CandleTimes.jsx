import React from "react";
import { useShabbos } from "../context/shabbosContext.js";
import { ListGroup, Spinner, Alert, Row } from "react-bootstrap";
import { extractCandleItems } from "../utils/candleDataUtils.js";

const CandleTimes = () => {
  const {
    candleData,
    geoData,
    candleLoading: loading,
    candleError: error,
  } = useShabbos();

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

          <ListGroup className="shadow-sm" style={{ textAlign: "left" }}>
            <ListGroup.Item className="">
              {candleItem.title ? (
                <Row className="mb-2 d-flex justify-content-between align-items-center">
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
              ) : (
                <div className="text-muted">
                  No candle lighting times found.
                </div>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {havdalahItem.title ? (
                <Row className="mb-2 d-flex justify-content-between align-items-center">
                  <span className="small text-muted px-2">
                    {new Date(havdalahItem.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <strong>{havdalahItem.title}</strong>
                </Row>
              ) : (
                <div className="text-muted">No havdalah times found.</div>
              )}
            </ListGroup.Item>
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default CandleTimes;
