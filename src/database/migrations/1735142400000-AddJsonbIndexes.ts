import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJsonbIndexes1735142400000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // GIN index for JSONB queries
        await queryRunner.query(`
            CREATE INDEX idx_events_data_gin 
            ON events USING GIN (data)
        `);

        // Campaign analytics index data->'engagement'->>'campaignId'
        await queryRunner.query(`
            CREATE INDEX idx_events_campaign_id 
            ON events ((data->'engagement'->>'campaignId')) 
            WHERE data->'engagement'->>'campaignId' IS NOT NULL
        `);

        // User analytics index data->'user'->>'userId'
        await queryRunner.query(`
            CREATE INDEX idx_events_user_id 
            ON events ((data->'user'->>'userId'))
        `);

        // Geographic analytics index with COALESCE for Facebook and TikTok
        // Facebook: data->'user'->'location'->>'country'
        // TikTok: data->'engagement'->>'country'
        await queryRunner.query(`
            CREATE INDEX idx_events_country 
            ON events (
                (COALESCE(
                    data->'user'->'location'->>'country', 
                    data->'engagement'->>'country'
                ))
            )
        `);

        // Revenue analytics index data->'engagement'->>'purchaseAmount'
        await queryRunner.query(`
            CREATE INDEX idx_events_purchase_amount 
            ON events ((data->'engagement'->>'purchaseAmount')) 
            WHERE data->'engagement'->>'purchaseAmount' IS NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_events_purchase_amount`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_events_country`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_events_user_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_events_campaign_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_events_data_gin`);
    }
}
