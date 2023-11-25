import { Injectable } from '@nestjs/common';
import { exec, spawn } from 'child_process';
import { paths } from 'src/constants';

@Injectable()
export class BuildService {
  cloneRepoToTmpPath(repoUrl: string) {
    // Right now it only supports public git repositories
    spawn(`cd ${paths.tmpPath}; git clone ${repoUrl}`);
  }
}
