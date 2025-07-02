import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user';
import {Transactionn } from './model/transaction';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'testng',
      entities: [User, Transactionn],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Transactionn]),],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
