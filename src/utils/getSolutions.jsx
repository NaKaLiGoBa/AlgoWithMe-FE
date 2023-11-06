import api from '../service/api';

const getSolutions = async (id, cursor = null, size = 1) => {
    const endpoint = `/api/v1/problems/${id}/solutions`;
    const params = { cursor, size };
    return api.read(endpoint, params);
};

export default getSolutions;
