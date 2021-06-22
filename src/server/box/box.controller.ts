import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { BoxResponseDto } from './dto/BoxResponse.dto';
import { UpdateBoxDto } from './dto/UpdateBox.dto';
import { CreateBoxDto } from './dto/CreateBox.dto';
import { BoxService } from './box.service';

@Controller('box')
export class BoxController {
  @Inject(BoxService)
  public boxService: BoxService;

  @Get()
  public async findAll(): Promise<BoxResponseDto[]> {
    return this.boxService.findAll(false, {
      relations: ['contents'],
    });
  }

  @Post()
  public async create(
    @Body() boxContents: CreateBoxDto
  ): Promise<BoxResponseDto[]> {
    return this.boxService.save([
      boxContents,
    ]);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<BoxResponseDto> {
    const [box] = await this.boxService.findById([id], undefined, {
      relations: ['contents'],
    });
    if (!box) {
      throw new NotFoundException(`Unable to locate box ${id}`);
    }
    return box;
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
      @Body() boxContents: UpdateBoxDto
  ): Promise<BoxResponseDto> {
    await this.findOne(id);
    const [box] = await this.boxService.save([{
      id,
      ...boxContents,
    }]);
    return box;
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<unknown> {
    try {
      return this.boxService.remove(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }
    }
  }
}
