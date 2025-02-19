import 'dotenv/config';
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    MONGO_URI: string;
    MONGO_DB_NAME: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    projectId: string,
    privateKey: string,
    clientEmail: string,
    // appId: string,
    // storageBucket: string,
    // apiKey: string,
    // authDomain: string,
    // messagingSenderId: string
}

export const envsSchema = joi.object({
    PORT: joi.number().required(),
    MONGO_URI: joi.string().required(),
    MONGO_DB_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRATION: joi.string().required(),
    projectId: joi.string().required(),
    privateKey: joi.string().required(),
    clientEmail: joi.string().required(),
    // appId: joi.string().required(),
    // storageBucket: joi.string().required(),
    // apiKey: joi.string().required(),
    // authDomain: joi.string().required(),
    // messagingSenderId: joi.string().required()
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
    },
    firebase: {
        projectId: envVars.projectId,
        privateKey: envVars.privateKey,
        clientEmail: envVars.clientEmail,
        // appId: envVars.appId,
        // storageBucket: envVars.storageBucket,
        // apiKey: envVars.apiKey,
        // authDomain: envVars.authDomain,
        // messagingSenderId: envVars.messagingSenderId
    }
}