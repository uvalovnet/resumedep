import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ProfileRelation } from './profile.relations';

type FullProfile = Prisma.ProfileGetPayload<{
  include: { links: true; skills: true; experience: true; projects: true };
}>;

export type ProfileRecord = Omit<FullProfile, ProfileRelation> & Partial<Pick<FullProfile, ProfileRelation>>;

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst(relations: ReadonlySet<ProfileRelation>): Promise<ProfileRecord | null> {
    const include = {
      links: relations.has('links'),
      skills: relations.has('skills'),
      experience: relations.has('experience'),
      projects: relations.has('projects'),
    } satisfies Prisma.ProfileInclude;
    return this.prisma.profile.findFirst({
      relationLoadStrategy: 'join',
      include,
    });
  }
}
