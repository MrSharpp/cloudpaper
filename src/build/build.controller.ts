import { Body, Controller, Post } from '@nestjs/common';
import { BuildService } from './build.service';

@Controller()
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post('build')
  buildUserSourceCode(@Body() body) {}
}
