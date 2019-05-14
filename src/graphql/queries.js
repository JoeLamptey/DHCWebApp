// eslint-disable
// this is an auto generated file. This will be overwritten

export const getDomiciliary = `query GetDomiciliary($id: ID!) {
  getDomiciliary(id: $id) {
    id
    title
  }
}
`;
export const listDomiciliaries = `query ListDomiciliaries(
  $filter: TableDomiciliaryFilterInput
  $limit: Int
  $nextToken: String
) {
  listDomiciliaries(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
    }
    nextToken
  }
}
`;
