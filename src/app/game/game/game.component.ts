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

        const teamIds = this.gameList
          .filter((logo) => logo.TeamGames.filter((y) => y.TeamID))
          .map((logo) => logo.TeamGames.map((y) => y.TeamID));

        const titi = allTeam.filter((x) =>
          teamIds.find((element) => element.includes(x.TeamID))
        );

        const teamLogos = this.gameList
          .filter((x) => x.TeamGames)
          .map((y) =>
            y.TeamGames.map((x) => [
              x.TeamID,
              ...titi
                .filter((z) => z.TeamID === x.TeamID)
                .map((w) => w.WikipediaLogoUrl),
            ])
          ) as unknown as any[][][];

        this.gameList.map((x, index) => {
          const maybe = teamLogos[index].map((y) => y[1]);
          x.Game.HomeTeamLogo = maybe[1];
          x.Game.AwayTeamLogo = maybe[0];
        });
      });
    });
  }
}
