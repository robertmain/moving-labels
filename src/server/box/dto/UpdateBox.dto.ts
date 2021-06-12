import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { ItemDto } from './Item.dto';

export abstract class UpdateBoxDto {
  @Allow()
  @ApiProperty()
  public name: string;

  @Allow()
  @ApiProperty()
  public description?: string;

  @Allow()
  @ApiProperty({
    type: ItemDto,
    isArray: true,
  })
  public contents?: ItemDto[]
}
