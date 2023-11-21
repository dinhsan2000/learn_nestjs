import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { PostMetaEntity } from './post_meta.entity';

@Entity({ name: 'posts' })
export class PostEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  thumbnail: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToMany(() => PostMetaEntity, (meta) => meta.post)
  meta: PostMetaEntity[];
}
