import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { UserProfile } from './user-profile.entity';

@Entity()
export class UserPosts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserProfile, (user) => user.user)
  @JoinColumn({ name: 'user_ID' })
  user: UserProfile;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile.fullname)
  @JoinColumn({ name: 'fullname' })
  author: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  dish_name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  recipeCaption: string;
}
