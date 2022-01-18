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
  homeTeam!: any[];
  homeLogo!: any[];
  awayTeam!: any[];
  awayLogo!: any[];
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
    let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    let currentDateTime = this.datePipe.transform(yesterday, 'yyyy-MMM-dd');

    this.nbaService.getMatchsOfTheDay(currentDateTime).subscribe(data => {
      this.gameList = data
      .sort((a,b) => (a.Game.HomeTeam > b.Game.HomeTeam) ? 1 : ((b.Game.HomeTeam > a.Game.HomeTeam) ? -1 : 0))

    this.nbaService.getAllTeams().subscribe(allTeam => {
      this.teamLogo = allTeam;

      const homeKey = this.gameList
      .filter(logo => logo.Game.HomeTeam)
      .map(logo => logo.Game.HomeTeam)
   
      const awayKey = this.gameList
      .filter(logo => logo.Game.AwayTeam)
      .map(logo => logo.Game.AwayTeam)

      this.homeTeam = allTeam
      .filter(team => homeKey.includes(team.Key))
      .map(team => [
        team.Key,
        team.WikipediaLogoUrl
      ])
      .sort()

      this.awayTeam = allTeam
      .filter(team => awayKey.includes(team.Key))
      .map(team => [
        team.Key,
        team.WikipediaLogoUrl
      ])
     

      this.homeLogo = this.homeTeam.map(element => {
        return element[1];
      });

      this.awayLogo = this.awayTeam.map(element => {
        return element[1];
      });
  
      this.gameList.map((x, index) => {
        x.Game.HomeTeamLogo = this.homeLogo[index];
        x.Game.AwayTeamLogo = this.awayLogo[index];
      })
      console.log(this.gameList);
    });

  });

    
  }

}
