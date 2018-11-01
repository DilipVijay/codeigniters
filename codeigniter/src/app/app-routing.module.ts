import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginsComponent } from './logins/logins.component';
import { ForgetComponent } from './forget/forget.component';
import { ResetsComponent } from './resets/resets.component';
import { EmailvalidateComponent } from './emailvalidate/emailvalidate.component';
import { FundooComponent } from './fundoo/fundoo.component';
import { NotesComponent } from './notes/notes.component';
import { ReminderComponent } from './reminder/reminder.component';
import { RoughComponent } from './rough/rough.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports:
    [
      RouterModule.forRoot(
        [
          { path: '', redirectTo: 'register', pathMatch: 'full' },
          { path: 'register', component: RegisterComponent },
          { path: 'logins', component: LoginsComponent },
          { path: 'forget', component: ForgetComponent },
          { path: 'resets', component: ResetsComponent },
          { path: 'valid', component: EmailvalidateComponent },
          {
            path: 'fundoo', component: FundooComponent, canActivate: [AuthGuard],
            children: [
              { path: 'note', component: NotesComponent, canActivate: [AuthGuard], },
              { path: 'remainder', component: ReminderComponent, canActivate: [AuthGuard], },
              { path: 'archive', component: ArchiveComponent, canActivate: [AuthGuard], },
              { path: 'trash', component: TrashComponent, canActivate: [AuthGuard], },
            ]
          },
          { path: 'rough', component: RoughComponent, canActivate: [AuthGuard], },
          { path: 'addnote', component: AddnoteComponent, canActivate: [AuthGuard], },

        ])
    ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }