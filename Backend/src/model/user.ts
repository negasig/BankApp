import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
@PrimaryGeneratedColumn()
Id: number;

 @Column()
  FirstName: string;
   @Column()
  LastName: string;
@Column()
Age:number;
@Column()
AccountNumber:number;
@Column()
Balance:number;
@Column()
dailywithdrawl:number;
}