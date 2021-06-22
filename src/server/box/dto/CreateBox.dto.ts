import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEnum } from 'class-validator';
import { SIZE } from '../box.entity';
import { ItemDto } from './Item.dto';

export abstract class CreateBoxDto {
  @Allow()
  @ApiProperty()
  public name: string;

  @Allow()
  @ApiProperty({
    type: 'string',
    required: false,
    default: null,
  })
  public description?: string;

  @IsEnum(SIZE)
  @ApiProperty({
    type: 'string',
    enum: SIZE,
    required: true,
  })
  public size?: SIZE;

  @Allow()
  @ApiProperty({
    type: ItemDto,
    isArray: true,
  })
  public contents?: ItemDto[]
}
