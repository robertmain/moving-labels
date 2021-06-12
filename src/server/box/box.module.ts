import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxController } from './box.controller';
import { Box } from './box.entity';
import { BoxService } from './box.service';
import { Item } from './item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Box,
      Item,
    ]),
  ],
  controllers: [
    BoxController,
  ],
  providers: [
    BoxService,
  ],
  exports: [],
})
export class BoxModule {}
