import { z } from 'zod';

// ─── Request DTO interfaces ────────────────────────────────────────────────

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshDto {
  refreshToken: string;
}

export interface CreateHouseholdDto {
  name: string;
}

export interface UpdateHouseholdDto {
  name?: string;
}

export interface TransferOwnershipDto {
  newOwnerId: string;
}

export interface AcceptInviteDto {
  code: string;
}

export interface CreateFreezerDto {
  name: string;
  description?: string;
}

export interface UpdateFreezerDto {
  name?: string;
  description?: string;
}

export interface CreateCompartmentDto {
  name: string;
  position?: number;
}

export interface UpdateCompartmentDto {
  name?: string;
  position?: number;
}

export interface CreateItemDto {
  name: string;
  quantity: string;
  freezerId: string;
  compartmentId: string;
  notes?: string;
  storedAt?: string;
  expiresAt?: string;
}

export interface UpdateItemDto {
  name?: string;
  quantity?: string;
  freezerId?: string;
  compartmentId?: string;
  notes?: string;
  storedAt?: string;
  expiresAt?: string;
}

export interface UpdateUserDto {
  name?: string;
}

export interface ItemQueryDto {
  freezerId?: string;
  compartmentIds?: string[];
  search?: string;
  expiresBefore?: string;
  page?: number;
  limit?: number;
}

// ─── Response interfaces ───────────────────────────────────────────────────

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface HouseholdResponse {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export interface MemberResponse {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'OWNER' | 'MEMBER';
  joinedAt: string;
}

export interface HouseholdDetailResponse extends HouseholdResponse {
  members: MemberResponse[];
}

export interface InviteResponse {
  id: string;
  code: string;
  qrDataUri: string;
  expiresAt: string;
}

export interface FreezerResponse {
  id: string;
  householdId: string;
  name: string;
  description: string | null;
  createdAt: string;
}

export interface CompartmentResponse {
  id: string;
  freezerId: string;
  name: string;
  position: number;
}

export interface FreezerDetailResponse extends FreezerResponse {
  compartments: CompartmentResponse[];
}

export interface FreezerItemResponse {
  id: string;
  householdId: string;
  freezerId: string;
  compartmentId: string;
  name: string;
  quantity: string;
  notes: string | null;
  storedAt: string;
  expiresAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: UserResponse;
  updatedBy: UserResponse;
}

export interface ChangeLogEntryResponse {
  id: string;
  itemId: string;
  fieldName: string;
  oldValue: string | null;
  newValue: string | null;
  changedAt: string;
  changedBy: UserResponse;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ─── Zod schemas (client-side validation only) ────────────────────────────

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const createHouseholdSchema = z.object({
  name: z.string().min(1),
});

export const updateHouseholdSchema = z.object({
  name: z.string().min(1).optional(),
});

export const acceptInviteSchema = z.object({
  code: z.string().min(1),
});

export const createFreezerSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const updateFreezerSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export const createCompartmentSchema = z.object({
  name: z.string().min(1),
  position: z.number().min(0).optional(),
});

export const updateCompartmentSchema = z.object({
  name: z.string().min(1).optional(),
  position: z.number().min(0).optional(),
});

export const createItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.string().min(1),
  freezerId: z.string().min(1),
  compartmentId: z.string().min(1),
  notes: z.string().optional(),
  storedAt: z.string().datetime({ offset: true }).optional(),
  expiresAt: z.string().datetime({ offset: true }).optional(),
});

export const updateItemSchema = createItemSchema.partial();

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
});
