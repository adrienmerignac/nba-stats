import { Component, OnInit } from '@angular/core';
import { PlayerResponse, Season } from './../@models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NbaService } from '../nba.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  season!: Season;
  playersList!: PlayerResponse[];
  searchPlayer = '';
  filterPlayers: PlayerResponse[] = [];

  constructor(private route: ActivatedRoute, private nbaService: NbaService, private router: Router) {

    this.nbaService.getAllPlayers().subscribe(data => {
      // tslint:disable-next-line: no-shadowed-variable
      this.playersList = data.sort((a, b) => a.LastName.localeCompare(b.LastName)
      );
      this.filterPlayers = [...this.playersList];
    });

    this.nbaService.getSeason().subscribe(result => {
      this.season = result;
    });

   }

   public searchPlayers() {
    const search = this.formatSearch(this.searchPlayer);
    this.filterPlayers = search.length > 0 ? this.playersList.filter(
      player => this.formatSearch(player.FirstName).indexOf(search) !== -1 ||
        this.formatSearch(player.LastName).indexOf(search) !== -1
    ) : [...this.playersList];
  }

  private formatSearch(value: string) {
    return value.toLowerCase().replace(' ', '');
  }

  ngOnInit() {
  }

}
