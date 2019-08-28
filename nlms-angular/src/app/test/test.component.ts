import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: [`
      div{
         margin: 0 auto;
         text-align: center;
      }
      .my-test{
        background-color: blue;
        width: 500px;
      }
      .rotate{
          width: 340px;
          heigh: 82px;
         border:solid 1px red;
      }
   `],
  animations: [
    trigger('myanimation', [
      state('state', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
              // animation-name: fadeInDow,
      })),
      transition('* => * ',[
        animate('1s',keyframes([
          style({ opacity: 0.1, offset: 0.1 }),
          style({ opacity: 0.6, offset: 0.2 }),
          style({ opacity: 1,   offset: 0.5 }),
          style({ opacity: 0.2, offset: 0.7 })
        ]))
      ])
 
      //  transition('void => *',[
      //    style({opcatity: 1}),

      //  ])
    ])
],

  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  state: string = "state";
    animate() {
        this.state = this.state == 'larger' ? 'smaller' : 'larger';
    }

  constructor() { }

  ngOnInit() {
  }

}
