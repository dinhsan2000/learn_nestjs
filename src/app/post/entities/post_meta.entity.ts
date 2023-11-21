import { Column, Entity, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { AbstractEntity } from '../../../common/entities/abstract.entity';

@Entity('post_metas')
export class PostMetaEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  value: string;

  @ManyToOne(() => PostEntity, (post) => post.meta)
  post: PostEntity;
}
