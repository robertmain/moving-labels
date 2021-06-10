import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { BaseEntity } from './base/base.entity';
import { HealthController } from './health.controller';

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
      entities: [
        BaseEntity,
      ],
      migrations: [join(__dirname, '/migration/**/*.ts')],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      renderPath: '/',
    }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {
  private readonly connection: Connection;

  public constructor(connection: Connection) {
    this.connection = connection;
  }
}
