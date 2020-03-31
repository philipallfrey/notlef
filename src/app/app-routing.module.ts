import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColophonViewComponent } from './views/colophon-view/colophon-view.component';
import { CoursesViewComponent } from './views/courses-view/courses-view.component';
import { PlacesViewComponent } from './views/places-view/places-view.component';
import { OverviewComponent } from './views/overview/overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'courses', component: CoursesViewComponent },
  { path: 'courses/:name/:value', component: CoursesViewComponent },
  { path: 'places', component: PlacesViewComponent },
  { path: 'places/:name/:value', component: PlacesViewComponent },
  { path: 'colophon', component: ColophonViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
