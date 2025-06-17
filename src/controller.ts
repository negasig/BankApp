import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './service';
import { User } from './model/user';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller("students")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/addUser")
  create(@Body() createuse: CreateUserDto): Promise< User> {
    return this.appService.create(createuse);
  }
}
