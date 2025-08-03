import React, { createContext, useContext } from "react";
import { StyleSheet } from "@react-pdf/renderer";

const PDFStylesContext = createContext();

const PDFStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f5f6fa",
    padding: 22,
    alignItems: "center",
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 2,
    color: "#333333",
    padding: 0,
    alignItems: "center",
    width: "100%",
  },
  section: {
    margin: 0,
    marginBottom: 7,
    padding: 0,
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: 10,
    padding: 11,
    marginBottom: 7,
    backgroundColor: "#ffffff",
    width: "90%",
    maxWidth: 420,
    alignSelf: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  dayTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#2c3e50",
    textAlign: "center",
  },
  weatherInfo: {
    fontSize: 9,
    marginBottom: 2,
    color: "#555555",
  },
  temperature: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 4,
  },
  summary: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#6D8196",
    marginTop: 0,
    marginBottom: 5,
  },
  candleSection: {
    border: "1px solid #e0e0e0",
    borderRadius: 10,
    padding: 4,
    marginBottom: 4,
    backgroundColor: "#fffbe6",
    width: "90%",
    maxWidth: 420,
    alignSelf: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  candleTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#8b4513",
  },
  candleInfo: {
    fontSize: 9,
    fontWeight: 700,
    marginBottom: 2,
    color: "#555555",
    paddingLeft: 8,
  },
  twoColumnContainer: {
    flexDirection: "row",
    marginBottom: 2,
  },
  column: {
    flex: 1,
    marginRight: 4,
  },
  columnRight: {
    flex: 1,
  },
  weatherHeader: {
    textAlign: "center",
  },
  tempTableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 2,
  },
  tempTableCol: {
    flex: 1,
    alignItems: "center",
  },
  feelsLikeTemp: {
    fontSize: 8,
    color: "#b0b0b0",
    fontStyle: "italic",
    marginTop: 0,
    marginBottom: 0,
  },
  tempPeriodLabel: {
    fontSize: 10,
    color: "#555",
    fontWeight: "normal",
    marginBottom: 1,
  },
  tempPeriodValue: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
    marginBottom: 0,
  },
  // New summary styles
  summaryContainer: {
    marginTop: 7,
    padding: 7,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    border: "1px solid #e9ecef",
  },
  summaryMainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  summaryLeft: {
    flex: 2,
    marginRight: 12,
  },
  summaryRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  summaryTemp: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 2,
  },
  summaryCondition: {
    fontSize: 10,
    color: "#495057",
    fontStyle: "italic",
    lineHeight: 1.2,
  },
  weatherDetail: {
    alignItems: "flex-end",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 8,
    color: "#6c757d",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 1,
  },
  detailValue: {
    fontSize: 9,
    color: "#495057",
    fontWeight: "bold",
  },
  detailedForecastContainer: {
    borderTop: "1px solid #dee2e6",
    paddingTop: 6,
  },
  detailedForecastText: {
    fontSize: 9,
    color: "#6c757d",
    lineHeight: 1.3,
    fontStyle: "italic",
  },
  // Hourly forecast table styles
  hourlyTableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
    paddingVertical: 4,
    marginBottom: 2,
  },
  hourlyHeaderCell: {
    flex: 1,
    fontSize: 8,
    fontWeight: "bold",
    color: "#495057",
    textAlign: "center",
    paddingHorizontal: 2,
  },
  hourlyTableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #f1f3f4",
    paddingVertical: 3,
    alignItems: "center",
  },
  hourlyCell: {
    flex: 1,
    fontSize: 7,
    color: "#495057",
    textAlign: "center",
    paddingHorizontal: 2,
  },
});

export const PDFStylesProvider = ({ children }) => (
  <PDFStylesContext.Provider value={PDFStyles}>
    {children}
  </PDFStylesContext.Provider>
);

export const usePDFStyles = () => useContext(PDFStylesContext);
