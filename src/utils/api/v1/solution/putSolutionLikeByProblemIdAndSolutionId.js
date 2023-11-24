import axios from 'axios';
import { localHostURL } from '../../../apiConfig';
import getAuthHeader from '../../../getAuthHeader';

const hostURL = localHostURL;

function handleResponse(response) {
  const { status, data } = response;

  switch (status) {
    case 200:
      // 좋아요 완료
      // {
      //   "isLike": true
      // }
      return { success: true, data };
    default:
      // 기타 상태 코드 처리
      return { success: false, error: `Unknown status code: ${status}` };
  }
}

function handleError(error) {
  if (error.response) {
    // 서버가 응답을 반환했을 때
    const { status, data } = error.response;
    switch (status) {
      case 500:
        // 서버 내부 오류
        return {
          success: false,
          error: 'Internal Server Error',
          details: data,
        };
      case 503:
        // 서비스를 사용할 수 없음
        return { success: false, error: 'Service Unavailable', details: data };
      default:
        // 기타 4xx 및 5xx 상태 코드 처리
        return {
          success: false,
          error: `Server responded with status code ${status}`,
          details: data,
        };
    }
  } else if (error.request) {
    // 요청이 전송되었지만 응답을 받지 못했을 때
    return { success: false, error: 'No response from server' };
  } else {
    // 요청을 만들 때 무언가 문제가 발생했을 때
    return { success: false, error: error.message };
  }
}

async function call(apiUrl, method, requestData = {}) {
  try {
    const response = await axios({
      url: hostURL + apiUrl,
      method,
      headers: getAuthHeader(),
      data: requestData,
    });
    return handleResponse(response);
  } catch (error) {
    return Promise.reject(handleError(error));
  }
}

async function putSolutionLikeByProblemIdAndSolutionId(problemId, solutionId) {
  const apiUrl = `/api/v1/problems/${problemId}/solutions/${solutionId}/like`;

  const requestData = {
    requestDateTime: 'string',
  };

  return call(apiUrl, 'POST', requestData);
}

export default putSolutionLikeByProblemIdAndSolutionId;
