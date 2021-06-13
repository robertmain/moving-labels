import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsUUID } from 'class-validator';

export abstract class ItemDto {
  @IsUUID()
  @ApiProperty()
  public id?: string;

  @Allow()
  @ApiProperty()
  public name: string;

  @Allow()
  @ApiProperty()
  public description: string;

  @Allow()
  @ApiProperty()
  public value: number;
}
