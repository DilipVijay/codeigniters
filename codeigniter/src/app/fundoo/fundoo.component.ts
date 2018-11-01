import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { CommondataService } from "../service/commondata.service";
export interface DialogData {
  label: string;
  name: string;
}

@Component({
  selector: 'app-fundoo',
  templateUrl: './fundoo.component.html',
  styleUrls: ['./fundoo.component.css'],
})

export class FundooComponent {
  label: string;
  name: string;
  panelOpenState = false;

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog,
    private commondata:CommondataService) { }

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    imgloc:string =  "../../assets/img/login/listview.svg";
    view:boolean = false;
    viewtip:string="Grid_View";
      
    toggle(){
      this.view = !this.view
      if (this.view) {
        this.imgloc = "../../assets/img/login/gridview.svg";    
        this.viewtip = "Grid_View";
      }
      else{
        this.imgloc = "../../assets/img/login/listview.svg";
        this.viewtip = "List_View";
      }
      //notify the commondata service true/false
      this.commondata.notifyOther(this.view);
      
    }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '25%',
      height: '35%',
      data: { name: this.name, label: this.label }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.label = result;
    });
  }
  public changeIcon;
  icon: any = true;

  viewNote() {
    if(this.icon == true){
      this.icon = "view_module";
    }
    else{
      this.changeIcon = "view_module";
    }    
  }


}

