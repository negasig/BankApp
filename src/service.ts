import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,){}
 create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.FirstName = createUserDto.firstName;
    user.LastName = createUserDto.lastName;
    user.Age = createUserDto.Age;

    return this.userRepository.save(user);
  }
  find(): Promise<User[]>{
    return this.userRepository.find();
  }
  deletuser(id:number):string{
    this.userRepository.delete(id);
    return "user with id "+id +" has been deleted";
  }
  findUserById(id: number): Promise<User|null>{
   return this.userRepository.findOneBy({Id:id})
  }
}
