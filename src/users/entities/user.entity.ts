import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;                  
              
    //TypeORM documentations says "nullable:false" is default

    @Column({
        unique:true,
        nullable:false
    })
    username:string



    @Column({
        nullable:false
    })
    password:string



    @Column({
        nullable:false
    })
    firstname:string


    
    @Column({
        nullable:false
    })
    lastname:string



    @Column({
        type:'date',
        nullable:true
    })
   birthdate?:string

   

   @Column({
        nullable:true
   })
   contact?:string

   
}
