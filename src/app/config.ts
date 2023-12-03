import { existsSync } from 'fs';
import { config as dotenvConfig }  from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { Record } from 'src/entities/record.entity';
const fileName = 'server.env'
if (existsSync(fileName))
    dotenvConfig({path:fileName});

  


export const dataSourceOption: DataSourceOptions = {
      type: 'sqlite',
      database: 'rank.db',
      synchronize: false,
      logging: false,
      entities: [User, Record],
      migrations: ['./migration/*.ts', './migration/*.js'],
      subscribers: ['./subscriber/*.ts', './subscriber/*.js'],
  };

export class Config {
  public readonly port: string = process.env.Port || '9080';
//   public readonly host: string = process.env.HOST || 'localhost';
}
export const config = new Config();
