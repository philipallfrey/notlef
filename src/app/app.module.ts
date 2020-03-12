import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageHeadingComponent } from './components/page-heading/page-heading.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FactoidComponent } from './components/factoid/factoid.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesViewComponent } from './views/courses-view/courses-view.component';
import { OverviewComponent } from './views/overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeadingComponent,
    DataListComponent,
    FactoidComponent,
    CoursesViewComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
