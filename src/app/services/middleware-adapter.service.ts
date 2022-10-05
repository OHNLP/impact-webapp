import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MockMiddlewareRestProvider} from "./providers/impl/mock-middleware-rest-provider";
import { RealMiddlewareRestProvider } from './providers/impl/real-middleware-rest-provider';
import {MiddlewareRestProvider} from "./providers/middleware-rest-provider";

@Injectable({
  providedIn: 'root'
})
export class MiddlewareAdapterService {
  // servers
  public mock: MiddlewareRestProvider = new MockMiddlewareRestProvider(); 
  public ajax: MiddlewareRestProvider = new RealMiddlewareRestProvider(this.http);

  public get rest(): MiddlewareRestProvider {
    let server = localStorage.getItem(
      'middleware_server'
    )
    if (server == 'mock') {
      return this.mock;

    } else if (server == 'test') {
      return this.ajax;
    }

    throw Error('server not specified')
  }
  
  constructor(
    private http: HttpClient
  ) {

  }
}
