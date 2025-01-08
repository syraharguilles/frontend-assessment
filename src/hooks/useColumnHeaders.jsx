import { useState, useEffect, useCallback } from 'react';
import { fetchColumnHeaders, updateColumnHeader } from '../services/api';

const useColumnHeaders = () => {
  const [columnHeaders, setColumnHeaders] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handle and log errors.
   * @param {Error} err - The error object.
   */
  const handleError = (err) => {
    setError(err.message);
    console.error('Error:', err);
  };

  // Fetch column headers
  const fetchHeaders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchColumnHeaders();
      console.log('Fetched headers data:', data); // Debug log
      setColumnHeaders(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update a specific column header
  const updateHeader = async (key, value) => {
    try {
      const updatedHeaders = { ...columnHeaders, [key]: value }; // Merge the updated value
      console.log('Updating column headers:', updatedHeaders); // Debug log
      await updateColumnHeader(updatedHeaders); // Send updated object to the server
      setColumnHeaders(updatedHeaders); // Update the local state
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchHeaders();
  }, [fetchHeaders]);

  return {
    columnHeaders,
    loading,
    error,
    fetchHeaders,
    updateHeader,
  };
};

export default useColumnHeaders;