import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NoteService } from '../service/note.service';
import { CookieService } from 'angular2-cookie';
import { CommondataService } from '../service/commondata.service';
import { MatDialog } from '@angular/material';
import { ArchiveService } from '../service/archive.service';
import { LabelService } from '../service/label.service';
import { UpdatecardComponent } from '../updatecard/updatecard.component';
declare let require: any;
let dateFormat = require("dateformat");
@Component({
    selector: 'app-cardlabel',
    templateUrl: './cardlabel.component.html',
    styleUrls: ['./cardlabel.component.css']
})
export class CardlabelComponent implements OnInit {

    public title = new FormControl();
    public note = new FormControl();
    public temp = false;

    private subscribedata: Subscription;

    email = this.cookie.get("email");
    time = "";
    model: any = {};
    res2 = "";
    exp = false;
    res = false;
    public date = new Date();
    errorMsg: any;
    error: boolean = false;
    public datemsg = Date.now().toString();
    // myDate: Date;
    // myTime: Date;
    titles = document.getElementById("title");
    notes = document.getElementById("note");
    view: any;
    test: any;
    public count = this.test;

    // for colors variable

    public color: string;

    public now: Date = new Date();
    gridview: boolean = false;
    reminderenable: boolean = false;
    collabed: any;

    // when the button is clicked on time setting later today
    settime() {
        this.res = true;
    }
    // when the button is clicked on time setting for tomorrow
    settimetomo() {
        this.time = "Tomorrow 8.00PM";
    }
    // when the button is clicked on time setting for next week
    settimeweek() {
        this.time = "Next Week 8.00PM"
    }
    maincard: boolean = true;
    expcard: boolean = false;
    displaycard: boolean = true;
    labeldata: any;
    constructor(private service: NoteService, private cookie: CookieService,
        private common: CommondataService, public dialog: MatDialog, private archiveService: ArchiveService, private labelservice: LabelService) {
        this.service.storeRefresh(this.email).subscribe((status: any) => {
            this.test = status;
        });
        // call the function recursively every 5 seconds 
        setInterval(() => {
            this.dateformater();
        }, 30000);

        //common data shared by the subject in commondataservice
        this.subscribedata = this.common.notifyObservables$.subscribe((res) => {
            this.view = res;
        })
        // once the page reloaded the label of the respective card is fetched
        this.subscribedata = this.common.cardLabelObservables$.subscribe((res) => {

            this.labelservice.getLabelForCard(res).subscribe((status: any) => {

                this.test = status;
            })
        })

    }
    // function that display the note when the date and time is matched
    dateformater() {
        this.test.forEach(element => {
            // dateformat need to be installed 
            let dateFormat = require('dateformat');
            let now = new Date();
            // fetch the today time
            let todaytime = dateFormat(now, "dd/mm/yyyy hh:MM tt");
            // let res = dateFormat(element.time,"hh:MM tt");
            // checks the today date and time with db time and date
            if (todaytime == element.date) {
                alert("remainder")
            }
            else {
                return;
            }
        });
    }

    imageUpload($event) {

    }

    OnDestroy() {
    }
    currentDateAndTime: string;
    currenttime: any;
    timer_button: boolean;
    timer_panel: boolean;
    /**
     * @method exapn()
     * @return void
     * to set the reminder for the card
     */
    expan() {

        this.exp = true;
        let dateFormat = require("dateformat");
        let currentDate = dateFormat(this.model.date, "dd/mm/yyyy");
        let currTime = dateFormat(this.model.time, "hh:MM tt");

        this.dis = currentDate + " " + currTime;
        this.currentDateAndTime = currentDate + " " + this.model.time;
        this.currenttime = this.currentDateAndTime;
    }
    /**
     * @method expanclose()
     * @return void
     *  close the reminder once it is set
     */
    expanclose() {

        this.exp = false;
        let dateFormat = require("dateformat");
        let currentDate = dateFormat(this.model.date, "dd/mm/yyyy");

        this.dis = currentDate + " " + this.model.time;
    }
    labels: any;
    ngOnInit() {
        //once the page is reloaded data is fetched 

        this.service.storeRefresh(this.email).subscribe((status: any) => {
            this.test = status;
        });
        // once the page is reloaded the add label
        this.labelservice.addLabel(this.email).subscribe(
            (status: any) => {

                this.labels = status;

            }, error => {
                console.log("error")
            }
        )
        // from the commondata service for the getting the label of each card
        this.subscribedata = this.common.cardLabelObservables$.subscribe((res) => {

            this.view = res;
        })

    }

    // the main card display settings
    matcardVisbility() {
        this.maincard = false;
        this.expcard = true;
        this.res = false;
    }
    // the expand card display settings
    expcardVisibiilty() {
        this.expcard = false;
        this.maincard = true;
        let dateFormat = require("dateformat");
        let currentDate = dateFormat(this.model.date, "dd/mm/yyyy");

        this.dis = currentDate + " " + this.model.time;
    }

    closeReminder() {
        this.res = false;

    }

    archivecard: string = "false";
    restd: any;
    dis = "";

    /**
     * @method save()
     * @return void
     * when the close is clicked on the card for saving to database
     */

    save() {

        if (this.model.time != undefined || this.model.date != undefined) {
            let dateFormat = require("dateformat");
            let dateformat = dateFormat(this.model.date, "dd/mm/yyyy hh:MM tt");
            this.dis = dateformat;
        } else {
            this.dis;
        }
        this.maincard = true;
        this.expcard = false;
        // let dateFormat = require("dateformat");
        // let dateformat = dateFormat(this.model.date, "dd/mm/yyyy hh:MM tt");
        // this.dis = dateformat;

        this.service.store(this.model, this.email, this.dis, this.color, this.archivecard, this.labeldata, this.collabed).subscribe(
            (status: any) => {

                if (status.status == 404 || status.status == 204) {
                    alert("UnAuthorised User !!!");
                }
                else {
                    this.test = status;
                }
            }, error => {
                this.error = true;
                this.errorMsg = error.message;// error.message inbuilt method
            });

        this.model.title = null;
        this.model.note = null;
        this.color = null;
        this.model.time = "";
        this.model.date = "";
        this.dis = "";
        this.archivecard = "false";
    }

    //change the color
    /**
     * @method setColor()
     * @param idcard for the id of the card
     * @param colorcard for the color of the card
     */
    setColor(idcard, colorcard) {


        this.service.updateTheCard(idcard, colorcard).subscribe(
            (status: any) => {
                status = this.test;
            });

        this.test.forEach(element => {

            if (element.id == idcard) {
                return element.colorcode = colorcard;
            }
            else {
                return;
            }
        });
    }


    //card for update the notes entred
    /**
     * @method updateNote()
     * @param idcard for the id of the card
     * @param model for passing the model
     */
    updateNote(idcard, model) {
        this.service.updateNoteDb(idcard, model).subscribe(
            (status: any) => {
                alert("status returned")
                this.test = status;
            }
        )
    }

    /**
     * @method openDialog()
     * @return void
     *  display when the mat dialog is clicked on title or note
     */
    openDialog(datas): void {
        // passing the data of particular id
        const dialogRef = this.dialog.open(UpdatecardComponent, {
            width: '50%',
            height: '50%',
            data: { datas: datas, resultdate: datas.date }
        });

        dialogRef.afterClosed().subscribe(result => {

            // to display the card when pop card is not undefined
            if (result != undefined)
                this.test = result;
        });
    }

    // for the reminder in the cards below
    cardmenu: boolean = false;
    reminder: any;
    idstore: any;

    /**
     * @method viewcard()
     * @param id for the id of the card
     * used for display and selecting the date and time under the particular card for list view
     */
    viewcard(id) {

        this.test.forEach(element => {
            if (element.id == id) {

                this.cardmenu = true;
                this.idstore = id;
            }

        });
    }


    /**
     * @method editReminder()
     * @param id for the id of the card
     * close the card after time and date is selected for list view
     */
    editReminder(id) {
        this.cardmenu = false;
        let currentDate = dateFormat(this.model.date, "dd/mm/yyyy");
        let result = currentDate + " " + this.model.time;
        this.service.updateReminder(id, result).subscribe();

        this.currentDateAndTime = currentDate + " " + this.model.time;

        this.test.forEach(element => {
            if (element.id == id) {
                this.reminderenable = true;
                return element.date = this.currentDateAndTime;
            }
            else {
                return;
            }
        });
    }

    resultreminder;
    result: boolean;
    /**
     * @method closeReminderResultCard()
     * @param id to store the id of the card
     * to close the menu after reminder is set
     */
    closeReminderResultCard(id) {
        // close reminder after selected
        this.reminderenable = false;
        this.service.deleteReminder(id).subscribe();
        this.test.forEach(element => {
            if (element.id == id) {
                element.date = '';
                // this.result =; 
            }
            else {
                return this.result = true;
            }
        });
    }

    /**
    * @method deleteNote()
    * @param id id of the card
    *  delete the note of particular id
    */
    deleteNote(id) {

        this.service.deleteNote(id).subscribe(
            (status: any) => {

                this.test = status
            }
        );
    }

    archiverescard: string;
    /**
     * @method unArchive()
     * @param id id of the card 
     * unarchive the card from archive component
     */
    archiveNote(id) {

        this.archiveService.archiveNote(id).subscribe(
            (status: any) => {

                this.test = status;
            }
        );
    }

    public addlabell: string = null;
    // lab = false;
      /**
     * to add the label and assign to the card
     * @param id for the id of the card
     * @param labelname name of the label
     */
    val(id, labelname) {
        // this.lab=true;

        this.labelservice.addLabelCard(id, labelname).subscribe(
            (status: any) => {
                status = this.test;
            });

        this.test.forEach(element => {

            if (element.id == id) {
                return element.label = labelname;
            }
            else {
                return;
            }
        });
    }
    /**
     * to delete the label from particular card
     * @param id to store the id of the card
     */
    deletelabel(id) {

        this.labelservice.deleteLabelCard(id).subscribe(
            (status: any) => {
                status = this.test;
            });
        this.test.forEach(element => {

            if (element.id == id) {
                element.label = '';
            }
        });

    }




}
