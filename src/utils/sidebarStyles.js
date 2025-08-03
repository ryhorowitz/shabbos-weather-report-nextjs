/**
 * Helper function to get responsive sidebar styles
 * @returns {Object} CSS styles object for sidebar
 */
export const getSidebarStyles = () => {
  return {
    // Base styles for all screen sizes
    height: "fit-content",
    maxHeight: "calc(100vh - 40px)",
    overflowY: "auto",
  };
};
