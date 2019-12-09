/*
This is a class I generated from the SocketIO Socket interface. I use this to generate a mock with ts-mockito

 */
//@ts-nocheck
export class MockedClient {
  public connected: boolean;
  public disconnected: boolean;
  public id: string;
  public io: SocketIOClient.Manager;
  public nsp: string;
  
  public addEventListener(event: string, fn: Function): SocketIOClient.Emitter {
    return undefined;
  }
  
  public close(): SocketIOClient.Socket {
    return undefined;
  }
  
  public compress(compress: boolean): SocketIOClient.Socket {
    return undefined;
  }
  
  public connect(): SocketIOClient.Socket {
    return undefined;
  }
  
  public disconnect(): SocketIOClient.Socket {
    return undefined;
  }
  
  public emit(event: string, ...args: any[]): SocketIOClient.Socket;
  public emit(event: string, ...args: any[]): SocketIOClient.Emitter;
  public emit(event: string, ...args: any[]): SocketIOClient.Socket | SocketIOClient.Emitter {
    return undefined;
  }
  
  public hasListeners(event: string): boolean {
    return false;
  }
  
  public listeners(event: string): Function[] {
    return [];
  }
  
  public off(event: string, fn?: Function): SocketIOClient.Emitter {
    return undefined;
  }
  
  public on(event: string, fn: Function): SocketIOClient.Emitter {
    return undefined;
  }
  
  public once(event: string, fn: Function): SocketIOClient.Emitter {
    return undefined;
  }
  
  public open(): SocketIOClient.Socket {
    return undefined;
  }
  
  public removeAllListeners(): SocketIOClient.Emitter {
    return undefined;
  }
  
  public removeEventListener(event: string, fn?: Function): SocketIOClient.Emitter {
    return undefined;
  }
  
  public removeListener(event: string, fn?: Function): SocketIOClient.Emitter {
    return undefined;
  }
  
  public send(...args: any[]): SocketIOClient.Socket {
    return undefined;
  }
  
}
