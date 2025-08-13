import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './model/customer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CustomerDto';
import { error, log } from 'console';
import { promises } from 'dns';
import { Transactionn } from './model/transaction';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
@Injectable()
export class AppService {
  constructor(@InjectRepository(Customer) private  readonly userRepository: Repository<Customer>,private readonly jwtservice:JwtService, @InjectRepository(Transactionn) private readonly transactionRepo: Repository<Transactionn>,){}
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
   findUserByUsername(username: string): Promise<Customer|null>{
   return this.userRepository.findOneBy({username:username})
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
 if(user?.password===password && user.username===username){
  return true;
  }
  else if(password===""||username===""){
    return false;
  }
  else{
    return false;
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
async transfer(AccountNumberA:number,  AccountNumberB:number, Amount:number, Description:string):Promise<any>{
  const customer1=await this.userRepository.findOne({where:{AccountNumber: AccountNumberA}})
  const customer2=await this.userRepository.findOne({where:{AccountNumber: AccountNumberB}})
 const transaction=new Transactionn();
  const transaction2=new Transactionn();
  if(Amount<=0){
    return "plase insert amount greater than 0"
  }
 
  else if(customer1 &&   customer1?.Balance<Amount){
    return "insufficeint balance"
  }
  else if(AccountNumberA===customer2?.AccountNumber){
    return "for self is not allowed"
  }
  else if(!customer1 || !customer2){
    return "Accounts does not exist"
  }
  else {
 
    customer1.Balance-=Amount;
    customer2.Balance+=Amount;
    await this.userRepository.save(customer1);
    await this.userRepository.save(customer2);
    
    transaction.date=new Date();
    transaction.AccountNumber=AccountNumberA
    transaction.FirstName=customer1.FirstName
    transaction.Balance=customer1.Balance
    transaction.LastName=customer1.LastName
    transaction.description=Description;
    transaction.transferamount=Amount;
    this.transactionRepo.save(transaction)
        transaction2.date=new Date();
    transaction2.AccountNumber=AccountNumberB
    transaction2.FirstName=customer2.FirstName
    transaction2.Balance=customer2.Balance
    transaction2.LastName=customer2.LastName
    transaction2.description=Description;
    transaction2.transferamount=Amount;
    this.transactionRepo.save(transaction2)
return `You have received ${Amount} Birr from ${AccountNumberA} Your balance is ${customer2.Balance}`;
  
  }
}
async logincustomer(username:string, password:string):Promise<any>{
  
 const user=await this.findUserByUsername(username);
 
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    if(user.password!=password){
      return "invalid credientials"
    }
    return this.jwtservice.sign({role:user.role, username:user.username, accountnumber:user.AccountNumber});
  }
   findUserByAccountNum(accountnumber: number): Promise<any>{
   return this.userRepository.findOneBy({AccountNumber:accountnumber})
  }
}
