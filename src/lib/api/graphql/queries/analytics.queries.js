import { gql } from '@apollo/client';

export const GET_ANALYTICS = gql`
  query GetAnalytics($range: String!) {
    analytics(range: $range) {
      documentsCount
      queriesCount
    }
  }
`;
