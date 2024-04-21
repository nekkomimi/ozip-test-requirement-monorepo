import {Body, Controller, Post} from '@nestjs/common';
import {RunQueryDto} from "./dto/run-query.dto";
import {TestConnectionDto} from "./dto/test-connection.dto";
import {QueryService} from "./query.service";

@Controller('query')
export class QueryController {
    constructor(private readonly queryService: QueryService) {
    }

    @Post("test-connection")
    async testConnection(@Body() payload: TestConnectionDto) {
        await this.queryService.testConnection(payload);
        return {
            data: 'ok',
        };
    }

    @Post("run")
    async runQuery(@Body() payload: RunQueryDto) {
        const queryResult = await this.queryService.runQuery(payload);
        return {
            data: queryResult,
        };
    }
}
