import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './model/customer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { error } from 'console';
import { promises } from 'dns';
import { Transactionn } from './model/transaction';

@Injectable()
export class AppService {
  constructor(@InjectRepository(Customer) private readonly userRepository: Repository<Customer>, @InjectRepository(Transactionn) private readonly transactionRepo: Repository<Transactionn>,){}
 create(createUserDto: CreateUserDto): Promise<Customer> {
    const user = new Customer();
    user.FirstName = createUserDto.firstName;
    user.LastName = createUserDto.lastName;
    user.Age = createUserDto.Age;
    user.AccountNumber=createUserDto.AccountNumber;
    user.Balance=createUserDto.Balance;
    user.dailywithdrawl=createUserDto.dailywithdrawal;

    return this.userRepository.save(user);
  }
  find(): Promise<Customer[]>{
    return this.userRepository.find();
  }
  deletuser(id:number):string{
    this.userRepository.delete(id);
    return "user with id "+id +" has been deleted";
  }
  findUserById(id: number): Promise<Customer|null>{
   return this.userRepository.findOneBy({Id:id})
  }
  async deposit(accountNumber: number,amount:number, description:string): Promise<Customer|string|null>{
   
   const user=await this.userRepository.findOne({where:{AccountNumber:accountNumber}})
 if(!user){
  return `Acc ${accountNumber} is not found`;
 }
  else if(amount<0){

  return "Amount Should be greater than zero";
  }
  else if(user){
    const transaction=new Transactionn();
    transaction.AccountNumber=user.AccountNumber;
    transaction.FirstName=user.FirstName;
    transaction.LastName=user.LastName;
    transaction.deposit=amount;
    transaction.description=description
    transaction.Balance=user.Balance+amount;
    transaction.date=new Date();
    await this.transactionRepo.save(transaction);
     user.Balance +=amount;
 await this.userRepository.save(user);

  return `Your Account ${accountNumber} has been credited with ${amount} Birr for ${transaction.description}. Your Current Balance is ${user.Balance}.`;
  }
 else{
 return"please try again"
  }
}
  async withdraw(accountNumber: number,amount:number, description:string): Promise<Customer|string|null|undefined>{
     const dailymax=10000;
   const user=await this.userRepository.findOne({where:{AccountNumber:accountNumber}})
 if(!user){
  return `Account ${accountNumber} does not exist`;
 }

 else if(user.Balance<amount){
  return "You don't have enough balace in your account."
 }

 else if(amount<=0){
  return "Amount should be greater than zero"
 }
  else if(user.dailywithdrawl>dailymax){
  return "reached maximum daily transaction"
 }
   else if(user.dailywithdrawl+amount>dailymax){
  return `${amount} Birr will exceed daily maximum transaction please minimize`;
 }
 else if(user){
    const transaction=new Transactionn();
    transaction.AccountNumber=user.AccountNumber;
    transaction.FirstName=user.FirstName;
    transaction.LastName=user.LastName;
    transaction.withdrawal=amount;
    transaction.description=description
    transaction.date=new Date();
    transaction.Balance=user.Balance-amount;
    await this.transactionRepo.save(transaction);
  user.Balance -=amount;
  user.dailywithdrawl+=amount;
 await this.userRepository.save(user);
  return `${amount} Birr debited from Your Account  ${accountNumber} for ${transaction.description} Your new balance is ${user.Balance} Birr.` ;
 }
 
   else{
return"please try again";
  }
}
async login(username:string, password:string): Promise<any>{
  const user=await this.userRepository.findOne({ where: { username: username } });
 if(user?.password===password&& user.username===username){
  return "loged in"
  }
  else{
    return "incorrect credientials";
  }
}
async findtransactionofuser(AccountNumber:number):Promise<Transactionn|undefined|any>{
  const user=this.transactionRepo.find({where:{AccountNumber:AccountNumber}, order:{
            date: "DESC"
        } })
if(user){
  return user;
}
  return "Account not found";
}
async transfer(Accountnumber2:number, Accountnumber1:number,Amount:number):Promise<any>{
  const account2=await this.transactionRepo.findOne({where:{AccountNumber:Accountnumber2}})
  if(Amount<=0){
    return "plase insert amount greater than 0"
  }
  else if(account2 && Amount>=0){
    account2.Balance+=Amount;
    this.transactionRepo.save(account2);
return `you have transferd ${Amount} to ${Accountnumber2} `
  }
  else{
    return `Account ${Accountnumber2} does not exists`
  }
}
}
