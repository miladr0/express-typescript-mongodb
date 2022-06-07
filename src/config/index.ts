import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const checkEnv = (envVar: string, defaultValue?: string) => {
  if (!process.env[envVar]) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};
export const PORT: number = parseInt(checkEnv('PORT'), 10);
export const DBURL: string = checkEnv('DBURL');
export const CORS_ORIGINS = JSON.parse(checkEnv('CORS_ORIGINS'));
export const CREDENTIALS = checkEnv('CREDENTIALS') === 'true';

export const isProduction = checkEnv('NODE_ENV') === 'production';

export const SENTRY_DSN = checkEnv('SENTRY_DSN');
