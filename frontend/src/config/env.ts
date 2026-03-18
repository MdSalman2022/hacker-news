// all env vars live here - import from this file, never from process.env directly
const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
};

export default env;
