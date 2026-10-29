import {
  GraphQLIncludeDirective, GraphQLResolveInfo, GraphQLSkipDirective,
  Kind, SelectionSetNode, getDirectiveValues, getNamedType,
  isAbstractType, isObjectType, typeFromAST,
} from 'graphql';
import { PROFILE_RELATIONS, ProfileRelation } from './profile.relations';


export function requestedProfileRelations(info: GraphQLResolveInfo): ReadonlySet<ProfileRelation> {
  const result = new Set<ProfileRelation>();
  const visited = new Set<string>();
  const returnType = getNamedType(info.returnType);
  if (!isObjectType(returnType)) throw new Error('Expected a concrete Profile return type');
  const runtimeType = returnType;

  function walk(selectionSet: SelectionSetNode): void {
    for (const selection of selectionSet.selections) {
      if (getDirectiveValues(GraphQLSkipDirective, selection, info.variableValues)?.if === true) continue;
      if (getDirectiveValues(GraphQLIncludeDirective, selection, info.variableValues)?.if === false) continue;
      if (selection.kind === Kind.FIELD) {
        const name = selection.name.value;
        for (const relation of PROFILE_RELATIONS) {
          if (relation === name) result.add(relation);
        }
        continue;
      }
      const fragment = selection.kind === Kind.FRAGMENT_SPREAD
        ? info.fragments[selection.name.value] : selection;
      if (!fragment) continue;
      if (fragment.typeCondition) {
        const condition = typeFromAST(info.schema, fragment.typeCondition);
        if (condition !== runtimeType &&
            !(condition && isAbstractType(condition) && info.schema.isSubType(condition, runtimeType))) continue;
      }
      if (selection.kind === Kind.FRAGMENT_SPREAD) {
        if (visited.has(selection.name.value)) continue;
        visited.add(selection.name.value);
      }
      walk(fragment.selectionSet);
    }
  }
  for (const node of info.fieldNodes) if (node.selectionSet) walk(node.selectionSet);
  return result;
}
