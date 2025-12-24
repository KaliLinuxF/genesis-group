import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import {
    TimeSeriesQueryDto,
    TopEntitiesQueryDto,
    CountryBreakdownQueryDto,
    TopUsersQueryDto,
} from './dto/analytics-query.dto';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
    private readonly logger = new Logger(AnalyticsController.name);

    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('overview')
    @ApiOperation({
        summary: 'Get overall statistics',
        description: 'Returns total events, events by source, and funnel stage breakdown',
    })
    @ApiResponse({ status: 200, description: 'Returns overall statistics' })
    async getOverview() {
        this.logger.debug('Fetching analytics overview');
        return this.analyticsService.getOverallStats();
    }

    @Get('timeseries')
    @ApiOperation({
        summary: 'Get time series data',
        description: 'Returns event counts over time with optional filtering by source',
    })
    @ApiResponse({ status: 200, description: 'Returns time series data' })
    async getTimeSeries(@Query() query: TimeSeriesQueryDto) {
        this.logger.debug(`Fetching time series for ${query.hours} hours, source: ${query.source || 'all'}`);
        return this.analyticsService.getEventTimeSeries(query.hours!, query.source);
    }

    @Get('events-by-type')
    @ApiOperation({
        summary: 'Get top event types',
        description: 'Returns most frequent event types',
    })
    @ApiResponse({ status: 200, description: 'Returns event type statistics' })
    async getEventsByType(@Query() query: TopEntitiesQueryDto) {
        this.logger.debug(`Fetching top ${query.limit} event types`);
        return this.analyticsService.getEventsByType(query.limit!);
    }

    @Get('countries')
    @ApiOperation({
        summary: 'Get country breakdown',
        description: 'Returns event distribution by country with optional source filtering',
    })
    @ApiResponse({ status: 200, description: 'Returns country statistics' })
    async getCountryBreakdown(@Query() query: CountryBreakdownQueryDto) {
        this.logger.debug(`Fetching country breakdown for source: ${query.source}`);
        return this.analyticsService.getCountryBreakdown(query.source!);
    }

    @Get('funnel')
    @ApiOperation({
        summary: 'Get funnel analysis',
        description: 'Returns conversion funnel metrics (top vs bottom of funnel)',
    })
    @ApiResponse({ status: 200, description: 'Returns funnel analysis' })
    async getFunnelAnalysis() {
        this.logger.debug('Fetching funnel analysis');
        return this.analyticsService.getFunnelAnalysis();
    }

    @Get('top-campaigns')
    @ApiOperation({
        summary: 'Get top performing campaigns',
        description: 'Returns Facebook campaigns sorted by conversion count',
    })
    @ApiResponse({ status: 200, description: 'Returns top campaigns' })
    async getTopCampaigns(@Query() query: TopEntitiesQueryDto) {
        this.logger.debug(`Fetching top ${query.limit} campaigns`);
        return this.analyticsService.getTopCampaigns(query.limit!);
    }

    @Get('top-users')
    @ApiOperation({
        summary: 'Get most active users',
        description: 'Returns users with highest event counts for specified source',
    })
    @ApiResponse({ status: 200, description: 'Returns top users' })
    async getTopUsers(@Query() query: TopUsersQueryDto) {
        this.logger.debug(`Fetching top ${query.limit} users for ${query.source}`);
        return this.analyticsService.getTopUsers(query.source, query.limit!);
    }

    @Get('revenue')
    @ApiOperation({
        summary: 'Get revenue analysis',
        description: 'Returns revenue metrics by source with total and breakdown',
    })
    @ApiResponse({ status: 200, description: 'Returns revenue analysis' })
    async getRevenueAnalysis() {
        this.logger.debug('Fetching revenue analysis');
        return this.analyticsService.getRevenueAnalysis();
    }
}
