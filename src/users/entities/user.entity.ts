import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.id, {})
  @JoinColumn({
    name: 'userProfile_ID',
  })
  profile: UserProfile;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastname: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  birthdate: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  contact?: string;
}
