import { Injectable } from '@nestjs/common';
import { exec, spawn } from 'child_process';
import { paths } from 'src/constants';

@Injectable()
export class BuildService {
  cloneRepoToTmpPath(repoUrl: string) {
    // Right now it only supports public git repositories
    const cp = spawn(`cd ${paths.tmpPath}; git clone ${repoUrl}`);

    return new Promise<void>((res, rej) => {
      cp.on('exit', (code) => {
        if (code == 0) res();
        else rej();
      });

      cp.on('error', (err) => console.log(err.message));
    });
  }
}
