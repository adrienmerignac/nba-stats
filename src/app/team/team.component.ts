import { TeamsResponse } from './../@models/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NbaService } from './../nba.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  westTeams: TeamsResponse[] | undefined;
  eastTeams: TeamsResponse[] | undefined;

  constructor(private route: ActivatedRoute, private nbaService: NbaService, private router: Router) {

      this.nbaService.getAllTeams().subscribe(res => {
        this.eastTeams = res.filter(team => team.Conference === 'Eastern');
        this.westTeams = res.filter(team => team.Conference === 'Western');
      });
  }

  public goToTeamDetail(id: number, team: string) {
    this.router.navigate(['/teamdetails', id, team]);
  }

  ngOnInit() {
  }

}
