import * as path from "path";
import * as dotenv from "dotenv";
import rawData from "../../env/env.config.json";


const environment = process.env.ENV || 'test';
dotenv.config({
  path: path.resolve(__dirname, `../../env/.env.${environment}`),
});


export const envConfig = rawData[`${environment}`][`${process.env.TENANT}`];
