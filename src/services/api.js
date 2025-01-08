const API_BASE_URL = 'http://localhost:3001'; // Use environment variable or fallback to localhost

/**
 * Helper to handle API errors.
 * @param {Response} response - The fetch response object.
 * @throws {Error} If the response is not OK.
 */
const handleErrors = async (response) => {
  if (!response.ok) {
    const errorText = await response.text(); // Get error details from the response
    const errorMessage = errorText || response.statusText || 'Unknown error occurred';
    throw new Error(`Error ${response.status}: ${errorMessage}`);
  }
  return response;
};

/**
 * Generic API request wrapper with enhanced error handling.
 * @param {string} endpoint - The API endpoint (e.g., '/projects').
 * @param {string} method - HTTP method (e.g., 'GET', 'POST').
 * @param {Object} [body] - Request body for POST/PUT methods.
 * @returns {Promise<Object>} The parsed JSON response.
 */
const apiRequest = async (endpoint, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    await handleErrors(response); // Check for errors
    return response.json(); // Parse and return JSON
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Project-related API calls
export const fetchProjects = async () => {
  try {
    return await apiRequest('/projects');
  } catch (error) {
    console.error('Failed to fetch projects:', error.message);
    throw new Error('Unable to fetch projects. Please try again later.');
  }
};

export const fetchProjectById = async (id) => {
  try {
    return await apiRequest(`/projects/${id}`);
  } catch (error) {
    console.error(`Failed to fetch project with ID ${id}:`, error.message);
    throw new Error(`Unable to fetch project details. Please try again later.`);
  }
};

export const createProject = async (project) => {
  try {
    return await apiRequest('/projects', 'POST', project);
  } catch (error) {
    console.error('Failed to create project:', error.message);
    throw new Error('Unable to create the project. Please check your input and try again.');
  }
};

export const updateProject = async (id, project) => {
  try {
    return await apiRequest(`/projects/${id}`, 'PUT', project);
  } catch (error) {
    console.error(`Failed to update project with ID ${id}:`, error.message);
    throw new Error('Unable to update the project. Please check your input and try again.');
  }
};

export const deleteProject = async (id) => {
  try {
    return await apiRequest(`/projects/${id}`, 'DELETE');
  } catch (error) {
    console.error(`Failed to delete project with ID ${id}:`, error.message);
    throw new Error('Unable to delete the project. Please try again later.');
  }
};

// ColumnHeaders-related API calls
export const fetchColumnHeaders = async () => {
  try {
    return await apiRequest('/columnHeaders');
  } catch (error) {
    console.error('Failed to fetch column headers:', error.message);
    throw new Error('Unable to fetch column headers. Please try again later.');
  }
};

/**
 * Update column headers.
 * @param {Object} updatedHeaders - The entire column headers object.
 * @returns {Promise<Object>} The updated column headers object.
 */
export const updateColumnHeader = async (updatedHeaders) => {
  try {
    return await apiRequest('/columnHeaders', 'PUT', updatedHeaders);
  } catch (error) {
    console.error('Failed to update column headers:', error.message);
    throw new Error('Unable to update column headers. Please try again later.');
  }
};