import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  //templateUrl: './spinner.component.html',
  template: `<img [src]="img">`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() img: string;

  constructor() { }

  ngOnInit(): void {
    if (!this.img) throw new Error("No spinner image!");
  }

}
