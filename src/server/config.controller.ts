import {
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';

@Controller('config')
export class ConfigController {
  private config: Record<string, string> = {
    APP_NAME: process.env.APP_NAME,
  };

  @Get()
  public async fullConfig(): Promise<Record<string, string>> {
    return this.config;
  }

  @Get(':item')
  public async configItem(
    @Param('item') key: string
  ): Promise<Record<string, string>> {
    if (!(key in this.config)) {
      throw new NotFoundException(`Unable to find config property ${key}`);
    }
    return {
      [key]: this.config[key],
    };
  }
}
