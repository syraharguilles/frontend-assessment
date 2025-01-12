const API_BASE_URL = 'http://localhost:3001';

const handleErrors = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
  }
  return response;
};

const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  await handleErrors(response);
  return response.json();
};

export const fetchProjects = () => apiRequest('/projects');
export const createProject = (project) => apiRequest('/projects', 'POST', project);
export const updateProject = (id, project) => apiRequest(`/projects/${id}`, 'PUT', project);
export const deleteProject = (id) => apiRequest(`/projects/${id}`, `DELETE`);

export const fetchColumnHeaders = () => apiRequest('/columnHeaders');
export const updateColumnHeader = (updatedHeaders) =>
  apiRequest('/columnHeaders', 'PUT', updatedHeaders);