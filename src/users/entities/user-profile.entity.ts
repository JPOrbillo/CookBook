import {
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { UserPosts } from './user_posts.entity';
import { SavedRecipes } from './saved_recipes.entity';

//has joined column from entity which is the user id

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //Foreign key to User entity
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_ID' })
  user: User;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  fullname: string;

  @OneToMany(() => UserPosts, (userPosts) => userPosts.user)
  posts: UserPosts[];

  @OneToMany(() => SavedRecipes, (savedRecipes) => savedRecipes.user)
  savedRecipes: SavedRecipes[];
}
