import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(data: any) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing)
      throw new ConflictException('Cet email est déjà utilisé');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
      },
      select: { id: true, email: true, role: true }
    });
  }
}
