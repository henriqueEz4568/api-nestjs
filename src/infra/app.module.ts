import { Module } from '@nestjs/common'
import { envSchema } from './env'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '../auth/auth.module'
import {
  AuthenticateController,
  LoginController,
} from '@/infra/http/controllers/authenticate.controller'
import { FetchRecentQuestionsController } from '@/infra/http/controllers/fetch-recente-questions.controller'
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    LoginController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
