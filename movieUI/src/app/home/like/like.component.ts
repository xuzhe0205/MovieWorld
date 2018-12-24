import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'merculet-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  array: any = [];

  categoryList: any = [];

  list: any = [];


  constructor(
    private home: HomeService,
    private massage:NzMessageService,
    private storage: StorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getLikeList();
  }

  goDetails(item) {
    this.storage.set("details", item);
    this.router.navigate(["/home/details"]);
  }


//Get this user's like array
  getLikeList(category_id?) {
    this.home.likeList().subscribe(({ code, data }) => {
      if (code == 0) {
        this.list = data;
      }

    });
  }

// Remove particular movie in user's like list
  removeLike(_id){
    this.home.removeLike({_id}).subscribe(({code, data}) => {
      if(code == 0){
        this.massage.success('Delete success')
        this.getLikeList()
      }else{
        this.massage.error('Delete error')
      }
    })
  }

}
