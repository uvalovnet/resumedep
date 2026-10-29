import { Injectable } from '@nestjs/common';
import { ProfileRelation } from './profile.relations';
import { ProfileRepository, ProfileRecord } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}
  getProfile(relations: ReadonlySet<ProfileRelation>): Promise<ProfileRecord | null> {
    return this.repository.findFirst(relations);
  }
}
