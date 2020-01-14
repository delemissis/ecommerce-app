const getErrorMessage = (error) => (error.response.data.message
  ? error.response.data.message : error.response.statusText);

export { getErrorMessage };
