import React, { createContext, useMemo } from 'react';
import useColumnHeaders from '../hooks/useColumnHeaders';

// Create the ColumnHeaders context
export const ColumnHeadersContext = createContext();

const ColumnHeadersProvider = ({ children }) => {
  const {
    columnHeaders, // State managed in useColumnHeaders
    loading,
    error,
    updateHeader, // Update function from the hook
  } = useColumnHeaders();

  // Memoize the context value to optimize performance
  const contextValue = useMemo(() => ({
    columnHeaders,
    loading,
    error,
    updateHeader, // Expose the update function
  }), [columnHeaders, loading, error, updateHeader]);

  return (
    <ColumnHeadersContext.Provider value={contextValue}>
      {children}
    </ColumnHeadersContext.Provider>
  );
};

export default ColumnHeadersProvider;