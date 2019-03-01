import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { BaseModel } from "./base/BaseModel";
import { User } from "./User";

@Entity({ name: "balance" })
export class Balance extends BaseModel {
    
  @ManyToOne(type => User)
  user: User;

  @Column({ name: "balance_difference", type: "float" })
  balanceDifference: number;
}
