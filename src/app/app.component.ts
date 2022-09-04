import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  positionList: any[] = new Array(9).fill(null);
  gameInit: boolean = false;
  invalidMove: boolean = false;
  done: boolean = false;
  tie: boolean = false;
  player1: any = {name: '', turn: false};
  player2: any = {name: '', turn: false};

  ngOnInit(): void {
    this.gameInit = true;
    this.done = false;
    this.tie = false;
    this.positionList = new Array(9).fill(null);
    this.player1.turn = true;
    this.player1.name = '';
    this.player2.name = '';
    this.player2.turn = false;
  }

  startGame() {
    this.gameInit = false;
    this.done = false;
    this.tie = false;
    this.player1.turn = true;
    this.player2.turn = false;
    this.positionList = new Array(9).fill(null);
  }

  updateCellStatus(pos: number) {
    if(this.done || this.tie)
      this.gameInit = true;

    if (this.positionList[pos] != null && !this.tie) {
      this.invalidMove = true
      return
    }
    else {
      this.invalidMove = false
      if (this.player1.turn)
        this.positionList[pos] = 'X'
      else
        this.positionList[pos] = 'O'

      this.player1.turn = !this.player1.turn;
      this.player2.turn = !this.player2.turn;
    }
    this.checkTieStatus()
    if(!this.tie){
      this.findWinner()
    }

  }

  private findWinner() {
    if ((this.positionList[0] == this.positionList[4]) && (this.positionList[4] == this.positionList[8]) && this.positionList[4] != null)
      this.done = true;

    else if ((this.positionList[2] == this.positionList[4]) && (this.positionList[4] == this.positionList[6]) && this.positionList[4] != null)
      this.done = true;

    else if ((this.positionList[0] == this.positionList[1]) && (this.positionList[1] == this.positionList[2]) && this.positionList[1] != null)
      this.done = true;

    else if ((this.positionList[0] == this.positionList[3]) && (this.positionList[3] == this.positionList[6]) && this.positionList[3] != null)
      this.done = true;

    else if ((this.positionList[6] == this.positionList[7]) && (this.positionList[7] == this.positionList[8]) && this.positionList[7] != null)
      this.done = true;

    else if ((this.positionList[2] == this.positionList[5]) && (this.positionList[5] == this.positionList[8]) && this.positionList[5] != null)
      this.done = true;
    else
      this.done = false;
  }

  getWinnerName() {
    let countX = 0, countO = 0;
    this.positionList.forEach(i => {
      i == 'O' ? countO++ : countX++;
    })
    if (countO > countX)
      return 'Winner is ' + this.player2.name
    else if (countO < countX)
      return 'Winner is ' + this.player1.name
    else
      return 'Tie, reload the game'
  }

  reload() {
    this.positionList = new Array(9).fill(null);
  }

  private checkTieStatus() {
    let countX = 0, countO = 0;
    this.positionList.forEach(i => {
      i == 'O' ? countO++ : countX++;
    })
    console.log(countX)
    console.log(countO)
    if((countX == countO -1 )|| (countX-1 == countO ))
      this.tie = true;
  }
}
