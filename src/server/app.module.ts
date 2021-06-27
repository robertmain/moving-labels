import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BoxModule } from './box/box.module';
import { LabelModule } from './label/label.module';
import { ReportModule } from './report/report.module';
import { ConfigController } from './config.controller';

const {
  DATABASE_URL,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DATABASE_URL,
      extra: {
        ssl: {
          rejectUnauthorized: false,
          sslMode: 'allow',
        },
      },
      autoLoadEntities: true,
      migrations: [join(__dirname, '/migration/**/*.ts')],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      renderPath: '/',
    }),
    BoxModule,
    LabelModule,
    ReportModule,
  ],
  controllers: [
    ConfigController,
  ],
  providers: [],
})
export class AppModule {
  private readonly connection: Connection;

  public constructor(connection: Connection) {
    this.connection = connection;
  }
}
