import { Controller, Get } from '@nestjs/common';
import { AppService } from './service';

@Controller("students")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/allstudents")
  getHello(): string {
    return this.appService.getStudents();
  }
  @Get("/student")
  getstudentbyid(): string {
    return this.appService.getStudentByyId(5);
  }
}
