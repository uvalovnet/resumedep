import { Info, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { Profile } from './profile.types';
import { ProfileService } from './profile.service';
import { ProfileRecord } from './profile.repository';
import { requestedProfileRelations } from './profile.selection';

@Resolver(() => Profile)
export class ProfileResolver {

  constructor(private readonly service: ProfileService) {}
  
  @Query(() => Profile, { nullable: true, description: 'Owner profile with requested relations; null if not initialized.' })
  profile(@Info() info: GraphQLResolveInfo): Promise<ProfileRecord | null> {
    return this.service.getProfile(requestedProfileRelations(info));
  }
}
