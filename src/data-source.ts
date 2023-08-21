import "reflect-metadata"
import { DataSource } from "typeorm"
import { dataSourceOption } from './app/config';

export const AppDataSource = new DataSource(dataSourceOption)
