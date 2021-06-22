import { ApiProperty } from '@nestjs/swagger';
import { SIZE } from '../box.entity';
import { Item } from '../item.entity';

export abstract class BoxResponseDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public description?: string;

  @ApiProperty()
  public size?: SIZE;

  @ApiProperty()
  public contents: Item[]
}
