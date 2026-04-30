import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { type AuthenticatedUser, CurrentUser } from '../common/decorators/current-user.decorator';
import { HouseholdOwnerGuard } from '../households/guards/household-owner.guard';
import { AcceptInviteDto } from './dto/accept-invite.dto';
import { InvitesService } from './invites.service';

/**
 * Controller for household invite management:
 * creation, listing, revocation, and acceptance.
 */
@ApiTags('invites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('households/:hid/invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  /** Generate a new invite code with QR data URI. */
  @Post()
  @UseGuards(HouseholdOwnerGuard)
  @ApiOperation({ summary: 'Generate invite code + QR' })
  @ApiResponse({ status: 201, description: 'Invite created' })
  create(@Param('hid') hid: string) {
    return this.invitesService.create(hid);
  }

  /** List active (unused, non-expired) invites. */
  @Get()
  @UseGuards(HouseholdOwnerGuard)
  @ApiOperation({ summary: 'List active invites' })
  findAll(@Param('hid') hid: string) {
    return this.invitesService.findAll(hid);
  }

  /** Revoke (delete) an invite. */
  @Delete(':inviteId')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke an invite' })
  revoke(@Param('hid') hid: string, @Param('inviteId') inviteId: string) {
    return this.invitesService.revoke(hid, inviteId);
  }

  /** Accept an invite code and join the household. */
  @Post('accept')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept an invite and join the household' })
  accept(@CurrentUser() user: AuthenticatedUser, @Body() dto: AcceptInviteDto) {
    return this.invitesService.accept(user.userId, dto.code);
  }
}
