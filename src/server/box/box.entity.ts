import { BaseEntity } from 'server/base/base.entity';
import {
  Column, Entity, ObjectType, OneToMany,
} from 'typeorm';
import { Item } from './item.entity';

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

  @OneToMany(
    (): ObjectType<Item> => Item,
    ({ box }): Box => box,
    { cascade: ['insert', 'soft-remove', 'recover', 'update'] }
  )
  public contents: Item[];
}
