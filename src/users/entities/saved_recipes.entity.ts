import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { UserPosts } from './user_posts.entity';
import { User } from './user.entity';

@Entity()
export class SavedRecipes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserPosts)
  @JoinColumn({ name: 'post_ID' })
  recipe: UserPosts;

  @ManyToOne(() => User, (user) => user.user_ID)
  @JoinColumn({ name: 'user_ID' })
  user: User;
}
