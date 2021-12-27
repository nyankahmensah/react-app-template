import { ApolloCache, FieldPolicy, gql } from "@apollo/client";

// this is an example entity You can define yours
interface Entity {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

export const entitiesPolicy: FieldPolicy<Entity[]> = {
  keyArgs: [],
  merge: (existing, incoming, { args: { pagination = {skip: 0} }}: any) => {
    const merged = existing ? existing.slice(0) : [];
    for (let i = 0; i < incoming.length; ++i) {
      merged[pagination.skip + i] = incoming[i];
    }
    return merged;
  },
}

interface EntitiesCacheModifier {
  createEntity?: any;
  updateEntity?: any;
  deleteEntity?: any;
}

export const entitiesCacheModifier = (cache: ApolloCache<{}>, data: EntitiesCacheModifier) => {
  cache.modify({
    fields: {
      entities: (existingEntities = []) => {
        if(data?.createEntity) {
          const newEntityRef = cache.writeFragment({
            data: data?.createEntity,
            fragment: gql`
              fragment NewEntity on Entity {
                _id
                name
                createdAt
                updatedAt
              }
            `
          });
          return [...existingEntities, newEntityRef];
        }
        return  existingEntities;
      }
    }
  })

}