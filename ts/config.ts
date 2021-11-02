import "dotenv/config";

export const getEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    console.error(`value ${name} not found in environment, check .env file`);
    process.exit(1);
  }
  return value;
};

export const group = getEnv("GROUP");
export const letter = getEnv("LETTER");

export const baseUrl = `https://${letter}.${group}.hr.dmerej.info`;
