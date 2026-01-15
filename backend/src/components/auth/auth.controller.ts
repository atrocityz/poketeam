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
import { LoginRequest, RegisterRequest } from './dto';
import { GitHubOAuthGuard, GoogleOAuthGuard } from './guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: RegisterRequest) {
    return this.authService.register(data);
  }

  @ApiOperation({ summary: 'Login user and return JWT tokens' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 400, description: 'Invalid credentials.' })
  @ApiBody({ type: LoginRequest })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() data: LoginRequest,
  ) {
    return this.authService.login(response, data);
  }

  @ApiOperation({ summary: 'Refresh JWT tokens' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Tokens refreshed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refresh(request, response);
  }

  @ApiOperation({ summary: 'Logout user and clear tokens' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User logged out.' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @ApiOperation({ summary: 'Start Google OAuth login flow' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Google OAuth consent screen.',
  })
  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({
    status: 200,
    description:
      'OAuth login successful. Returns HTML with postMessage to frontend.',
  })
  @ApiResponse({ status: 400, description: 'OAuth error.' })
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

  @ApiOperation({ summary: 'Start GitHub OAuth login flow' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to GitHub OAuth consent screen.',
  })
  @Get('github/login')
  @UseGuards(GitHubOAuthGuard)
  githubAuth() {}

  @ApiOperation({ summary: 'GitHub OAuth callback' })
  @ApiResponse({
    status: 200,
    description:
      'OAuth login successful. Returns HTML with postMessage to frontend.',
  })
  @ApiResponse({ status: 400, description: 'OAuth error.' })
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
