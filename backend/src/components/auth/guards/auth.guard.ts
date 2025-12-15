import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {}

export class GoogleOAuthGuard extends AuthGuard('google') {}

export class GitHubOAuthGuard extends AuthGuard('github') {}
