import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Slider } from 'src/app/model/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor( private apiService: ApiService) { }

  ngOnInit() {
    this.loadSLiders();
  }
  listSliders: Slider[] = [];
  loadSLiders(){
    var obs = this.apiService.getSliders();
    obs.subscribe((response: HttpResponse<any>)=>{
      var r: any = response;
      this.listSliders = r.data;
      console.log(this.listSliders);
    },(error: HttpErrorResponse) =>{
      console.log("error: ",error);
      alert("Error loading slider!");
    })
  }
}
