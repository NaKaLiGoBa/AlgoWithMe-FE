import axios from 'axios';
import { localHostURL } from './apiConfig';

const fetchSolution = async (problemId, solutionId) => {
  const url = `${localHostURL}/problems/${problemId}/solutions/${solutionId}`;
  const response = await axios.get(url);
  return response.data;
};

export default fetchSolution;
