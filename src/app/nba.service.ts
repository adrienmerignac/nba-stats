import { TeamsResponse, PlayerResponse, PlayerByTeamResponse, PlayerStats, Season, PlayerByIdResponse } from './@models/models';
import { PlayerProfileResponse } from './@models/playerdetails';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/toArray';
// import 'rxjs/add/operator/map';

const headers = new HttpHeaders().append('header', 'value');
const params = new HttpParams().append('key', '0baeab542b0e4914ac0dd7f6908af13b');

@Injectable()
export class NbaService {

  constructor(private http: HttpClient) { }

  // Liste de toutes les équipes Américaines -- team component
  public getAllTeams(): Observable<TeamsResponse[]> {
    return this.http.get<TeamsResponse[]>(`https://api.sportsdata.io/v3/nba/scores/json/AllTeams`, { params });
  }

  // Requête pour avoir le détail d'une équipe -- teamdetail component
  public getTeamDetail(): Observable<TeamsResponse[]> {
    return this.http.get<TeamsResponse[]>(`https://api.sportsdata.io/v3/nba/scores/json/AllTeams`, { params });
  }

  // Liste des joueurs par équipe -- teamdetail component
  public getPlayerByTeam(team: String): Observable<PlayerByTeamResponse[]> {
    return this.http.get<PlayerByTeamResponse[]>(`https://api.sportsdata.io/v3/nba/stats/json/Players/${team}`, {params});
  }

  // Liste des joueurs par équipe -- teamdetail component
  public getPlayerById(playerid: number): Observable<PlayerByIdResponse[]> {
    console.log(this.http.get<PlayerByIdResponse[]>(`https://api.sportsdata.io/v3/nba/scores/json/Player/${playerid}`, {params}));

    return this.http.get<PlayerByIdResponse[]>(`https://api.sportsdata.io/v3/nba/scores/json/Player/${playerid}`, {params});
  }

  // Joueur -- playerdetail component
  public getPlayerPhotoById(playerid: number): Observable<PlayerByIdResponse> {
    console.log(this.http.get<PlayerByIdResponse>(`https://api.sportsdata.io/v3/nba/scores/json/Player/${playerid}`, {params}));

    return this.http.get<PlayerByIdResponse>(`https://api.sportsdata.io/v3/nba/scores/json/Player/${playerid}`, {params});
  }

  // Liste de tous les joueurs de la NBA -- teamdetail component
  public getAllPlayers(): Observable<PlayerResponse[]> {
    return this.http.get<PlayerResponse[]>(`https://api.sportsdata.io/v3/nba/scores/json/Players`, {params});
  }

  // Stats d'un joueur sur une année donnée et avec son personId -- player component
  public getSeason(): Observable<Season> {
    return this.http.get<Season>(`https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason`, {params});
  }

  // Stats d'un joueur sur une année donnée et avec son personId -- player component
  public getPlayerProfile(season: number, playerid: number): Observable<PlayerStats> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<PlayerStats>(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/${season}/${playerid}`, {params});
  }

  // Bio d'un joueur -- player component
  // public getPlayerBio(playerId: number): Observable<BioResponse> {
  //   return this.http.get<BioResponse>(`/nba/json/bios/player_${playerId}.json`);
  // }
}
