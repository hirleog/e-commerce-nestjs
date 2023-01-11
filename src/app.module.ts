import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:
    [
      PrismaModule,
      UserModule,
      AuthModule,
      ProductModule,
      MulterModule.register({
        dest: './uploads',
      })
    ],
  controllers: [AppController],
  providers:
    [
      AppService,
      {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      },
    ],
})
export class AppModule { }
