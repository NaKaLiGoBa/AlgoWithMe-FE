import axios from 'axios';
import { localHostURL } from './apiConfig';

const endPoint = `${localHostURL}/api/v1/problems/`;

export const fetchSolution = async (problemId, solutionId) => {
  const url = `${endPoint}${problemId}/solutions/${solutionId}`;
  const response = await axios.get(url);
  return response.data;
};

export const updateSolution = async (
  problemId,
  solutionId,
  solutionData,
  authToken,
) => {
  const url = `${endPoint}${problemId}/solutions/${solutionId}`;
  const response = await axios.put(url, solutionData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const deleteSolution = async (problemId, solutionId, authToken) => {
  const url = `${endPoint}${problemId}/solutions/${solutionId}`;
  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
