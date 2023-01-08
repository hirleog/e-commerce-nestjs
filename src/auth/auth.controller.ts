import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, HttpCode, Post, HttpStatus, UseGuards } from '@nestjs/common';

@Controller()
export class AuthController {

    constructor(private readonly AuthService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login () {
        return 'login successfully'
    }
}
