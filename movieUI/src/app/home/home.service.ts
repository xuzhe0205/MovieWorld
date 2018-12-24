import { HttpService } from './../service/http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private messageSource = new BehaviorSubject('hahhahaha');
  currentMessage = this.messageSource.asObservable();
  constructor(
    private http: HttpService

  ) { }

  //change messages
  changeMessage(message: string) {
    this.messageSource.next(message)
    alert("dataService: "+message);
  }

  //register
  registerUser(params){
    return this.http.post(`/api/admin/user/register`,params)
  }

  //get list
  list(params?){
    return this.http.get(`/api/admin/content/list/`,params)
  }

  //get details
  details(params){
    return this.http.get(`/api/admin/content/details/:id`,params)
  }

  //get category
  categoryList(params?){
    return this.http.get(`/api/admin/category/list`,params)
  }

  //get collections
  collectList(params?){
    return this.http.get(`/api/admin/user/collecList`,params)
  }

  // Edit User
  editUser(params){
    return this.http.put(`/api/admin/user/update/${params._id}`,params)
  }

  //login
  login(params){
    return this.http.post(`/api/admin/login`,params)

  }

  //update password
  updatePassowrd(params) {
    return this.http.put(`/api/admin/user/updatePassowrd/${params._id}`, params);
  }


  //Get login user's like list array
  likeList() {
    return this.http.get(`/api/admin/like/list`);
  }
  //When user click heart, mark this movie item as like,get this movie's id
  like(params) {
    return this.http.post(`/api/admin/like/create`, params);
  }
  //Check each movie if is in this user's like list
  listIds() {
    return this.http.get(`/api/admin/like/listIds`);
  }
  // Remove particular movie in user's like list
  removeLike(params) {
    return this.http.put(`/api/admin/like/remove/`, params);
  }
  //search function
  search(params){
    return this.http.get(`/api/admin/content/search`, params);
  }




}
