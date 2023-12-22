import {expect, describe, it} from 'vitest';
import request from 'supertest';
import {app} from './index';

describe('GET /', () => {
  it('responds with "Express + TypeScript Server"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Express + TypeScript Server');
  });
});
