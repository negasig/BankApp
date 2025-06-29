import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { error } from 'console';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,){}
 create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.FirstName = createUserDto.firstName;
    user.LastName = createUserDto.lastName;
    user.Age = createUserDto.Age;
    user.AccountNumber=createUserDto.AccountNumber;
    user.Balance=createUserDto.Balance;
    user.dailywithdrawl=createUserDto.dailywithdrawal;

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
  async deposit(accountNumber: number,amount:number): Promise<User|string|null>{
   
   const user=await this.userRepository.findOne({where:{AccountNumber:accountNumber}})
 if(!user){
  return `Acc ${accountNumber} is not found`;
 }
  else if(amount<0){

  return "Amount Should be greater than zero";
  }
 else{
  user.Balance +=amount;
 await this.userRepository.save(user);
  return `Your Account ${accountNumber} has been credited with ${amount} Birr. Your Current Balance is ${user.Balance}.`;
  }
}
  async withdraw(accountNumber: number,amount:number): Promise<User|string|null|undefined>{
     const dailymax=10000;
   const user=await this.userRepository.findOne({where:{AccountNumber:accountNumber}})
 if(!user){
  return `Account ${accountNumber} does not exist`;
 }

 else if(user.Balance<amount){
  return "You don't have enough balace in your account."
 }

 else if(amount<0){
  return "Amount should be greater than zero"
 }
  else if(user.dailywithdrawl+amount>dailymax){
  return "reached maximum daily transaction"
 }
   else{
  user.Balance -=amount;
  user.dailywithdrawl+=amount;
 await this.userRepository.save(user);
  return `${amount} Birr deducted from Your Account  ${accountNumber} your new balance is ${user.Balance} Birr` ;
  }
}
}
