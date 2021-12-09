import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClubListComponent} from "./components/club-list/club-list.component";
import {ClubFormComponent} from "./components/club-form/club-form.component";

const routes: Routes = [
  {
    path: '',
    component: ClubListComponent
  },
  {
    path: 'create',
    component: ClubFormComponent
  },
  {
    path: 'change/:id',
    component: ClubFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubsRoutingModule {
}
