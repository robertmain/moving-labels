import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../item.entity';

export abstract class BoxResponseDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public description?: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt?: Date;

  @ApiProperty()
  public contents: Item[]
}
