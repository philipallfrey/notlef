import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesViewComponent } from './views/courses-view/courses-view.component';
import { OverviewComponent } from './views/overview/overview.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'courses', component: CoursesViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
