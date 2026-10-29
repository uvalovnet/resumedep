import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfessionalLink {
  @Field(() => String) label!: string;
  @Field(() => String) url!: string;
}

@ObjectType()
export class Skill {
  @Field(() => String) name!: string;
}

@ObjectType()
export class Experience {
  @Field(() => String) company!: string;
  @Field(() => String) position!: string;
  @Field(() => String, { description: 'MM-YYYY' }) startDate!: string;
  @Field(() => String, { nullable: true, description: 'MM-YYYY; null = currently employed' }) endDate!: string | null;
  @Field(() => [String]) achievements!: string[];
}

@ObjectType()
export class Project {
  @Field(() => String) name!: string;
  @Field(() => String) url!: string;
  @Field(() => String) description!: string;
}

@ObjectType()
export class Profile {
  @Field(() => String) name!: string;
  @Field(() => String) description!: string;
  @Field(() => [ProfessionalLink]) links!: ProfessionalLink[];
  @Field(() => [Skill]) skills!: Skill[];
  @Field(() => [Experience]) experience!: Experience[];
  @Field(() => [Project]) projects!: Project[];
}
