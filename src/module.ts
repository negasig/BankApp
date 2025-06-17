import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'testng',
      entities: [User],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
