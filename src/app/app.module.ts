import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { PageHeadingComponent } from './components/page-heading/page-heading.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FactoidComponent } from './components/factoid/factoid.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesViewComponent } from './views/courses-view/courses-view.component';
import { OverviewComponent } from './views/overview/overview.component';
import { CoursesByYearChartComponent } from './charts/courses-by-year-chart/courses-by-year-chart.component';
import { HeadingComponent } from './components/heading/heading.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeadingComponent,
    DataListComponent,
    FactoidComponent,
    CoursesViewComponent,
    OverviewComponent,
    CoursesByYearChartComponent,
    HeadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
