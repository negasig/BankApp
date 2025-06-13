import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStudents(): string {
    return 'All students';
  }
    getStudentByyId(di:number): string {
    return 'Student One';
  }
}
