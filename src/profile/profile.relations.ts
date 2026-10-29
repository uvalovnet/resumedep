export const PROFILE_RELATIONS = ['links', 'skills', 'experience', 'projects'] as const;
export type ProfileRelation = typeof PROFILE_RELATIONS[number];
