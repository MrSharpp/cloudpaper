import { DaemonHost } from '../lib/Container';
import tar from 'tar'
import fs from 'fs'
import { DockerFileService } from '../lib/DockerFileService';

async function run(){
    const host = new DaemonHost();

    const dockerfile = new DockerFileService()


    await tar.c({file: './test/docker-tarball.tgz', cwd: 'test'}, ['Dockerfile'])

    const resp = await host.buildImage(fs.readFileSync('./test/docker-tarball.tgz'), "userid/express-sample")

    const respCont = await host.createContainer("aa", "userid/express-sample")

    console.log(resp)
    console.log(respCont)
}

run()