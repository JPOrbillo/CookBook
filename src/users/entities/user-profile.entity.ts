import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { UserPosts } from './user_posts.entity';
import { SavedRecipes } from './saved_recipes.entity';

@Entity()
export class UserProfile {
  @PrimaryColumn('uuid')
  id: string;

  //Foreign key to User entity
  @OneToOne(() => User, (user) => user.user_ID, { eager: true })
  @JoinColumn({ name: 'user_profile_ID' })
  user: User;

  @OneToOne(() => User, (user) => user.firstname + user.lastname, {
    eager: true,
  })
  @JoinColumn({ name: 'fullname' })
  fullname: string;

  @OneToMany(() => UserPosts, (userPosts) => userPosts.user)
  posts: UserPosts[];

  @OneToMany(() => SavedRecipes, (savedRecipes) => savedRecipes.user)
  savedRecipes: SavedRecipes[];
}
