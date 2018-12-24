import { MaxStrPipe } from './../pipe/max-str.pipe';
import { HomeService } from './home.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { homeRouter } from './home.routing';
import { RegModalComponent } from './main/reg-modal/reg-modal.component';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './index/detail/detail.component';
import { LikeComponent } from './like/like.component';
import { LoginModalComponent } from './main/login-modal/login-modal.component';
import { ChangePwdComponent } from './main/change-pwd/change-pwd.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//APIs
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { SearchComponent } from './search/search.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(homeRouter),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSZMLEViAto4M9e6kmZn1ZmTh7s44u0I8', //Google API key for maps
      libraries: ["places"]
    }),
    FormsModule,
    NgbModule.forRoot(),
    JwSocialButtonsModule // social API
  ],
  providers: [
    HomeService,
    GoogleMapsAPIWrapper
  ],
  entryComponents:[
    RegModalComponent,
    LoginModalComponent,
    ChangePwdComponent
  ],
  declarations:
    [
      MaxStrPipe,
      MainComponent,
      RegModalComponent,
      IndexComponent,
      LikeComponent,
      DetailComponent,
      LoginModalComponent,
      ChangePwdComponent,
      SearchComponent
    ]
})
export class HomeModule { }
