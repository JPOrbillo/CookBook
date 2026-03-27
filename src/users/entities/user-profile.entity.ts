import { Entity, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

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
}
