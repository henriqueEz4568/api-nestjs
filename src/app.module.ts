import { Module } from '@nestjs/common'
import { envSchema } from './env'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from '@controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
