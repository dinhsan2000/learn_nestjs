import {Column, Entity, OneToMany} from "typeorm";
import {AbstractEntity} from "../../../common/entities/abstract.entity";
import {PostEntity} from "../../post/entities/post.entity";
import {Exclude} from "class-transformer";

@Entity({name: 'users'})
export class UserEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column({select: false})
  password: string;

  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];
}
