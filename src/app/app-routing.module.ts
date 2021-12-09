import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'clubs',
    loadChildren: () =>
      import('./features/clubs/clubs.module').then((m) => m.ClubsModule),
  },
  {
    path: '**',
    redirectTo: 'clubs'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
