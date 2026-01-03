import { gql } from '@apollo/client';

export const GET_DOCUMENTS = gql`
  query GetDocuments($limit: Int, $offset: Int) {
    documents(limit: $limit, offset: $offset) {
      id
      title
      status
    }
  }
`;
