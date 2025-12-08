import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'prisma/generated/client';
import { AuthService } from './auth.service';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import { LoginRequest } from './dto/login.dto';
import { RegisterRequest } from './dto/register.dto';
import { GitHubOAuthGuard, GoogleOAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: RegisterRequest) {
    return this.authService.register(data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() data: LoginRequest,
  ) {
    return this.authService.login(response, data);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refresh(request, response);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Authorized() user: User) {
    return user;
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() request, @Res() response: Response) {
    const authResult = await this.authService.loginWithOAuth(
      response,
      request.user.email,
    );

    response.send(`
       <!DOCTYPE html>
       <html>
         <head>
           <title>Auth Complete</title>
         </head>
         <body>
           <script>
             const token = '${authResult.accessToken}';
             const user = ${JSON.stringify(authResult.user)};

             if (window.opener) {
              window.opener.postMessage({
                type: 'OAUTH_SUCCESS',
                token: token,
                user,
              }, '*');

              window.close();
            }
           </script>
         </body>
       </html>
     `);
  }

  @Get('github/login')
  @UseGuards(GitHubOAuthGuard)
  githubAuth() {}

  @Get('github/callback')
  @UseGuards(GitHubOAuthGuard)
  async githubCallback(@Req() request, @Res() response: Response) {
    const authResult = await this.authService.loginWithOAuth(
      response,
      request.user.email,
    );

    response.send(`
       <!DOCTYPE html>
       <html>
         <head>
           <title>Auth Complete</title>
         </head>
         <body>
           <script>
             const token = '${authResult.accessToken}';
             const user = ${JSON.stringify(authResult.user)};

             window.opener.postMessage(
               {
                 type: 'OAUTH_SUCCESS',
                 token: token,
                 user,
               },
               '*',
             );

             window.close();
           </script>
         </body>
       </html>
     `);
  }
}
