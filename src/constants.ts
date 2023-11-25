import path from 'path';

const binariesPath = path.join(__dirname, '..', 'binaries');
const tmpPath = path.join(__dirname, '..', 'tmp');
const nixpackExecutable = path.join(tmpPath, 'nixpacks.exe'); // dependening on the os set this

export const paths = { binariesPath, tmpPath, nixpackExecutable };
