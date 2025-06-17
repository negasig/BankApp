import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './service';
import { User } from './model/user';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller("students/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("addUser")
  create(@Body() createuse: CreateUserDto): Promise< User> {
    return this.appService.create(createuse);
  }
   @Get("findCustomers")
  findAll(): Promise< User[]> {
    return this.appService.find();
  }
  @Get('findByid/:id')
  getUserByid(@Param('id') id:number){
    return this.appService.findUserById(id);
  }
  @Delete('deleteuser/:id')
  deletuser(@Param('id') id:number): string{
    return this.appService.deletuser(id)
  }
}
