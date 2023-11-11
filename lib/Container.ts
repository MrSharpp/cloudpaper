import axios, { Axios } from 'axios'

export class Container {
    private readonly _dockerDaemonURL = "http://localhost:2375/v1.24"
    private readonly _axios!: Axios;

    constructor(){
        this._axios = axios.create({baseURL: this._dockerDaemonURL})
    }


    async buildImage(file: Buffer){
       return  this._axios.post("/build", file, {headers: {"Content-Type": "application/x-tar"}})
    }
}