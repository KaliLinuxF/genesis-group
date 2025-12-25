import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { WebhookService } from './webhook.service';
import { BaseEventDto } from './dto/event.dto';

@ApiTags('webhook')
@Controller('webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {}

    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOperation({
        summary: 'Receive events from external publishers',
        description: 'Accepts event data from Facebook and TikTok. Events can be sent individually or in batches.',
    })
    @ApiBody({ type: BaseEventDto, isArray: true })
    @ApiResponse({ status: 202, description: 'Events accepted for processing' })
    @ApiResponse({ status: 400, description: 'Invalid event data' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiResponse({ status: 503, description: 'Service unavailable' })
    async receiveEvent(@Body() body: BaseEventDto | BaseEventDto[]): Promise<{ status: string }> {
        const events = Array.isArray(body) ? body : [body];

        await Promise.allSettled(events.map((event) => this.webhookService.handleEvent(event)));

        return { status: 'ok' };
    }
}
