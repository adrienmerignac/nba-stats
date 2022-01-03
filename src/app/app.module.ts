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
import { MaterialelevationDirective } from './@directive/materialelevation.directive';
import { GameComponent } from './game/game/game.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    TeamdetailsComponent,
    PlayerComponent,
    DetailsComponent,
    PoidsPipe,
    TaillePipe,
    MaterialelevationDirective,
    GameComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [NbaService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
