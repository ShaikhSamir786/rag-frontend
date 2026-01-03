import { apolloClient } from '@/lib/api/client/graphql.client';
import { gql } from '@apollo/client';

/**
 * Analytics Service
 * Handles analytics queries via GraphQL
 */

// GraphQL Queries
const GET_STATS = gql`
    query GetStats {
        getStats {
            totalQueries
            activeUsers
        }
    }
`;

const GET_ANALYTICS = gql`
    query GetAnalytics($dateRange: String, $tenantId: String) {
        analytics(dateRange: $dateRange, tenantId: $tenantId) {
            totalQueries
            activeUsers
            tokenUsage
            averageLatency
            queriesByDay {
                date
                count
            }
        }
    }
`;

export const AnalyticsService = {
    /**
     * Get basic statistics
     */
    getStats: async () => {
        try {
            const { data } = await apolloClient.query({
                query: GET_STATS,
                fetchPolicy: 'network-only',
            });
            return data.getStats;
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    },

    /**
     * Get analytics with date range
     */
    getAnalytics: async (dateRange = '7d', tenantId = null) => {
        try {
            const { data } = await apolloClient.query({
                query: GET_ANALYTICS,
                variables: { dateRange, tenantId },
                fetchPolicy: 'network-only',
            });
            return data.analytics;
        } catch (error) {
            console.error('Error fetching analytics:', error);
            throw error;
        }
    },

    /**
     * Get token usage statistics
     */
    getTokenUsage: async (dateRange = '30d') => {
        try {
            const analytics = await this.getAnalytics(dateRange);
            return {
                total: analytics.tokenUsage || 0,
                byDay: analytics.queriesByDay || [],
            };
        } catch (error) {
            console.error('Error fetching token usage:', error);
            throw error;
        }
    },
};

