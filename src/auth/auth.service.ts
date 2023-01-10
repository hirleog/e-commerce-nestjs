import { UserToken } from './models/user-token';
import { UserPayload } from './models/user-payload';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()

export class AuthService {
    
    constructor(
        private readonly UserService: UserService,
        private readonly jwt: JwtService
        ) { }
    
    login(user: User): UserToken {

        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone
        };

        const jwtToken = this.jwt.sign(payload);

        return {
            access_token: jwtToken
        }
        // throw new Error('Method not implemented.');
    }

    async validateUser(email: string, password: string) {
        const user = await this.UserService.findByEmail(email)

        if (user) {
            // checar se a informação existe no banco
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined
                }
            }
        }

        throw new Error('Email andress or password providers is incorrect.');
    }
}
