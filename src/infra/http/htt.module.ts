import { Module } from '@nestjs/common'

import {
  AuthenticateController,
  LoginController,
} from '@controllers/authenticate.controller'
import { CreateAccountController } from '@controllers/create-account.controller'
import { CreateQuestionController } from '@controllers/create-question.controller'
import { FetchRecentQuestionsController } from '@controllers/fetch-recente-questions.controller'
import { PrismaService } from '../database/prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    LoginController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
