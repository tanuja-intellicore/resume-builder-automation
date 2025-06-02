import * as path from "path";
import * as dotenv from "dotenv";
import rawData from "../../env/env.config.json";

dotenv.config({
  path: path.resolve(__dirname, `../../env/.env.${process.env.ENV}`),
});

export const envConfig = rawData[`${process.env.ENV}`][`${process.env.TENANT}`];
