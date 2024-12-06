import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async login(username: string, password: string) {
        // Replace with proper user validation
        if (username === 'test' && password === 'test123') {
            const payload = { username };
            const access_token = this.jwtService.sign(payload);
            return {
                access_token,
                refresh_token: 'mock_refresh_token',
                token_type: 'Bearer',
                expires_in: 3600,
            };
        }
        throw new Error('Invalid credentials');
    }
}