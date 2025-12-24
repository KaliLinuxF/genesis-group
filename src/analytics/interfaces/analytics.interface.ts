/**
 * Time series data point representing event counts over time
 */
export interface TimeSeriesDataPoint {
    /** ISO 8601 date string or timestamp */
    date: string;
    /** Number of events in this time bucket */
    count: number;
    /** Optional source filter (facebook, tiktok) */
    source?: string;
    /** Optional event type filter */
    eventType?: string;
}

/**
 * Geographic breakdown of events by country
 */
export interface CountryBreakdown {
    /** ISO country code or name */
    country: string;
    /** Total number of events from this country */
    eventCount: number;
    /** Count of unique users from this country */
    uniqueUsers: number;
    /** Total number of purchase events */
    totalPurchases: number;
    /** Total revenue generated from this country */
    totalRevenue: number;
}

/**
 * Funnel conversion analysis by source
 */
export interface FunnelAnalysis {
    /** Event source (facebook, tiktok) */
    source: string;
    /** Number of top-of-funnel events */
    topEvents: number;
    /** Number of bottom-of-funnel events */
    bottomEvents: number;
    /** Conversion rate as percentage (0-100) */
    conversionRate: number;
}

/**
 * Event type ranking with count
 */
export interface EventTypeRanking {
    /** Event source */
    source: string;
    /** Type of event */
    eventType: string;
    /** Number of occurrences */
    count: number;
}

/**
 * Generic top entity (campaign, user, etc.)
 */
export interface TopEntity {
    /** Entity unique identifier */
    id: string;
    /** Display name of the entity */
    name: string;
    /** Event count for this entity */
    count: number;
    /** Optional metric (revenue, followers, etc.) */
    metric?: number;
}

/**
 * Overall system statistics
 */
export interface OverallStats {
    /** Total number of events across all sources */
    totalEvents: number;
    /** Events broken down by source */
    eventsBySource: {
        facebook: number;
        tiktok: number;
    };
    /** Events broken down by funnel stage */
    eventsByFunnel: {
        top: number;
        bottom: number;
    };
    /** Overall conversion rate as percentage string */
    conversionRate: string;
}

/**
 * Revenue statistics for a single source
 */
export interface RevenueStats {
    /** Total revenue amount */
    totalRevenue: number;
    /** Number of purchase transactions */
    purchaseCount: number;
    /** Average order value */
    averageOrderValue: number;
}

/**
 * Complete revenue analysis across sources
 */
export interface RevenueAnalysis {
    /** Facebook revenue statistics */
    facebook: RevenueStats;
    /** TikTok revenue statistics */
    tiktok: RevenueStats;
    /** Aggregated totals */
    total: {
        totalRevenue: number;
        purchaseCount: number;
    };
}

export type EventSourceType = 'facebook' | 'tiktok' | 'all';
