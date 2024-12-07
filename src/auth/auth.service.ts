import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly users = [];  // Simulating a user database

  constructor(private jwtService: JwtService) {}

  // Validate user credentials (for login)
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return { id: user.id, username: user.username };
    }
    return null;
  }

  // Create a new user (Sign-up)
  async signUp(createUserDto: { username: string; password: string }) {
    const { username, password } = createUserDto;

    // Check if the user already exists
    const userExists = this.users.some(user => user.username === username);
    if (userExists) {
      throw new Error('User already exists');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the new user
    const newUser = {
      id: this.users.length + 1,  // Mock user ID
      username,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return this.login(newUser); // Return access & refresh tokens after sign-up
  }

  // Generate Access Token and Refresh Token
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    const access_token = this.jwtService.sign(payload, {
      secret: 'accessSecret',  // Use a secret key for access token
      expiresIn: '1h',         // Access token expires in 1 hour
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: 'refreshSecret', // Use a different secret key for refresh token
      expiresIn: '7d',         // Refresh token expires in 7 days
    });

    return {
      access_token,
      refresh_token,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour in seconds
    };
  }

  // Optionally, handle refresh token logic here (e.g., issue new access token)
  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'refreshSecret',
      });
      const user = { id: payload.sub, username: payload.username };
      return this.login(user); // Issue new tokens based on refresh token
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
