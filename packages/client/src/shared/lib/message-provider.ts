import { MessageInstance } from 'antd/es/message/interface'

class MessageProvider {
  private msgApi?: MessageInstance

  public setMessageApi(msgApi: MessageInstance) {
    this.msgApi = msgApi
  }

  public error = (message: string) => {
    this.msgApi?.error(message)
  }

  public success = (message: string) => {
    this.msgApi?.success(message)
  }
}

export const messageProvider = new MessageProvider()
