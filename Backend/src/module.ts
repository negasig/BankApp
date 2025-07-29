import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './model/customer';
import {Transactionn } from './model/transaction';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'testng',
      entities: [Customer, Transactionn],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer, Transactionn]), JwtModule.register({
      secret: 'negasi_g', // move to .env for production
      signOptions: { expiresIn: '1h' },
    })],
  controllers: [AppController],
  providers: [AppService],
 exports :[AppService, JwtModule]
})
export class AppModule {}
