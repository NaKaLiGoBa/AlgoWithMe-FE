export default function getRequestDateTime() {
  return {
    requestDateTime: new Date().toISOString(),
  };
}
