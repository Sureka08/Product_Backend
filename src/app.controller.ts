import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome() {
    return { message: 'Backend is running' };
  }

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}