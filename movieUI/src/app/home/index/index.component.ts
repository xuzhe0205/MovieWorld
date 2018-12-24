import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { StorageService } from "src/app/service/storage.service";
import { Router } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
  selector: 'merculet-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  array:any = []
  itemId: string

  categoryList:any = []

  list:any =[]


  constructor(
    private home:HomeService,
    private storage: StorageService,
    private modalService: NzModalService,
    private router: Router,
    private massage:NzMessageService
  ) { }

  ngOnInit() {
    this.getTopList()
    this.getCategoryList()
    this.getList()
  }

  //impl filter
  clickCategory(item, index){
    this.categoryList.forEach(item => {
      item.isActive = false;
    });
    //Set the current tag to active upon click
    this.categoryList[index].isActive = true;
    if(item._id == 0){
      this.getList()
    }else{
      this.getList(item._id)
    }
  }

  //get top scroll bar
  getTopList(){
    this.home.list().subscribe(({code, data}) => {
      if(code == 0){
        this.array = data
      }
    })
  }


// get the categories lists
  getCategoryList(){
    this.home.categoryList().subscribe(({code, data}) => {
      if(code == 0){
        let d:any = data
        this.categoryList = [{
          category_name:'ALL',
          isActive:true,
          _id:0
        },...d]
      }
    })
  }
//Show the movie lists according user choice in category
  getList(category_id?){
    let params:any = {
      type:0
    }
    if(category_id){
      params.category_id = category_id
    }
    this.home.list(params).subscribe(({code, data}) => {
      if(code == 0){
        this.list = data;
        this.getlistIds()
      }
    })
  }

  //Check each movie if is in this user's like list
  getlistIds(){
    //Get user's like list
    this.home.listIds().subscribe(({code, data}) => {
      //Let list get the array of this user's like list
      const list:any = data
      if(code == 0){

        this.list = this.list.map(item => {
          //Check this user's like list, whether is a data is movie_id
          item.isLike = list.find(dataItem => dataItem == item._id)? true:false
          return item
        })
      }
    })
  }
  //When user click heart, mark this movie item as like,get this movie's id

  //add like function
  like(_id){
    this.home.like({_id}).subscribe(({code, data}) => {
      if(code == 0){
        //Pop the message to show this mark like opearation success
        this.massage.success('like success')
        //Show the movies list same as the list before user operate
        this.getList()
      }else{
        this.massage.error('like error')
      }
    })
  }

  //logout
  logOut() {
    this.storage.clear();
  }


}
