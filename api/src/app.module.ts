import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import duplicate from 'duplicate-requests';
import * as Joi from 'joi';
import { join } from 'path';
import appConfig from 'src/assets/configs/app.config';
import { LoggingMiddleware } from 'src/globals/logging.middleware';
import { IamModule } from 'src/iam/iam.module';
import { I18nModule } from 'src/globals/i18n/i18n.module';
import { AggregateByLocaleContextIdStrategy } from 'src/globals/aggregate-by-locale.strategy';
import { ContextIdFactory } from '@nestjs/core';
import { EmployeeModule } from './employee/employee.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { MediaModule } from './media/media.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { PermissionModule } from './permission/permission.module';
import { NewsModule } from './news/news.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { GenerateModule } from './generate/generate.module';
import { VoucherModule } from './voucher/voucher.module';
import { EmailModule } from './email/email.module';
import { CommentModule } from './comment/comment.module';
import { AccessCodeModule } from './access-code/access-code.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { S3Module } from './s3/s3.module';

ContextIdFactory.apply(new AggregateByLocaleContextIdStrategy());

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number(),
      }),
      load: [appConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [{
        rootPath: join(__dirname, '..', configService.get('global.fePath')),
        renderPath: '*',
        serveRoot: '',
        exclude: [
          `/${configService.get('api.documentUri')}*`, 
          `/${configService.get('api.prefix')}*`
        ],

      }],
      inject: [ConfigService],
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: 'logs',
          filename: 'info.log',
          level: 'debug',
        }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('database.type') as any,
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name') as any,
        autoLoadEntities: true,
        logging: true,
        eager: true,
      }),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    IamModule,
    I18nModule,
    S3Module,
    EmployeeModule,
    CommonModule,
    RoleModule,
    MediaModule,
    PermissionModule,
    NewsModule,
    TagModule,
    CategoryModule,
    ProductModule,
    CustomerModule,
    OrderModule,
    GenerateModule,
    VoucherModule,
    EmailModule,
    CommentModule,
    AccessCodeModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    const config = {
      expiration: "1s",
      property: (req: { body: any; }) => JSON.stringify(req.body),
      prefix: "root"
    }
    consumer.apply(duplicate(config)).forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
