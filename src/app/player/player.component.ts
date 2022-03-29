import {
  Component,
  OnInit
} from '@angular/core';
import {
  PlayerResponse,
  Season
} from './../@models/models';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  NbaService
} from '../nba.service';
import {
  PageEvent
} from '@angular/material/paginator';
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
  pageSlice!: PlayerResponse[];
  pageLength!: number;
  pageSize: number = 10;
  pageSizeOptions = [5, 10];

  constructor(private route: ActivatedRoute, private nbaService: NbaService, private router: Router) {

    this.nbaService.getAllPlayers().subscribe(data => {
      // tslint:disable-next-line: no-shadowed-variable
      this.playersList = data.sort((a, b) => a.LastName.localeCompare(b.LastName));
      this.filterPlayers = [...this.playersList];
      this.pageLength = this.filterPlayers.length;
      this.pageSlice = this.filterPlayers.slice(0, this.pageSize);
    });
    this.nbaService.getSeason().subscribe(result => {
      this.season = result;
    });
  }

  public OnPageChange(event: PageEvent) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.pageSlice = this.filterPlayers.slice(offset).slice(0, event.pageSize);
  }

  public searchPlayers(event: Event) {
    const search = this.formatSearch((event.target as HTMLInputElement).value);
    this.pageSlice = search.length > 0 ?
      this.filterPlayers.filter(player =>
        this.formatSearch(player.FirstName).indexOf(search) !== -1 ||
        this.formatSearch(player.LastName).indexOf(search) !== -1).slice(0, 10) : [...this.playersList].slice(0, 10)

    this.pageLength = search.length > 0 ?
      this.filterPlayers.filter(player =>
        this.formatSearch(player.FirstName).indexOf(search) !== -1 ||
        this.formatSearch(player.LastName).indexOf(search) !== -1).length : [...this.playersList].length;
  }

  private formatSearch(value: string) {
    return value.toLowerCase().replace(' ', '');
  }

  ngOnInit() {}
}
