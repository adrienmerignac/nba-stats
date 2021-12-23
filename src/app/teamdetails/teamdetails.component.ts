import { TeamsResponse, PlayerByTeamResponse, Season } from './../@models/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NbaService } from './../nba.service';

@Component({
  selector: 'app-teamdetails',
  templateUrl: './teamdetails.component.html',
  styleUrls: ['./teamdetails.component.scss']
})
export class TeamdetailsComponent implements OnInit {

  teamDetails: TeamsResponse | undefined;
  teamRostersPlayers: PlayerByTeamResponse[] | undefined;
  season: Season | undefined;

  constructor(private route: ActivatedRoute, private nbaService: NbaService, private router: Router) {
    this.route.params.subscribe(res => {

      this.nbaService.getAllTeams().subscribe(data => {
        this.teamDetails = data.find(teamdetail => res['team'] === teamdetail.Key);
      });

      this.nbaService.getPlayerByTeam(res['team']).subscribe(result => {
        this.teamRostersPlayers = result.sort((a, b) => a.LastName.localeCompare(b.LastName))
      });

      this.nbaService.getSeason().subscribe(result => {
        this.season = result;
      });
    });
  }

  public goToPlayerProfile(season: number, playerid: number) {
    this.router.navigate(['/player/', season, playerid]);
  }

  ngOnInit() {
  }
}
