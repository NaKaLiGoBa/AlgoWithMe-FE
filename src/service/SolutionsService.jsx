import api from './api';

const getSolutions = async (id, cursor = null, size = 1) => {
  try {
    const endpoint = `/api/v1/problems/${id}/solutions`;
    const params = { cursor, size };

    const response = await api.read(endpoint, params);

    return api.handleResponse(response);
  } catch (error) {
    return api.handleError(error);
  }
};

export default getSolutions;
