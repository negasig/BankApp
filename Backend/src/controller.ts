import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './service';
import { Customer } from './model/customer';
import { CreateUserDto } from './dto/CustomerDto';
import { AppModule } from './module';
import { Transactionn } from './model/transaction';

@Controller("customers/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("addcustomer")
  create(@Body() createuse: CreateUserDto): Promise< Customer> {
    return this.appService.create(createuse);
  }
   @Get("findCustomers")
  findAll(): Promise< Customer[]> {
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
  @Post("deposit")
  depost(@Body() user:CreateUserDto): Promise<Customer|null|string>{
      return this.appService.deposit(user.AccountNumber, user.Balance, user.description);
  }
  @Post("withdraw")
  withdraw(@Body() user:CreateUserDto): Promise<Customer|null|string|undefined>{
      return this.appService.withdraw(user.AccountNumber, user.Balance, user.description);
    
  }
  @Post('signin')
  signin(@Body() user:CreateUserDto):Promise<Customer|null|string|undefined>{
    return this.appService.login(user.username, user.password)
  }
  @Post("transaction")
  findtransaction(@Body() customerdto:CreateUserDto):Promise<Transactionn>{
return this.appService.findtransactionofuser(customerdto.AccountNumber);
  }
  @Post("transfer")
  transfer(@Body() body:any):Promise<any>{
   const {AccountNumber1, AccountNumber2, amount}=body;
    return this.appService.transfer(AccountNumber1, AccountNumber2, amount)
  }
  @Post("logincs")
  async logincust(@Body() customerd:CreateUserDto){
return this.appService.logincustomer(customerd.username, customerd.password);
  }
}
