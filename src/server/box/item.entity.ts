import { BaseEntity } from 'server/base/base.entity';
import {
  Column, Entity, ManyToOne, ObjectType,
} from 'typeorm';
import { Box } from './box.entity';

@Entity()
export class Item extends BaseEntity {
  @Column({
    nullable: false,
  })
  public name: string;

  @Column({
    nullable: true,
  })
  public description?: string;

  @Column({
    comment: 'The value of a given item in cents(to make currency calculations easier)',
    nullable: true,
  })
  public value?: number;

  @ManyToOne(
    (): ObjectType<Box> => Box,
    ({ contents }): Item[] => contents,
    {
      nullable: false,
      orphanedRowAction: 'delete',
    }
  )
  public box: Box;
}
