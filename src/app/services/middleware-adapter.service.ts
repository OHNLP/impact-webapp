import { Injectable } from '@angular/core';
import {MockMiddlewareRestProvider} from "./providers/impl/mock-middleware-rest-provider";
import {MiddlewareRestProvider} from "./providers/middleware-rest-provider";

@Injectable({
  providedIn: 'root'
})
export class MiddlewareAdapterService {

  constructor() { }

  public rest: MiddlewareRestProvider = new MockMiddlewareRestProvider(); // TODO replace with configurable
}
