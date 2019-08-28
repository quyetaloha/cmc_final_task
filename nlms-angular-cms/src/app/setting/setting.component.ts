import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Setting } from '../module/setting';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  listSetting: Setting[] = [];
  listGroupType: string[] = [];
  token = JSON.parse(localStorage.getItem('value'));
  stringToken = this.token.token.data[1];
  setting: Setting = new Setting();

  groupTypeC: string;
  name: string;
  value: number;
  description: string

  isTableSetting: boolean = true;
  isFormAddSetting: boolean = false;
  isFormEditSetting: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + this.stringToken
    })
  };
  constructor(
    private apiService: ApiserviceService,
    private http: HttpClient) { }

  ngOnInit() {
    // get groupType
    this.http.get(this.apiService.domain + 'group-type', this.httpOptions)
      .subscribe(response => {
        var r: any = response;
        this.listGroupType = r.data.groupType;
      },
        err => console.log(err));

    // get all setting
    this.http.get(this.apiService.domain + 'Settings', this.httpOptions)
      .subscribe(response => {
        var r: any = response;
        this.listSetting = r.data;
      },
        err => console.log(err));


  }

  showFormNewSetting() {
    this.isTableSetting = false;
    this.isFormAddSetting = true;
  }

  onClick() {
    var body = {
      "groupType": this.groupTypeC,
      "value": this.value,
      "name": this.name,
      "description": this.description
    }
    this.http.post(this.apiService.domain + 'Setting', body, this.httpOptions)
      .subscribe((res: HttpResponse<any>) => {
        this.isTableSetting = true;
        this.isFormAddSetting = false;
        this.http.get(this.apiService.domain + 'Settings', this.httpOptions)
          .subscribe(response => {
            var r: any = response;
            this.listSetting = r.data;
          },
            err => console.log(err));

      },
        err => console.log(err));
  }
  deleteSetting(){
    
  }


}
