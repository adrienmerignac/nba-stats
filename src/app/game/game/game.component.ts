import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Game } from 'src/app/@models/game';
import { NbaService } from 'src/app/nba.service';
declare let $: any;
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {

  gameList!: Game;

  ngAfterViewInit(){
    $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})
  }

  constructor(private nbaService: NbaService, private datePipe: DatePipe) {
    
    var yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    let currentDateTime = this.datePipe.transform(yesterday, 'yyyy-MMM-dd');

      this.nbaService.getMatchsOfTheDay(currentDateTime).subscribe(data => {
        console.log(data);
        this.gameList = data;
        console.log(this.gameList);
      });
   }

   

  ngOnInit(): void {
  }

}
