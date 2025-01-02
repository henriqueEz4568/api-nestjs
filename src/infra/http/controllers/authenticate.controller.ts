import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UsePipes,
  HttpCode,
} from '@nestjs/common'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { JwtService } from '@nestjs/jwt'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service' // Certifique-se de que isso está importado corretamente

const authBodySchema = z.object({
  password: z.string(),
  email: z.string().email(),
})

type AuthenticateBodySchema = z.infer<typeof authBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle() {
    // Gerar o token
    const token = this.jwt.sign({ sub: 'user-id' })

    // Retornar o token como parte de um objeto
    return { access_token: token }
  }
}

@Controller('/login')
export class LoginController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService, // Injeção do PrismaService
  ) {}

  @Post()
  @HttpCode(202)
  @UsePipes(new ZodValidationPipe(authBodySchema))
  async login(@Body() body: AuthenticateBodySchema) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    const isPasswordCorrect = await compare(body.password, user.password)
    if (!isPasswordCorrect) {
      return false
    }
    const token = this.jwt.sign({ sub: user.id })
    const newUser = { ...user, acces_token: token }
    return { newUser }
  }
}
