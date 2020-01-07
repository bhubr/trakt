import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import './env';
import { Task } from './task/task.entity';
import { Timebox } from './timebox/timebox.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TimeboxModule } from './timebox/timebox.module';
import settings from './settings';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...settings.database,
      entities: [Task, Timebox],
    }),
    TaskModule,
    TimeboxModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
