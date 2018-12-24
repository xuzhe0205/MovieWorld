import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import "rxjs/Rx";
import { NzMessageService } from "ng-zorro-antd";
import { environment } from '../../environments/environment';
import { ResData } from "./interface";

/**
 * @description Define the global interface, 
 * encapsulate the http service, and encapsulate the agnualr native HttpClient class.
 * @date 2018/12/12
 * @author admin
 */
@Injectable()
export class HttpService {
  constructor(
    private httpClient: HttpClient, 
    private message: NzMessageService
  ) {}

  upload(url: string, file: any, options?:any): Observable<Object> {
    if(options){
      url += (url.indexOf("?") < 0 ? "?" : "&") + this.param(options);
    }
    let formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(url, formData);
  }

  /**
   * @description post request return rxjs
   * @param {string} url
   * @param {string} body
   *
   */
  post(url: string, body: Object = {}): Observable<ResData> {
    return this.httpClient.post(`${environment.baseUrl}${url}`, body);
  }
  /**
   * @description put request return rxjs
   * @param {string} url
   * @param {string} body
   *
   */
  put(url: string, body: Object = {}): Observable<ResData> {
    return this.httpClient.put(`${environment.baseUrl}${url}`, body);
  }
  /**
   * @description put request return rxjs
   * @param {string} url
   * @param {string} body
   *
   */
  delete(url: string, body: Object = {}): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}${url}`, body);
  }
  /**
   * @description get request return rxjs
   * @param url request address
   * @param options get reqeust requires
   */
  get(url: string, options?: Object):Observable<ResData> {
    url = `${environment.baseUrl}${url}`
    if(options){
      url += (url.indexOf("?") < 0 ? "?" : "&") + this.param(options);
    }
    
    return this.httpClient.get(url)
  }

  /**
   * @param {any} data
   * @returns
   * @memberof ServiceBaseService
   * @title: Method of encapsulating a parameter that serializes a get request
   */
  param(data:Object): string {
    let url = "";
    for (const k in data) {
      const value = data[k] !== undefined ? data[k] : "";
      url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : "";
  }
}
