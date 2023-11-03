import api from './api';

const getSolutions = async (id, cursor, size) => {
  try {
    const response = await api.read(`api/v1/problems/${id}/soltions`, {
      cursor,
      size,
    });
    return response.data;
  } catch (error) {
    console.log('gettingSolutions error', error);
    return error;
  }
};

export default getSolutions;
