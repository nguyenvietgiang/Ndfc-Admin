import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  isVisible = false;
  listOfData: Player[] = [];
  selectedPlayer: Player | undefined;

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }
  constructor(private playerService: PlayerService, private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.getPlayerList();
  }

  getPlayerList(): void {
    this.playerService.getPlayerList().subscribe(
      (players: Player[]) => {
        this.listOfData = players;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deletePlayer(id: string): void {
    this.playerService.deletePlayer(id).subscribe(
      () => {
        this.nzMessageService.success('Player deleted successfully.');
        this.getPlayerList();
      },
      (error: any) => {
        console.error(error);
        this.nzMessageService.error('Failed to delete player.');
      }
    );
  }  

  showModal(id: string): void {
    this.playerService.getPlayerById(id).subscribe(
      (player: Player) => {
        this.selectedPlayer = player;
        this.isVisible = true;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  
}

