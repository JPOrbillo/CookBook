import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;                  
              
    //TypeORM documentations says "nullable:false" is default
    @Column({
        unique:true
    })
    username:string

    @Column()
    password:string


    @Column()
    firstname:string

    
    @Column()
    lastname:string
   
}
