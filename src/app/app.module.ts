import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceOption } from './config';
import { AdminModule } from 'src/admin/admin.module';
import { RecordsModule } from 'src/records/records.module';
import { UsersModule } from 'src/users/users.module';


const typeormOption = {
  ...dataSourceOption,
  autoLoadEntities: true,
} as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormOption),
    AdminModule,
    RecordsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
