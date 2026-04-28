import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile' })
  getMe(@Request() req: any) {
    return this.usersService.getMe(req.user.userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user name' })
  @ApiResponse({ status: 200, description: 'Updated user profile' })
  updateMe(@Request() req: any, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(req.user.userId, dto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete current user account' })
  @ApiResponse({ status: 204, description: 'Account deleted' })
  deleteMe(@Request() req: any) {
    return this.usersService.deleteMe(req.user.userId);
  }
}
