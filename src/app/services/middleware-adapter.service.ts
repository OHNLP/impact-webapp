import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MockMiddlewareRestProvider} from "./providers/impl/mock-middleware-rest-provider";
import { RealMiddlewareRestProvider } from './providers/impl/real-middleware-rest-provider';
import {MiddlewareRestProvider} from "./providers/middleware-rest-provider";

@Injectable({
  providedIn: 'root'
})
export class MiddlewareAdapterService {

  constructor(private http: HttpClient) { }

  // public rest: MiddlewareRestProvider = new MockMiddlewareRestProvider(); 

  public rest: MiddlewareRestProvider = new RealMiddlewareRestProvider(this.http);
  // TODO replace with configurable
}
