import { DaemonHost } from "../lib/Container";
import * as tar from "tar";
import * as fs from "fs";
import { DockerFileService } from "../lib/DockerFileService";
import * as path from "path";

async function run() {
  const host = new DaemonHost();

  const dockerfile = new DockerFileService();
  dockerfile.makeDockerFile({
    envs: [],
    port: 3000,
    repoLink: "https://github.com/lujakob/nestjs-realworld-example-app",
  });

  console.log(path.join("test", "Dockerfile"));

  await dockerfile.exportDockerFile(path.join("test", "Dockerfile"));

  await tar.c({ file: "./test/docker-tarball.tgz", cwd: "test" }, [
    "Dockerfile",
  ]);

  const resp = await host.buildImage(
    fs.readFileSync("./test/docker-tarball.tgz"),
    "userid/express-sample:latest"
  );
  console.log(resp);

  const respCont = await host.createContainer(
    "aa",
    "userid/express-sample",
    3000
  );

  const respRun = await host.runContainer(respCont.Id);
  console.log(respRun);
}

run();
