// export default function getAuthHeader() {
//   return { Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` };
// }

export default function getAuthHeader() {
  const token = localStorage.getItem('ACCESS_TOKEN') || ''; // 토큰이 없으면 빈 문자열을 사용
  return { Authorization: `Bearer ${token}` };
}
