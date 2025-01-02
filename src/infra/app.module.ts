import { Module } from '@nestjs/common'
import { envSchema } from './env'
import { PrismaService } from './database/prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '../auth/auth.module'

import { HttpModule } from './http/htt.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
  // controllers: [
  //   CreateAccountController,
  //   AuthenticateController,
  //   CreateQuestionController,
  //   LoginController,
  //   FetchRecentQuestionsController,
  // ],
  providers: [PrismaService],
})
export class AppModule {}
