import { CurrentState, CurrentStateByConference } from './../../@models/models';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullInformation } from 'src/app/@models/game';
import { NbaService } from 'src/app/nba.service';
import { TeamsResponse } from 'src/app/@models/models';
import { forkJoin, map } from 'rxjs';
import { data } from 'jquery';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameList!: FullInformation[];
  teamLogo!: TeamsResponse[];
  displayedColumns: string[] = ['rank', 'city', 'win', 'loose', 'percent', 'conf', 'division', 'home', 'road', 'streak'];
  currentState!: CurrentStateByConference;
  loading: boolean = true;
  isEasternConference: boolean = true;
  responsiveOptions;

  constructor(private nbaService: NbaService, private datePipe: DatePipe) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '920px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '720px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let currentDateTime = this.datePipe.transform(yesterday, 'yyyy-MMM-dd');
    forkJoin({
      requestOne: this.nbaService.getMatchsOfTheDay(currentDateTime),
      requestTwo: this.nbaService.getAllTeams(),
    })
      .pipe(
        map((data) => {
          const matchOfTheDay = data.requestOne;
          const allTeams = data.requestTwo;

          let mergeGameInfos = matchOfTheDay.map((infos) => {
            let otherHomeGameInfos = allTeams.find((element) =>
              infos.TeamGames.find(
                (teamgame) =>
                  teamgame.TeamID === element.TeamID &&
                  teamgame.HomeOrAway === 'HOME'
              )
            )?.WikipediaLogoUrl;

            let otherAwayGameInfos = allTeams.find((element) =>
              infos.TeamGames.find(
                (teamgame) =>
                  teamgame.TeamID === element.TeamID &&
                  teamgame.HomeOrAway === 'AWAY'
              )
            )?.WikipediaLogoUrl;

            const fullInformations: FullInformation = {
              GameInformations: infos,
              otherHomeGameInfos,
              otherAwayGameInfos,
            };
            return fullInformations;
          });

          return mergeGameInfos;
        })
      )
      .subscribe((res) => [(this.gameList = res)]);

    }
    
    ngAfterViewInit(): void {
    this.nbaService.getCurrentState('2022')
    .pipe(
      map((data) => {
        let eastTeams = data.filter(east => east.Conference === 'Eastern').sort((a, b) => b.Percentage - a.Percentage);
        let westTeams = data.filter(west => west.Conference === 'Western').sort((a, b) => b.Percentage - a.Percentage);
        const currentStateByConference: CurrentStateByConference = {
          CurrentState: data,
          easternTeams: eastTeams,
          westernTeams: westTeams
        }
        return currentStateByConference;
      })
    )
    .subscribe(data => {
      this.currentState = data;
    })

  }
}
