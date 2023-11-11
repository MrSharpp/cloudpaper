import axios, { Axios } from "axios";

export class DaemonHost {
  private readonly _dockerDaemonURL = "http://localhost:2375/v1.24";
  private readonly _axios!: Axios;

  constructor() {
    this._axios = axios.create({ baseURL: this._dockerDaemonURL });
  }

  // Step 1
  buildImage(file: Buffer, tagname = "hello-world/latest") {
    let url = "/build?";
    url += `t=${tagname}`;
    return this._axios
      .post(url, file, { headers: { "Content-Type": "application/x-tar" } })
      .then((res) => res.data);
  }

  // Step 2
  createContainer(
    containerName: string,
    tagname: string,
    port: number
  ): Promise<{ Id: string; Warnings: any[] }> {
    let url = "/containers/create?";
    url += `name=${containerName}`;
    return this._axios
      .post(url, {
        Image: tagname,
        ExposedPorts: { "3000/tcp": {} },
        HostConfig: {
          PortBindings: { "3000/tcp": [{ HostPort: port.toString() }] },
        },
      })
      .then((res) => res.data);
  }

  // Step 3
  runContainer(containerId: string) {
    return this._axios
      .post(`/containers/${containerId}/start`)
      .then((res) => res.data);
  }
}
