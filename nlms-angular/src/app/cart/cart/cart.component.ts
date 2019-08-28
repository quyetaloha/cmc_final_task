import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Course } from 'src/app/model/course';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/model/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  listCourse: Course[] = [];
  totalPrice: number = 0;

  constructor(private apiService: ApiService, private storageService: StorageService,
    public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    //loading user
    // var obs = this.apiService.authenticate();
    // obs.subscribe((response: HttpResponse<any>) => {
    //   var r : any = response;
    //   this.storageService.currentUser = r.data[0];
    //   this.storageService.token = r.data[1];
    //   //push to local storage
    //   this.storageService.localStorage.setItem("token", this.storageService.token).subscribe(()=>{});
    //   this.storageService.localStorage.setItem("user", this.storageService.currentUser).subscribe(()=>{});
    //   console.log("Token: " + this.storageService.token);
    // }, (error: HttpErrorResponse) => {
    //   console.log("error while loading user:");
    //   console.log(error);
    //   alert("An error has occured while loading data, please try again later :(");
    // })
    this.storageService.localStorage.getItem("cart").subscribe((data: Course[]) => {
      if(data == null || data.length == 0)
      {
        this.listCourse = [];
        const dialogRef = this.dialog.open(ErrorMessageDialog, {
          width: '500px',
          data: {
            title: "Information",
            message: "You have no item in your shopping cart!"
          }
        });
        return;
      }
      this.listCourse = data;
      this.calculateTotalPrice();
    })
  }

  calculateTotalPrice()
  {
    this.totalPrice = 0;
    this.listCourse.forEach((item) => {
      this.totalPrice += item.salePrice;
    })
  }

  onDeleteClick(course: Course) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '500px',
      data: {
        course: course
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed by clicking Delete');
        this.listCourse = this.listCourse.filter((item) => {
          return item != result;
        })
        this.storageService.localStorage.setItem("cart", this.listCourse).subscribe(() => {});
        this.calculateTotalPrice();
      }
      else
        console.log('The dialog was closed by clicking Cancel');
      //delete
    });
  }

  onCheckoutClick() {
    var order = new Order();
    order.listCourse = this.listCourse;
    order.status = "pending";
    this.listCourse.forEach((item) => {
      console.log(item);
    });
    order.date = new Date();
    this.storageService.localStorage.getItem("token").subscribe((data: string) => {
      //if user is not logged in, show error then redirect to index
      if(data == null)
      {
        const dialogRef = this.dialog.open(ErrorMessageDialog, {
          width: '500px',
          data: {
            title: "Warning",
            message: "You have to login in order to checkout!"
          }
        });
        this.router.navigate(["/login"]);
        return;
      }

      var token = data;
      this.apiService.addUserOrderRequest(order, token).subscribe((response: HttpResponse<any>) => {
        var r : any = response;
        var newOrder: Order = r.data;
        //show success message
        const dialogRef = this.dialog.open(OrderSuccessDialog, {
          width: '500px',
        });
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(["/orderDetail", newOrder.id]);
        });

        //delete the cart
        this.listCourse = [];
        this.storageService.localStorage.setItem("cart", this.listCourse).subscribe(() => {});
        this.calculateTotalPrice();
      }, (error: HttpErrorResponse) => {
        console.log("error:");
        console.log(error);
        alert("An error has occured while sending data, please try again later :(");
      });
    });
  }
}

@Component({
  selector: 'confirmdeletedialog',
  templateUrl: 'confirmdeletedialog.html'
})
export class ConfirmDeleteDialog {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialog>
    , @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'ordersuccessdialog',
  templateUrl: 'ordersuccessdialog.html'
})
export class OrderSuccessDialog {

  constructor(public dialogRef: MatDialogRef<OrderSuccessDialog>
    , @Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'errormessagedialog',
  templateUrl: 'errormessagedialog.html'
})
export class ErrorMessageDialog {

  constructor(public dialogRef: MatDialogRef<OrderSuccessDialog>
    , @Inject(MAT_DIALOG_DATA) public data: any) {}
}