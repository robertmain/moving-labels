import { BaseEntity } from 'server/base/base.entity';
import {
  Column, Entity, ObjectType, OneToMany,
} from 'typeorm';
import { Item } from './item.entity';

export enum SIZE {
  XLARGE = 'XLARGE',
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
  XSMALL = 'XSMALL',
}

@Entity({
  orderBy: {
    createdAt: 'ASC',
  },
})
export class Box extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public description?: string;

  @Column({
    type: 'enum',
    enum: SIZE,
    nullable: true,
    default: SIZE.MEDIUM,
  })
  public size?: SIZE = SIZE.MEDIUM;

  @OneToMany(
    (): ObjectType<Item> => Item,
    ({ box }): Box => box,
    { cascade: ['insert', 'soft-remove', 'recover', 'update'] }
  )
  public contents: Item[];
}
