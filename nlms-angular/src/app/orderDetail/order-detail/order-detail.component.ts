import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId: number = 0;
  order: Order = new Order();

  constructor(private apiService: ApiService, private storageService: StorageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.orderId = this.route.snapshot.params.id;
      this.loadData(this.orderId);
    });
  }

  loadData(orderId: number) {
    this.storageService.localStorage.getItem("token").subscribe((token: string) => {
      if(token == null)
      {
        return;
      }
        
      this.apiService.getOrderRequest(orderId, token).subscribe((response: HttpResponse<any>) => {
        var r : any = response;
        this.order = r.data;
        console.log(this.order);
      }, (error: HttpErrorResponse) => {
        alert("An error has occured while loading data, please try again later :(");
      });
    });
  }

}
