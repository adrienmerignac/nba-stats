import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NbaService } from './nba.service';
import { TeamComponent } from './team/team.component';
import { TeamdetailsComponent } from './teamdetails/teamdetails.component';
import { PlayerComponent } from './player/player.component';
import { DetailsComponent } from './player/details/details.component';
import { PoidsPipe } from './@pipe/poids.pipe';
import { TaillePipe } from './@pipe/taille.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    TeamdetailsComponent,
    PlayerComponent,
    DetailsComponent,
    PoidsPipe,
    TaillePipe,
  ],
  imports: [
    SharedModule,
  ],
  providers: [NbaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
