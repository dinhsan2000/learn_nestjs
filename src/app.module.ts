import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {config} from './config/configuration';
import * as Joi from '@hapi/joi'
import {DatabaseModule} from "./database/database.module";
import {DataSource} from "typeorm";
import {RouterModule} from "./routes/router.module";
import {AuthModule} from "./app/auth/auth.module";
import {UserModule} from "./app/user/user.module";
import {PostModule} from './app/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(3306),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      })
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    RouterModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}
