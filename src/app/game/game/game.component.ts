import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { GameInformations } from "src/app/@models/game";
import { NbaService } from "src/app/nba.service";
import { TeamsResponse } from "src/app/@models/models";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  gameList!: GameInformations[];
  teamLogo!: TeamsResponse[];
  responsiveOptions;

  constructor(private nbaService: NbaService, private datePipe: DatePipe) {
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: "768px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let currentDateTime = this.datePipe.transform(yesterday, "yyyy-MMM-dd");

    this.nbaService.getMatchsOfTheDay(currentDateTime).subscribe((data) => {
      this.gameList = data;

      this.nbaService.getAllTeams().subscribe((allTeam) => {
        this.teamLogo = allTeam;

        const teamLogoIds = this.gameList
          .filter((logo) => logo.TeamGames.filter((y) => y.TeamID))
          .map((logo) => logo.TeamGames.map((y) => y.TeamID));

        const teamIds = allTeam.filter((x) =>
          teamLogoIds.find((element) => element.includes(x.TeamID)));

        const teamLogos = this.gameList
          .filter((x) => x.TeamGames)
          .map((y) =>
            y.TeamGames.map((x) => [
              x.TeamID,
              ...teamIds
                .filter((z) => z.TeamID === x.TeamID)
                .map((w) => w.WikipediaLogoUrl),
              x.Wins === 1,
              x.HomeOrAway
            ])
          ) as unknown as any[][][];

        this.gameList.map((x, index) => {
          const awayOrHomeTeamLogo = teamLogos[index].map((y) => y[1]);
          x.Game.HomeTeamLogo = awayOrHomeTeamLogo[1];
          x.Game.AwayTeamLogo = awayOrHomeTeamLogo[0];
          const winnerTeam = teamLogos[index].filter((y) => y[2] === true).map(y => y[3]);
          x.Game.IsTheWinner = winnerTeam[0];
        });
      });
    });
  }
}
