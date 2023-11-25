import { ChildProcess } from 'child_process';

export function cpCbPromised(cp: ChildProcess) {
  return new Promise<void>((res, rej) => {
    cp.on('exit', (code) => {
      if (code == 0) res();
      else rej();
    });

    cp.on('error', (err) => console.log(err.message));
  });
}
