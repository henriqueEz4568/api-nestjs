import { ConflictException, Body, Controller, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'bcryptjs'

@Controller('/account')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}
  @Post()
  async handle(@Body() body: any) {
    const { name, email, password } = body
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (userWithSameEmail) {
      throw new ConflictException('Ja existem um usuario com o mesmo email!')
    }
    const hashedPassword = await hash(password, 8)
    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
