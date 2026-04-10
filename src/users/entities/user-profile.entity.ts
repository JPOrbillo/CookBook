import {
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { UserPosts } from 'src/posts/entities/post.entity';
import { SavedRecipes } from '../../posts/entities/saved_recipes.entity';

//has joined column from entity which is the user id

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //Foreign key to User entity
  @OneToOne(() => User, (user) => user.userProfile, { cascade: true })
  @JoinColumn({ name: 'user_ID' })
  userProfile!: User;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  fullname!: string;

  @OneToMany(() => SavedRecipes, (savedRecipes) => savedRecipes.user)
  savedRecipes!: SavedRecipes[];

  @OneToMany(() => UserPosts, (posts) => posts.userProfile)
  posts!: UserPosts[];
}
