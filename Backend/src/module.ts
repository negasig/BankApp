import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './model/customer';
import {Transactionn } from './model/transaction';
import { JwtModule, JwtService } from '@nestjs/jwt';


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
   JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Customer, Transactionn]),],
   exports:[AppService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
