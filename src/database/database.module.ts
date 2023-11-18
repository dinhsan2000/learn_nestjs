import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import process from "process";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserEntity} from "../app/user/entities/user.entity";
import {PostEntity} from "../app/post/entities/post.entity";
import {PostMetaEntity} from "../app/post/entities/post_meta.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'mysql',
        host: ConfigService.get('DATABASE_HOST'),
        port: ConfigService.get('DATABASE_PORT'),
        username: ConfigService.get('DATABASE_USERNAME'),
        password: ConfigService.get('DATABASE_PASSWORD'),
        database: ConfigService.get('DATABASE_NAME'),
        entities: [UserEntity, PostEntity, PostMetaEntity],
        synchronize: true,
        autoLoadEntities: true,
      })
    }),
  ],
})

export class DatabaseModule {
}
