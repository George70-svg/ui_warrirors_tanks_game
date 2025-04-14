export class ClientConfig {
  getConfig() {
    return {
      baseURL: 'http://localhost:3001/api/v2/',
      withCredentials: true,
    }
  }
}

export class ServerConfig {
  constructor(private _cookieHeader: string | undefined) {}

  getConfig() {
    return {
      baseURL: 'https://ya-praktikum.tech/api/v2',
      headers: {
        cookie: this._cookieHeader,
      },
    }
  }
}

export type ClientConfigData = {
  baseURL: string
  withCredentials: boolean
  headers?: { [key: string]: string }
}

export type ServerConfigData = {
  baseURL: string
  headers: { cookie: string | undefined }
}

export type ApiConfig = ServerConfigData | ClientConfigData
