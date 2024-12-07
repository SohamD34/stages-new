export interface JwtPayload {
  sub: string;  // The user ID (from JWT payload 'sub' claim)
  username: string;  // The username or any other field from the JWT payload
}