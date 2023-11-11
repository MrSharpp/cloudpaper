import { DaemonHost } from '../lib/Container';
import tar from 'tar'
import fs from 'fs'
import { DockerFileService } from '../lib/DockerFileService';
import path from 'path'

async function run(){
    const host = new DaemonHost();

    const dockerfile = new DockerFileService()
    dockerfile.makeDockerFile({
        envs: [],
        port: 3000,
        repoLink: 'https://github.com/jatins/express-hello-world'
    })

    await dockerfile.exportDockerFile(path.join(__dirname, 'Dockerfile'))

    await tar.c({file: './test/docker-tarball.tgz', cwd: 'test'}, ['Dockerfile'])

    const resp = await host.buildImage(fs.readFileSync('./test/docker-tarball.tgz'), "userid/express-sample")

    const respCont = await host.createContainer("aa", "userid/express-sample")

    const respRun = await host.runContainer(respCont.Id)

    console.log(resp)
    console.log(respRun)
}

run()