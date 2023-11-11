import fs from 'fs/promises'

export class DockerFileService {
    private dockerfile: string = ""

    private initial(){
        this.dockerfile += 
        `
        FROM node:18
        WORKDIR /app
        `
    }

    private appPort(port: string){
        this.dockerfile += 
        `
        EXPOSE ${port}
        `
    }

    private addEnviroments(envs: {key: string, value: string}[]){
        this.dockerfile +=
        `
        ${envs.map((env) => `ENV ${env.key}=${env.value}\n`)}
        `
    }

    private addRepo(repoLink: string){
        this.dockerfile += 
        `
        RUN git init
        RUN git pull ${repoLink}
        `
    }

    private installAndBuild(){
        this.dockerfile += 
        `
        RUN npm install --force
        RUN npm run build
        `
    }

    private appEntry(){
        this.dockerfile += 
        `
        CMD ["npm", "start"]
        `
    }

    makeDockerFile(opts: {envs: {key: string, value: string}[], port: string, repoLink: string}){
        this.initial();
        this.appPort(opts.port);
        this.addEnviroments(opts.envs);
        this.addRepo(opts.repoLink)
        this.installAndBuild()
        this.appEntry()
    }

    exportDockerFile(path: string){
        return fs.writeFile(path, this.dockerfile);
    }
}