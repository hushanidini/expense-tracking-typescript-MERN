import dotenv from 'dotenv';
dotenv.config();

const MONGOOSE_USERNAME = process.env.MONGO_USERNAME || '';
const MONGOOSE_PASSWORD = process.env.MONGO_PASS || '';
const MONGOOSE_URL = `mongodb+srv://${MONGOOSE_USERNAME}:${MONGOOSE_PASSWORD}@expenses-app.4zuisup.mongodb.net/?retryWrites=true&w=majority`;


const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT): 2023;

export const config = {
    mongoose: {
        username: MONGOOSE_USERNAME,
        url: MONGOOSE_URL
    },
    server:{
        port: SERVER_PORT
    }
}
