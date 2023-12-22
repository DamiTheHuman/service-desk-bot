export const getEnv = string => {
  const result = process.env[string];
  if (!result) {
    throw new Error(`Could not get ${string}`);
  }

  return result;
};
