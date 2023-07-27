export const fetchMock = (url, args, mockResponse) => {
  console.log(`Fetch Mock Request - `, url, args);
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Fetch Mock Response - `, url, args);
      resolve(mockResponse);
    }, 1000)
  );
};
