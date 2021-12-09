import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

declare var $: any;
@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements OnInit {

  

  @Input() labels: any =  [];
  @Input() values: ChartDataSets[] = [];
  @Input() chartType: ChartType = 'radar';
  radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks:{
        min: 0,
        max: 5,
        stepSize: 1
      }
    }
  };
  lineChartColors: Color[] = [
    { 
      backgroundColor: 'rgb(247 131 0 / 50%)',
      borderColor: 'rgb(247 131 0 )',
    },
  ];
  constructor() { }

  ngOnInit(): void {
    // $('#radar').css('width', '100%').css('height', '100%');   
  }

}
