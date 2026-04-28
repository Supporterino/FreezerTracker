import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdOwnerGuard } from '../households/guards/household-owner.guard';
import { InvitesService } from './invites.service';
import { AcceptInviteDto } from './dto/accept-invite.dto';

@ApiTags('invites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('households/:hid/invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  @UseGuards(HouseholdOwnerGuard)
  @ApiOperation({ summary: 'Generate invite code + QR' })
  @ApiResponse({ status: 201, description: 'Invite created' })
  create(@Param('hid') hid: string) {
    return this.invitesService.create(hid);
  }

  @Get()
  @UseGuards(HouseholdOwnerGuard)
  @ApiOperation({ summary: 'List active invites' })
  findAll(@Param('hid') hid: string) {
    return this.invitesService.findAll(hid);
  }

  @Delete(':inviteId')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke an invite' })
  revoke(@Param('hid') hid: string, @Param('inviteId') inviteId: string) {
    return this.invitesService.revoke(hid, inviteId);
  }

  @Post('accept')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept an invite and join the household' })
  accept(@Request() req: any, @Body() dto: AcceptInviteDto) {
    return this.invitesService.accept(req.user.userId, dto.code);
  }
}
