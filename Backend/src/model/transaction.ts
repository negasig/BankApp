import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transactionn{
@PrimaryGeneratedColumn()
Id: number;
@Column()
FirstName: string;
@Column()
LastName: string;
@Column()
AccountNumber:number;
@Column()
Balance:number;
@Column()
deposit:number;
@Column()
withdrawal:number
@Column()
description:string
@Column()
date:Date
@Column()
transferamount:number
}