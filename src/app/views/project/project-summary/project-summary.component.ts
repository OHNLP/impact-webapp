import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ApplicationStatusService } from "../../../services/application-status.service";
import { JobInfo, JobInfoStatus } from 'src/app/models/job-info';
import { Chart } from 'angular-highcharts';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit, OnChanges {
  @Input() isProjectLoading = true;

  JobInfoStatus = JobInfoStatus;

  // the pie chart for decision
  chartPieIE: Chart | undefined;

  // the pie chart for label
  chartPieLabel: Chart | undefined;

  // the pie chart for 
  chartBarLabel: Chart | undefined;

  // the bar chart for 
  chartBarAge: Chart | undefined;

  constructor(
    public appStatus: ApplicationStatusService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.drawCharts();
  }

  ngOnInit(): void {
  }

  drawCharts(): void {
    this.drawChartPieIE();
    this.drawChartBarLabel();
    this.drawChartBarAge();
  }

  drawChartPieIE(): void {
    var stat = this.appStatus.statCohortDecision();
    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.y}, {point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          colors: [
            '#41992b', // include
            '#b42323', // exclude
            '#bcbcbc', // unjudged
          ],
          showInLegend: true
        }
      },
      series: [{
        name: 'Decision',
        type: 'pie',
        innerSize: '60%',
        colorByPoint: true,
        data: [{
          name: 'Included',
          y: stat.n_included,
          sliced: true,
          selected: true
        }, {
          name: 'Excluded',
          y: stat.n_excluded
        }, {
          name: 'Unjudged',
          y: stat.n_unjudged
        }]
      }]
    });
    chart.ref$.subscribe(console.log);

    // bind to local chart
    this.chartPieIE = chart;
  }

  drawChartBarLabel(): void {
    let data = [];
    let labels = [
      'Check Later', 'Phase II', 'Phase III', 'Phase IV',
      'Type 1 Diabetes', 'Type 2 Diabetes',
      'ANC>10000', '>10 Lines', 'ECOG PS3', 'ECOG PS4'
    ];
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      data.push({
        name: label,
        y: Math.floor(100 * Math.random())
      });
    }

    let chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.y}</b>'
      },
      xAxis: {
        categories: labels
      },
      plotOptions: {
      },
      series: [{
        name: 'Patient Label',
        type: 'column',
        colorByPoint: true,
        data: data
      }]
    });
    chart.ref$.subscribe(console.log);

    // bind to local chart
    this.chartBarLabel = chart;
  }

  drawChartBarAge(): void {
    let data = [
      5, // '18',
      9, // '18-29',
      20, // '30-39',
      42, // '40-49',
      18, // '50-59',
      15, // '60-69',
      7,  // '70-79',
      5,  // '80-89',
      1,  // '90-99',
      0,  // '100+',
    ];

    let chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: [
          '18',
          '18-29',
          '30-39',
          '40-49',
          '50-59',
          '60-69',
          '70-79',
          '80-89',
          '90-99',
          '100+',
        ],
        crosshair: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          // pointWidth: 30
        }
      },
      series: [{
        name: 'Number of patients',
        type: 'column',
        data: data

      }]
    });
    chart.ref$.subscribe(console.log);

    // bind to local chart
    this.chartBarAge = chart;
  }

  onClickSelectJob(job: JobInfo): void {
    this.appStatus.uwJobSelected = job;
  }

  getLatestNJobs(jobs: JobInfo[]|undefined, n: Number=5): JobInfo[] {
    if (jobs == undefined) {
      return [];
    }
    if (jobs.length > n) {
      return jobs.slice(0, 5);
    } else {
      return jobs;
    }
  }
}
