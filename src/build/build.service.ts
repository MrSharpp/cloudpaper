import { Injectable } from '@nestjs/common';
import { exec, execFile, spawn } from 'child_process';
import { cpCbPromised } from 'src/common/utils';
import { paths } from 'src/constants';

@Injectable()
export class BuildService {
  cloneRepoToTmpPath(repoUrl: string) {
    // Right now it only supports public git repositories
    const cp = spawn(`cd ${paths.tmpPath}; git clone ${repoUrl}`);

    return cpCbPromised(cp);
  }

  buildUsingNixpacks(repoDirName: string) {
    const cp = execFile(paths.nixpackExecutable, ['build', repoDirName], {
      cwd: paths.tmpPath,
    });

    return cpCbPromised(cp);
  }
}
