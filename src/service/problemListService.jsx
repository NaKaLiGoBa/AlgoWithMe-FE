import api from './api';

const getProblemList = async (page) => {
  try {
    const response = await api.read(`/api/v1/problems`, { page });
    return response.data;
  } catch (error) {
    console.error('getProblemList error:', error);
    return error;
  }
};

export default getProblemList;
