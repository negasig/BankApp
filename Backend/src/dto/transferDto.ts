import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransferDto{

fromACC:number
toACC:number
amount:number
}