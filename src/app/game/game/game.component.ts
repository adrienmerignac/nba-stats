import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Game, GameInformations } from 'src/app/@models/game';
import { NbaService } from 'src/app/nba.service';
import { PrimeNGConfig } from 'primeng/api';
import { TeamsResponse } from 'src/app/@models/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameList!: GameInformations[];
  teamLogo!: TeamsResponse[];
  homeTeam!: GameInformations[];
  awayTeam!: GameInformations[];
  teams!: TeamsResponse;

  responsiveOptions;

  constructor(private nbaService: NbaService, private datePipe: DatePipe) {
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

   

  ngOnInit(): void {
    var yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    let currentDateTime = this.datePipe.transform(yesterday, 'yyyy-MMM-dd');
    
    this.nbaService.getAllTeams().subscribe(res => {
      this.teamLogo = res;
    });

    this.nbaService.getMatchsOfTheDay(currentDateTime).subscribe(data => {
      console.log(data);
      this.homeTeam = data.filter(x => x.TeamGames.filter(y => y.HomeOrAway === "HOME"));
      this.gameList = data;
      console.log(this.homeTeam);
    });

    
  }

}
