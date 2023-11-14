import axios from 'axios';
import { localHostURL } from './apiConfig';

const endPoint = `${localHostURL}/api/v1/problems/`;

export const fetchSolution = async (problemId, solutionId, authToken) => {
  const url = `${endPoint}${problemId}/solutions/${solutionId}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
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

export const likeSolution = async (problemId, solutionId, authToken) => {
  const url = `${endPoint}${problemId}/solutions/${solutionId}/like`;
  try {
    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};