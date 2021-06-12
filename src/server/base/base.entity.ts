import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  public id: string;

  @CreateDateColumn({ select: false })
  public createdAt: Date;

  @UpdateDateColumn({ select: false })
  public updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn()
  public deletedAt?: Date = null;
}
