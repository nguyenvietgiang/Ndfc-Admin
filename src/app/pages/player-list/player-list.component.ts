import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  isVisibleDetail = false;
  isVisibleAdding = false;
  listOfData: Player[] = [];
  selectedPlayer: Player | undefined;
  addPlayerForm!: FormGroup;
  selectedImage: File | null = null;
  previewImageUrl: string | null = null;
  constructor(
    private playerService: PlayerService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPlayerList();
    this.initializeForm();
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
  downloadExcelFile() {
    this.playerService.downloadExcelFile().subscribe((blob: Blob) => {
      this.saveFile(blob, 'exported_file.xlsx');
    });
  }

  private saveFile(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  showModal(id: string): void {
    this.playerService.getPlayerById(id).subscribe(
      (player: Player) => {
        this.selectedPlayer = player;
        this.isVisibleDetail = true;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleDetail = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleDetail = false;
  }
  cancel(): void {
    this.nzMessageService.info('Click cancel');
  } 

  showAddingModal(): void {
    this.isVisibleAdding = true;
  }

  handleOkAdding(): void {
    if (this.addPlayerForm.valid) {
      const formData = new FormData();
      formData.append('sName', this.addPlayerForm.value.name);
      formData.append('iAge', this.addPlayerForm.value.age);
      formData.append('sPosition', this.addPlayerForm.value.position);
      formData.append('sRole', this.addPlayerForm.value.role);
      if (this.selectedImage) {
        formData.append('Image', this.selectedImage, this.selectedImage.name);
      }

      this.playerService.addPlayer(formData).subscribe(
        (player: Player) => {
          this.nzMessageService.success('Player added successfully.');
          this.getPlayerList();
          this.isVisibleAdding = false;
        },
        (error: any) => {
          console.error(error);
          this.nzMessageService.error('Failed to add player.');
        }
      );
    } else {
      this.validateForm();
    }
  }

  handleCancelAdding(): void {
    this.isVisibleAdding = false;
  }

  handleImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      this.previewImage();
    }
  }

  previewImage(): void {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }  

  private initializeForm(): void {
    this.addPlayerForm = this.fb.group({
     name: ['', Validators.required],
      age: ['', Validators.required],
      position: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  private validateForm(): void {

    const { controls } = this.addPlayerForm;

    if (controls.name.invalid) {
      if (controls.name.errors?.required) {
      }
    }

    if (controls.age.invalid) {
      if (controls.age.errors?.required) {
      }
    }

    if (controls.position.invalid) {
      if (controls.position.errors?.required) {
        
      }
    }

    if (controls.role.invalid) {
      if (controls.role.errors?.required) {
       
      }
    }
  }
}


