import { Component, OnInit } from '@angular/core';
import {QualitatifService} from "../../../services/qualitatif.service";
declare var $: any;
@Component({
  selector: 'app-qualitatif',
  templateUrl: './qualitatif.component.html',
  styleUrls: ['./qualitatif.component.scss']
})
export class QualitatifComponent implements OnInit {
  listParameters: any = [];
  listQuestions: any = [];

  constructor(private qualitatifService: QualitatifService) { }

  ngOnInit(): void {
    this.getParameter();
  }

  getParameter(){
    this.qualitatifService.getParameter().subscribe(
      data => {
        // this.listParameters = data;
        // @ts-ignore
        data.sort((a: any, b: any) => a.id > b.id);

        // @ts-ignore
        data.forEach(item => {
          item.questions = [];
          this.listParameters.push({
            item
          })
        });

        this.getQuestion();
      }
    );
  }

  getQuestion(): any{
    this.qualitatifService.getQuestion().subscribe(
      data => {
        for (let p of this.listParameters){
          // @ts-ignore
          data.forEach(item => {
            if (p.item.id == item.parametreDTO.id){
              p.item.questions.push(item);
            }
          });
        }
        console.log(this.listParameters);
      },
    );
  }

}
