import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { TestConnectionDto } from './dto/test-connection.dto';
import { RunQueryDto } from './dto/run-query.dto';
import { ConnectionDto } from './dto/connection.dto';
import * as test from 'node:test';

@Injectable()
export class QueryService {
  private async _runQuery(payload: {
    connection: ConnectionDto;
    query: string;
    params?: string[];
  }) {
    const client = new Client({
      user: payload.connection.username,
      host: payload.connection.host,
      database: payload.connection.databaseName,
      password: payload.connection.password,
      connectionTimeoutMillis: 10000,
      statement_timeout: 10000,
      query_timeout: 10000,
    });

    try {
      await client.connect();

      const res = await client.query(payload.query, payload.params);

      return res.rows;
    } catch (e) {
      if (e.code === 'ECONNREFUSED') {
        throw new BadRequestException("Database server can't be reached");
      }
      if (e.message) {
        throw new BadRequestException(e.message);
      }
      throw new BadRequestException('Unknown');
    } finally {
      await client.end();
    }
  }

  async testConnection(testConnectionDto: TestConnectionDto) {
    await this._runQuery({
      connection: testConnectionDto,
      query: 'SELECT $1::text as message',
      params: ['Hello world!'],
    });
  }

  async runQuery(payload: RunQueryDto) {
    return this._runQuery({
      connection: payload,
      query: payload.query,
      params: [],
    });
  }
}
