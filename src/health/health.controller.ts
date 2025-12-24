import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    @ApiOperation({ summary: 'Health check', description: 'Checks database connectivity' })
    @ApiResponse({ status: 200, description: 'Service is healthy' })
    @ApiResponse({ status: 503, description: 'Service is unhealthy' })
    check() {
        return this.health.check([() => this.db.pingCheck('database')]);
    }

    @Get('ready')
    @HealthCheck()
    @ApiOperation({ summary: 'Readiness check', description: 'Kubernetes readiness probe' })
    @ApiResponse({ status: 200, description: 'Service is ready' })
    readiness() {
        return this.health.check([() => this.db.pingCheck('database')]);
    }

    @Get('live')
    @ApiOperation({ summary: 'Liveness check', description: 'Kubernetes liveness probe' })
    @ApiResponse({ status: 200, description: 'Service is alive' })
    liveness() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }
}
