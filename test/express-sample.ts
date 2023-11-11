import { Container } from '../lib/Container';
import tar from 'tar'
import fs from 'fs'

async function run(){
    const container = new Container();

    await tar.c({file: './test/docker-tarball.tgz', cwd: 'test'}, ['Dockerfile'])

    const resp = await container.buildImage(fs.readFileSync('./test/docker-tarball.tgz'))

    console.log(resp.data)
}

run()