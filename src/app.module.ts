import { Module } from '@nestjs/common'
import { envSchema } from './env'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from '@controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import {
  AuthenticateController,
  LoginController,
} from '@controllers/authenticate.controller'

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
    LoginController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
