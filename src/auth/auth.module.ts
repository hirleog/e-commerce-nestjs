import { PrismaService } from './../prisma/prisma.service';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    UserService,
    PrismaService
  ]
})
export class AuthModule { }
