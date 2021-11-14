import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.next-btn').click(() => {
      $('.nav-pills > .active').next('a').trigger('click');
    });

    $('.previous-btn').click(() => {
      $('.nav-pills > .active').prev('a').trigger('click');
    });
  }

}
