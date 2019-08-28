import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Order } from 'src/app/model/order';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  listOrder: Order[] = [];

  constructor(private storageService: StorageService,
    private spinner: NgxSpinnerService,
    private apiService: ApiService) { }

  ngOnInit() {
    //get user token from local storage
    //loading user
    this.spinner.show();
    this.storageService.localStorage.getItem("token").subscribe((token: string) => {
      if(token == null)
        return;
      this.loadOrder(token);
    }, (error: HttpErrorResponse) => {
      console.log("error while loading user:");
      console.log(error);
      alert("An error has occured while loading data, please try again later :(");
    })
  }

  loadOrder(token: string) {
    var obs = this.apiService.getUserOrderRequest(token);
    obs.subscribe((response: HttpResponse<any>) => {
      var r : any = response;
      this.listOrder = r.data;
      this.spinner.hide();
      // this.listProgress.forEach((item) => {
      //   item.getLessonCount();
      //   console.log(item.finishedLecture);
      //   console.log(item.lessonCount);
      // })
    }, (error: HttpErrorResponse) => {
      console.log("error while loading order:");
      console.log(error);
      alert("An error has occured while loading data, please try again later :(");
    })
  }

}
