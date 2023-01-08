import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()

export class AuthService {

    constructor(private readonly UserService: UserService) { }

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
