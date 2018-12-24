import { MainComponent } from './main/main.component';
import { Routes } from "@angular/router";
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './index/detail/detail.component';
import {LikeComponent} from './like/like.component';
import {SearchComponent} from './search/search.component'

export const homeRouter: Routes = [
    {

        path: "",
        component: MainComponent,
        children: [
          {
              path: '',
              component: IndexComponent,
              data: { name: 'home page' }
          },
          {
            path: 'details/:id',
            component: DetailComponent,
            data: { name: 'detail page' }
        },
          {
            path: 'like-list/details/:id',
            component: DetailComponent,
            data: { name: 'detail page' }
          },
          {
            path: 'search/details/:id',
            component: DetailComponent,
            data: { name: 'detail page' }
          },


          {
            path: 'like-list',
            component: LikeComponent,

          },
          {
            path: 'search',
            component: SearchComponent,
            data: { name: 'search page' }
          },




      ]
    }
];
