import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Log from './lib/log';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes';
import sysuserRoutes from './routes/systemUserRoutes';

const app = express();

app.use(cors({
    credentials:true,
}))

/** connect to mongoose DB */
mongoose.connect(config.mongoose.url)
.then(() => {
    Log.Info(`MongoDB connected successfully! - Server port: ${config.server.port}`);
    StartingServer();
})
.catch(error => {
    Log.Error('Unable to connect: ')
    Log.Error(error.message);
});


/** if DB connect then  only start the server */
const StartingServer = () => {
    app.use((req, res, next) => {
        //Log the request
        Log.Info(`Request - METHOD: [${req.method}] - URL: [${req.url}] - IpAddress:[${req.socket.remoteAddress}]`);
        res.on('finish',() => {
            /** Log for res*/
            Log.Info(`Response - METHOD: [${req.method}] - URL: [${req.url}] - IpAddress:[${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /*** This API Roules (example:header)*/
    app.use((req, res, next)=> {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // ROUTES LIST
    app.use('/api/v1/expense', expenseRoutes);
    app.use('/api/v1/register', sysuserRoutes);

    // SAMPLE
    //app.use('/test', (req, res, next) => res.status(201).json({msg: 'This is test one'}));

    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error(`Route ${req.originalUrl} not found`);
        Log.Error(error);
        res.status(404).json({
            message: error.message
        });
    });


    http.createServer(app).listen(config.server.port,()=> Log.Info(`Server is running on port ${config.server.port}`))
}