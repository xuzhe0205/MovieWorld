import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { StorageService } from "src/app/service/storage.service";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: 'merculet-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchObj:any =[]
  list:any =[]

  constructor(
    private home:HomeService,
    private storage: StorageService,
    private router: Router,
    private massage:NzMessageService
  ) { }

  ngOnInit() {
  }
  search(title){
    console.log(title)
    this.home.search({title}).subscribe(({code,data})=>{
      if(code==0){
        this.searchObj=data;
        this.getlistIds();
      }
    }

    )

  }

  like(_id){
    this.home.like({_id}).subscribe(({code, data}) => {
      if(code == 0){
        //Pop the message to show this mark like opearation success
        this.massage.success('like success')
        //Show the movies list same as the list before user operate
        //this.getList()
      }else{
        this.massage.error('like error')
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

        this.list = this.list.map(searchItem => {
          //Check this user's like list, whether is a data is movie_id
          searchItem.isLike = list.find(dataItem => dataItem == searchItem._id)? true:false
          return searchItem
        })
      }
    })
  }

}
