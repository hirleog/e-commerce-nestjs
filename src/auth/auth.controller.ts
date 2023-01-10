import { AuthRequest } from './models/auth-request';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, HttpCode, Post, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {

    constructor(private readonly AuthService: AuthService) { }

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login (@Request() req: AuthRequest) {
        // console.log(req.user);
        
        // return this.AuthService.login(req.user)
    }
}
