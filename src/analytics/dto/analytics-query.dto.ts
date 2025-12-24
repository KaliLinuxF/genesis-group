import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum EventSource {
    FACEBOOK = 'facebook',
    TIKTOK = 'tiktok',
    ALL = 'all',
}

export class TimeSeriesQueryDto {
    @ApiProperty({
        description: 'Number of hours to look back',
        minimum: 1,
        maximum: 168,
        default: 24,
        required: false,
        example: 24,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(168)
    hours?: number = 24;

    @ApiProperty({
        description: 'Filter by event source',
        enum: EventSource,
        required: false,
        example: EventSource.FACEBOOK,
    })
    @IsOptional()
    @IsEnum(EventSource)
    source?: EventSource;
}

export class TopEntitiesQueryDto {
    @ApiProperty({
        description: 'Maximum number of results to return',
        minimum: 1,
        maximum: 100,
        default: 10,
        required: false,
        example: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;
}

export class CountryBreakdownQueryDto {
    @ApiProperty({
        description: 'Filter by event source',
        enum: EventSource,
        default: EventSource.ALL,
        required: false,
        example: EventSource.ALL,
    })
    @IsOptional()
    @IsEnum(EventSource)
    source?: EventSource = EventSource.ALL;
}

export class TopUsersQueryDto extends TopEntitiesQueryDto {
    @ApiProperty({
        description: 'Event source (required for user query)',
        enum: [EventSource.FACEBOOK, EventSource.TIKTOK],
        required: true,
        example: EventSource.FACEBOOK,
    })
    @IsEnum(EventSource, { message: 'source must be facebook or tiktok' })
    source!: EventSource.FACEBOOK | EventSource.TIKTOK;
}
