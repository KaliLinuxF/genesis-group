import { IsString, IsNotEmpty, IsIn, IsObject, ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEventDto {
    @ApiProperty({ description: 'Unique event identifier', example: 'evt_123456' })
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @ApiProperty({ description: 'Event timestamp in ISO format', example: '2023-12-01T10:30:00Z' })
    @IsString()
    @IsNotEmpty()
    timestamp: string;

    @ApiProperty({ description: 'API version', example: 'v1', default: 'v1' })
    @IsString()
    @IsNotEmpty()
    version: string = 'v1';

    @ApiProperty({ description: 'Event source platform', enum: ['facebook', 'tiktok'], example: 'facebook' })
    @IsString()
    @IsIn(['facebook', 'tiktok'])
    source: 'facebook' | 'tiktok';

    @ApiProperty({ description: 'Funnel stage', enum: ['top', 'bottom'], example: 'top' })
    @IsString()
    @IsIn(['top', 'bottom'])
    funnelStage: 'top' | 'bottom';

    @ApiProperty({ description: 'Type of event', example: 'page_view' })
    @IsString()
    @IsNotEmpty()
    eventType: string;

    @ApiProperty({ description: 'Event-specific data payload' })
    @IsObject()
    data: any;
}

class FacebookUserLocationDto {
    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    city: string;
}

class FacebookUserDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    age: number;

    @IsString()
    @IsIn(['male', 'female', 'non-binary'])
    gender: 'male' | 'female' | 'non-binary';

    @ValidateNested()
    @Type(() => FacebookUserLocationDto)
    location: FacebookUserLocationDto;
}

class FacebookEngagementTopDto {
    @IsString()
    @IsNotEmpty()
    actionTime: string;

    @IsString()
    @IsIn(['newsfeed', 'marketplace', 'groups'])
    referrer: 'newsfeed' | 'marketplace' | 'groups';

    @IsString()
    @IsOptional()
    videoId: string | null;
}

class FacebookEngagementBottomDto {
    @IsString()
    @IsNotEmpty()
    adId: string;

    @IsString()
    @IsNotEmpty()
    campaignId: string;

    @IsString()
    @IsIn(['top_left', 'bottom_right', 'center'])
    clickPosition: 'top_left' | 'bottom_right' | 'center';

    @IsString()
    @IsIn(['mobile', 'desktop'])
    device: 'mobile' | 'desktop';

    @IsString()
    @IsIn(['Chrome', 'Firefox', 'Safari'])
    browser: 'Chrome' | 'Firefox' | 'Safari';

    @IsString()
    @IsOptional()
    purchaseAmount: string | null;
}

class FacebookDataDto {
    @ValidateNested()
    @Type(() => FacebookUserDto)
    user: FacebookUserDto;

    @IsObject()
    engagement: FacebookEngagementTopDto | FacebookEngagementBottomDto;
}

export class FacebookEventDto extends BaseEventDto {
    @IsString()
    @IsIn(['facebook'])
    source: 'facebook';

    @ValidateNested()
    @Type(() => FacebookDataDto)
    data: FacebookDataDto;
}

class TiktokUserLocationDto {
    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    region: string;
}

class TiktokUserDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNumber()
    followersCount: number;

    @IsNumber()
    videosCount: number;

    @ValidateNested()
    @Type(() => TiktokUserLocationDto)
    location: TiktokUserLocationDto;
}

class TiktokEngagementTopDto {
    @IsString()
    @IsNotEmpty()
    videoId: string;

    @IsString()
    @IsNotEmpty()
    timestamp: string;

    @IsString()
    @IsNotEmpty()
    sessionId: string;
}

class TiktokEngagementBottomDto {
    @IsString()
    @IsNotEmpty()
    actionId: string;

    @IsString()
    @IsNotEmpty()
    timestamp: string;

    @IsString()
    @IsIn(['organic', 'paid'])
    source: 'organic' | 'paid';

    @IsString()
    @IsOptional()
    purchaseAmount: string | null;
}

class TiktokDataDto {
    @ValidateNested()
    @Type(() => TiktokUserDto)
    user: TiktokUserDto;

    @IsObject()
    engagement: TiktokEngagementTopDto | TiktokEngagementBottomDto;
}

export class TiktokEventDto extends BaseEventDto {
    @IsString()
    @IsIn(['tiktok'])
    source: 'tiktok';

    @ValidateNested()
    @Type(() => TiktokDataDto)
    data: TiktokDataDto;
}

export type EventDto = FacebookEventDto | TiktokEventDto;
