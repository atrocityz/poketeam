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
import { AuthService } from './auth.service';
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

  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() request, @Res() response: Response) {
    try {
      const result = await this.authService.loginWithOAuth(
        response,
        request.user.email,
      );

      return this.sendOAuthSuccessResponse(response, result.accessToken);
    } catch (error) {
      return this.sendOAuthErrorResponse(
        response,
        error.message || 'Authentication failed',
      );
    }
  }

  @Get('github/login')
  @UseGuards(GitHubOAuthGuard)
  githubAuth() {}

  @Get('github/callback')
  @UseGuards(GitHubOAuthGuard)
  async githubCallback(@Req() request, @Res() response: Response) {
    try {
      const result = await this.authService.loginWithOAuth(
        response,
        request.user.email,
      );

      return this.sendOAuthSuccessResponse(response, result.accessToken);
    } catch (error) {
      return this.sendOAuthErrorResponse(
        response,
        error.message || 'Authentication failed',
      );
    }
  }

  private sendOAuthSuccessResponse(response: Response, accessToken: string) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>OAuth Success</title>
          <style>
            body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
            .message { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          </style>
        </head>
        <body>
          <div class="message">
            <p>✓ Authorization successful</p>
            <p style="color: #666; font-size: 14px;">This window will close automatically...</p>
          </div>
          <script>
            if (window.opener) {
              window.opener.postMessage(
                { type: 'oauth-success', accessToken: '${accessToken}' },
                '${process.env.FRONTEND_ORIGIN}'
              );
              window.close();
            } else {
              window.location.href = '${process.env.FRONTEND_ORIGIN}?accessToken=${accessToken}';
            }
          </script>
        </body>
      </html>
    `;

    response.setHeader('Content-Type', 'text/html');
    response.send(html);
  }

  private sendOAuthErrorResponse(response: Response, errorMessage: string) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>OAuth Error</title>
          <style>
            body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
            .message { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .error { color: #dc2626; }
            button { margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #2563eb; }
          </style>
        </head>
        <body>
          <div class="message">
            <p class="error">✕ ${errorMessage}</p>
            <button onclick="window.close()">Close</button>
          </div>
          <script>
            if (window.opener) {
              window.opener.postMessage(
                { type: 'oauth-error', error: '${errorMessage}' },
                '${process.env.FRONTEND_ORIGIN}'
              );
            }
          </script>
        </body>
      </html>
    `;

    response.setHeader('Content-Type', 'text/html');
    response.send(html);
  }
}
