import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { UserPosts } from './post.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class SavedRecipes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserPosts)
  @JoinColumn({ name: 'post_ID' })
  recipe: UserPosts;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_ID' })
  user: User;
}
