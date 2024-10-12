import 'dotenv/config';
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    MONGO_URI: string;
    MONGO_DB_NAME: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
}

export const envsSchema = joi.object({
    PORT: joi.number().required(),
    MONGO_URI: joi.string().required(),
    MONGO_DB_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRATION: joi.string().required()
})
    .unknown(true);

const { error, value } = envsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value;
export const envs = {
    port: envVars.PORT,
    mongoUri: envVars.MONGO_URI,
    mongoDbName: envVars.MONGO_DB_NAME,
    jwt: {
        secret: envVars.JWT_SECRET,
        expiration: envVars.JWT_EXPIRATION
    }
}