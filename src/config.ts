export const PORT = process.env.PORT || 3001;
export const TEST_URL = process.env.TEST_URL || `http://localhost:${PORT}`;
export const API_URL = process.env.API_URL || `http://localhost:${PORT}/api`;
export const DB_URL =
  process.env.DB_URL || "mongodb://localhost:27017/mydatabase";
