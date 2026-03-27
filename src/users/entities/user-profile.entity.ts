import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { UserPosts } from './user_posts.entity';

@Entity()
export class UserProfile {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.user_ID)
  @JoinColumn({ name: 'user_profile_ID' })
  user: User;

  @OneToOne(() => User, (user) => user.firstname + user.lastname)
  @JoinColumn({ name: 'fullname' })
  fullname: string;

  @OneToMany(() => UserPosts, (userPosts) => userPosts.user)
  posts: UserPosts[];
}
