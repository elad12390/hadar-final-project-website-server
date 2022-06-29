import {config as dotenvConfig} from 'dotenv';
dotenvConfig();
console.log({nodeenv: process.env.NODE_ENV});
dotenvConfig({path: `.env.${process.env.NODE_ENV}`});


import express, { Express, Request, Response } from 'express';
import slowDown from 'express-slow-down';
import cors from 'cors';
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import bodyParser from 'body-parser';
import { RegisterRoutes } from '../routes/routes';

/* ******** Setup Cors *********** */

const app: Express = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'https://lieddybbuk.com',
}))

/* ******** Setup speed limiter ******* */

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 500,
})

app.use(speedLimiter);

/* ******** Setup morgan ******* */

app.use(morgan('tiny'))


app.use(express.static("public"));

/* ******** Setup swagger ******* */

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());


/* ******* Setup routes *********** */

RegisterRoutes(app);

/* ******* Start listening ******** */

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});