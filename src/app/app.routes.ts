import { Routes } from '@angular/router';
import { NoteComponent } from './pages/note/note.component';
import { NoteArchivedComponent } from './pages/note-archived/note-archived.component';

/*export const routes: Routes = [
];*/

export const routes: Routes = [
  { path: 'notes', component: NoteComponent},
  { path: 'notes-archived', component: NoteArchivedComponent},
  { path: '',   redirectTo: 'notes', pathMatch: 'full' },
  { path: '**', redirectTo: 'notes' }
];