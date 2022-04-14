import {
  PlayerByIdResponse,
  PlayerStats
} from './../../@models/models';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Router
} from '@angular/router';
import {
  NbaService
} from './../../nba.service';
import {
  ChartConfiguration,
  ChartDataset,
  ChartType
} from 'chart.js';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  playerStats!: PlayerStats;
  playerId!: PlayerByIdResponse;
  playerGamesNumber: number | undefined;
  radarChartData: ChartDataset[] = [];

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        ticks: {
          stepSize: 10
        },
        angleLines: {
          color: '#FFFFFF'
        },
        grid: {
          color: '#FFFFFF'
        },
        pointLabels: {
          color: '#FFFFFF'
        }
      }
    }
  };

  public radarChartLabels: String[] = ['PPG', 'APG', 'RPG', 'DRPG', 'ORPG', 'SPG', 'BPG'];

  public radarChartType: ChartType = 'radar';

  constructor(private route: ActivatedRoute, private nbaService: NbaService, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      const currentYear = new Date().getFullYear();
      this.nbaService.getPlayerProfile(currentYear, res['playerid']).subscribe((data: any) => {
        this.playerStats = data;
        this.playerGamesNumber = this.playerStats.Games;
        this.radarChartData = [{
          data: [this.playerStats.Points / this.playerGamesNumber,
            this.playerStats.Assists / this.playerGamesNumber,
            this.playerStats.Rebounds / this.playerGamesNumber,
            this.playerStats.OffensiveRebounds / this.playerGamesNumber,
            this.playerStats.DefensiveRebounds / this.playerGamesNumber,
            this.playerStats.Steals / this.playerGamesNumber,
            this.playerStats.BlockedShots / this.playerGamesNumber
          ],
          label: 'Season ' + currentYear.toString(),
        }, ];
      });

      this.nbaService.getPlayerPhotoById(res['playerid']).subscribe((data: any) => {
        this.playerId = data;
      });
    });
  }

}
