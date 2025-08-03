/**
 * Extracts candle data items from the candleData.items array
 * @param {Object} candleData - The candle data object containing items array
 * @returns {Object} Object containing candleItem, parshahItem, and havdalahItem
 */
export const extractCandleItems = (candleData) => {
  if (!candleData || !candleData.items || !Array.isArray(candleData.items)) {
    return {
      candleItem: null,
      parshahItem: null,
      havdalahItem: null,
    };
  }

  let candleItem = null;
  let parshahItem = null;
  let havdalahItem = null;

  candleData.items.forEach((item) => {
    if (item.category === "candles") {
      candleItem = item;
    }
    if (item.category === "parashat") {
      parshahItem = item;
    }
    if (item.category === "havdalah") {
      havdalahItem = item;
    }
  });

  return {
    candleItem,
    parshahItem,
    havdalahItem,
  };
};
