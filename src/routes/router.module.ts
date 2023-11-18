import {Module} from "@nestjs/common";
import {RouterModule as RouteModuleCore} from "@nestjs/core";
import {AuthModule} from "../app/auth/auth.module";
import {UserModule} from "../app/user/user.module";
import {PostModule} from "../app/post/post.module";

@Module({
  imports: [
    RouteModuleCore.register([
      {
        path: 'api/v1',
        children: [
          {
            path: 'accounts',
            module: AuthModule
          },
          {
            path: 'users',
            module: UserModule
          },
          {
            path: 'posts',
            module: PostModule
          }
        ]
      }
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})

export class RouterModule {
}
