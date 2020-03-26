import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesViewComponent } from './views/courses-view/courses-view.component';
import { PlacesViewComponent } from './views/places-view/places-view.component';
import { OverviewComponent } from './views/overview/overview.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'courses', component: CoursesViewComponent },
  { path: 'courses/:name/:value', component: CoursesViewComponent },
  { path: 'places', component: PlacesViewComponent },
  { path: 'places/:name/:value', component: PlacesViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
