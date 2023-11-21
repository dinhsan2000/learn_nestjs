import { Exclude } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @Column()
  @Generated('uuid')
  public uuid: string;

  @CreateDateColumn()
  @Exclude()
  public created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  public updated_at: Date;
}
