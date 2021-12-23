import { PlayerByIdResponse, PlayerStats } from './../../@models/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NbaService } from './../../nba.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  playerStats!: PlayerStats;
  playerId!: PlayerByIdResponse;

  constructor(private route: ActivatedRoute, private nbaService: NbaService, private router: Router) {

    this.route.params.subscribe(res => {

      this.nbaService.getPlayerProfile(2021, res['playerid']).subscribe((data: any) => {
        this.playerStats = data;
      });

      this.nbaService.getPlayerPhotoById(res['playerid']).subscribe((data: any) => {
        this.playerId = data;
      });
    });
  }

  ngOnInit() {
  }

}
