import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Box } from 'server/box/box.entity';
import { Item } from 'server/box/item.entity';
import { ManifestController } from './manifest.controller';
import { InventoryController } from './inventory.controller';
import { BoxModule } from '../box/box.module';

@Module({
  imports: [
    BoxModule,
    TypeOrmModule.forFeature([Box, Item]),
  ],
  controllers: [
    ManifestController,
    InventoryController,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class ReportModule {}
