import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { StorageService } from "./storage.service";


/**
 * @description Interceptor, intercepting all http requests
 *  Currently implemented features:
 *    1. Add a token to the requested header
 *    2. Determine the status code returned by the response body
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private storage: StorageService,
    ) { }

    intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storage.get('token') || "";
        const authReq = request.clone({
            headers: request.headers.set("mw-token", token || "")
        });
        return next.handle(authReq)
    }
}