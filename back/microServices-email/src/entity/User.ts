import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn("uuid")
    userId!: string;
  
    @Column()
    name!: string;
  
    @Column()
    email!: string;
  
    @Column()
    password!: string;
}