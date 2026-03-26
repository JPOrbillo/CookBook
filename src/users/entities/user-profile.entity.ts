import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  user_profile_ID: string;

  @OneToOne(() => User, (user) => user.user_ID)
  @JoinColumn({ name: 'user_ID' })
  user: User;

  @OneToOne(() => User, (user) => user.firstname + user.lastname)
  @JoinColumn({ name: 'fullname' })
  fullname: string;

  @Column({})
  posts: string;

  @Column({})
  saved_recipes: string;
}
