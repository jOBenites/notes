import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import Note from '../../modules/note.model';
import { DialogNoteComponent } from '../../components/dialog-note/dialog-note.component';
import { ConsumeServeService } from '../../services/consume-serve.service';


@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatListModule,
    MatIconModule
   ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit {

  public notes: Array<Note>;

  constructor(public dialog: MatDialog, private serve: ConsumeServeService){
    this.notes = [{id: 0, title: '', description: '', categoryId: 0}];
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(){
    this.serve.get("/note?nroPage=0&regXPage=30&order=id").subscribe(
      (res: any) => {
        console.log(res);
        this.notes = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

   createNoteDialog() {
    const dialogRef = this.dialog.open(DialogNoteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.serve.post("/note", result).subscribe(
        (res: any) => {
          console.log(res);
          this.getNotes();
        },
        (err: any) => {
           console.log(err);
        }
      )
    });
  }

  editNoteDialog(data: Note) {
    console.log(data);
    const dialogRef = this.dialog.open(DialogNoteComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.serve.put("/note", data.id, result).subscribe(
        (res: any) => {
          console.log(res);
          this.getNotes();
        },
        (err: any) => {
           console.log(err);
        }
      )
    });
  }

  deleteNote(data: Note){
    this.serve.delete("/note", data.id).subscribe(
        (res: any) => {
          console.log(res);
          this.getNotes();
        },
        (err: any) => {
           console.log(err);
        }
      );
  }

  archivedNote(data: Note){
    this.serve.putOther("/note/archived", data.id).subscribe(
        (res: any) => {
          console.log(res);
          this.getNotes();
        },
        (err: any) => {
           console.log(err);
        }
      );
  }


}
