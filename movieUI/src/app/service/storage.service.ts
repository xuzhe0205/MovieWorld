import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  store = window.sessionStorage

  /**
   * set localStorage
   * @param value Needed value
   * @param key need key value
   */
  set(key: string, value: any) {
    try {
      // Convert the value inside to a json object
      value = JSON.stringify(value);
    } catch (e) {
      // Throw an error
      // console.error(e);
      value = value;
    }

    this.store.setItem(key, value);

  }

  /**
   * get localStorage
   * @param key Key to get
   *  return value
   */
  get(key: string) {
    let value = this.store.getItem(key);
    if (value) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        // console.error(e);
        value = value;
      }
    }
    return value;
  }

  /**
   *  delete localStorage
   * @param key delete key value
   */
  remove(key:string) {
    this.store.removeItem(key);
  }

  clear() {
    this.store.clear();
  }
}