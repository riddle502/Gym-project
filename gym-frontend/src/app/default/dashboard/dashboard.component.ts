import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
declare var $: any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  chartOptions: any = {};
  chartOptions2: any = {};
  chartOptions3: any = {};
  Highcharts = Highcharts;
  value: any;

  ngOnInit(): void {


 // tabItems
 const tabItems = document.querySelectorAll('.btn');
 const tabContentItems = document.querySelectorAll('.tabcontent');

 function selectItem(this: any, e: any) {
   removeBorder();
   removeShow();
   this.classList.add('active');
   const tabContentItem = document.querySelector(`#${this.id}-content`);
   tabContentItem?.classList.add('show');
 }

 function removeBorder() {
   tabItems.forEach(item => {
     item.classList.remove('active');
   });
 }

 function removeShow() {
   tabContentItems.forEach(item => {
     item.classList.remove('show');
   });
 }

 tabItems.forEach(item => {
   item.addEventListener('click', selectItem);
 });
 // tabItems




    this.chartOptions3 = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: 'YEARLY STATISTICS',
            align: 'center'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Medals',
            data: [
                ['Norway', 16],
                ['Germany', 12],
                ['USA', 8],
                ['Sweden', 8],
                ['Netherlands', 8],
                ['ROC', 6],
                ['Austria', 7],
                ['Canada', 4],
                ['Japan', 3]
    
            ]
        }]

    };

}
}
