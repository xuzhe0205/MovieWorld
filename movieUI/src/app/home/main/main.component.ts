import { Component, OnInit, Input, ViewChild, NgZone, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../../service/storage.service";
import { NzModalRef, NzModalService } from "ng-zorro-antd";
import { RegModalComponent } from "./reg-modal/reg-modal.component";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { ChangePwdComponent } from "./change-pwd/change-pwd.component";
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { FormControl } from "@angular/forms";


declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: "merculet-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {

  url = 'https://github.com/neu-mis-info6150-fall-2018/final-project-_mic';
  text = `Porject By MIC`;

  public searchControl: FormControl;
  geocoder:any;

  public location:Location = {
    lat: 42.361145,
    lng: -71.057083,
    marker: {
      lat: 42.361145,
      lng: -71.057083,
      draggable: true
    },
    zoom: 12
  };

  agmInfo = "Initial Location";

  @ViewChild("search")
  public searchElementRef: ElementRef;
  @ViewChild(AgmMap) map: AgmMap;

  isCollapsed = false;
  email: any = "";
  regModal: NzModalRef;

  constructor(
    private router: Router,
    private storage: StorageService,
    private modalService: NzModalService,
    public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper
  ) {this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });}

  ngOnInit() {
    this.location.marker.draggable = true;
    this.email = this.storage.get("email");
    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsApiLoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.zone.run(() => {
          //get the place result
          let place: any = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }

  //open register window
  openRegMinModal(type: String) {
    let data = {}
    if(type != 'open'){
      data = this.storage.get('user')
    }
    this.modalService.create({
      nzTitle: type == "open" ? "Register" : "UpdateData",
      nzContent: RegModalComponent,

      nzComponentParams: {
        type,
        data
      },
      nzWidth: 800,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => {}
    });
  }

  //open loin window
  openLoginMinModal() {

    this.regModal = this.modalService.create({
      nzTitle: "Login",
      nzContent: LoginModalComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => {
        this.getUser();
      }
    });
  }

  //get current user
  getUser() {
    setTimeout(()=> {
      this.email = this.storage.get("email");
    })

  }

  //logout
  logOut() {
    this.storage.clear();
    this.getUser()
  }

  //open change password window
  openChangePwdModal() {

    this.modalService.create({
      nzTitle: "ChangePassword",
      nzContent: ChangePwdComponent,
      nzFooter: null,
      nzWidth: 800,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => {
        this.logOut();
      }
    });
  }

  //back home button
  home(){
    this.router.navigateByUrl('/home')
  }

  //When user click on the menu"like list",call this function to open likelist page
  likeList(){
    this.router.navigateByUrl('/home/like-list')
  }

// find theater
  findTheater(){
    var new_address:string = "movie theater, amc, regal";
    if (this.location.address_level_2) new_address = new_address + " " + this.location.address_level_2;
    if (this.location.address_state) new_address = new_address + " " + this.location.address_state;
    if(this.location.address_zip) new_address = new_address + " " + this.location.address_zip;
    this.findLocation(new_address);
    this.agmInfo = "Nearest Movie Theater";
  }

//update mark on map
  updateOnMap() {
    var full_address:string = this.location.address_level_1 || "";
    if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2;
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state;
    if(this.location.address_zip) full_address = full_address + " " + this.location.address_zip;
    this.findLocation(full_address);
    this.agmInfo = "Your Location";
  }

  //find current location on map
  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types;

          if (types.indexOf('locality') != -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name;
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name;
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name;
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize();
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }

  //find drag end mark cordinate
  markerDragEnd(m: any, $event: any) {
    this.location.marker.lat = m.coords.lat;
    this.location.marker.lng = m.coords.lng;
    this.findAddressByCoordinates();
  }

  //find address
  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    })
  }

  //decompose address
  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) return false;
    let address = addressArray[0].address_components;

    for(let element of address) {
      if (element.length == 0 && !element['types']) continue

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }
  }


}
