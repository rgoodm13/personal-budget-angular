import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource ={
    datasets: [
        {
            data: [30,350,90],
            backgroundColor:[
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#7D3C98',
                '#148F77',
                '#2874A6',

            ],
        }
],
labels: [
 'eat out',
 'rent',
 'groceries'
]
};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) =>{ for(var i=0; i < res.myBudget.length; i++){
      this.dataSource.datasets[0][i] =res.myBudget[i].budget;
      this.dataSource.labels[i] = res.myBudget[i].title;
  }
  this.createChart();});
  }

  createChart() {
    var ctx =document.getElementById("myChart");
    var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: this.dataSource
    });
 }

}
