// detail.component.ts

import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: 'merculet-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    item : any =[];
    list:any =[]

    constructor(
      private route: ActivatedRoute,
      private home:HomeService,
      private massage:NzMessageService

    ) { }

    ngOnInit() {
      this.getItem();
    }

  //get the item's detail
  getItem() {
    //get the item's id according to url
    const id = this.route.snapshot.paramMap.get('id');
    const params: any = {
      type: 0
    };
    if (id) {
      params._id = id;
    }
    //find item's detail according to item's id
    this.home.details(params).subscribe(({code, data}) => {
      if (code === 0) {
        console.log(data);
        this.item = data;
        this.getlistIds()

      }
    });
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
