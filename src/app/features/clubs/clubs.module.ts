import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClubsRoutingModule} from './clubs-routing.module';
import {ClubListComponent} from './components/club-list/club-list.component';
import {SharedModule} from "@shared/shared.module";
import {ClubFormComponent} from './components/club-form/club-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ClubListComponent,
    ClubFormComponent
  ],
  imports: [
    CommonModule,
    ClubsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClubsModule {
}
