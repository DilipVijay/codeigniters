import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { CookieService } from 'angular2-cookie';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  res="";
  email="";
  constructor(private http: HttpClient,private cookie:CookieService) { }
  mode: any = {};
  private storenote="http://localhost/codeigniter/note";
  store(mode5,email){
    debugger;

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email",email);
    params.append("title",mode5.title);
    params.append("note",mode5.note);
    
    console.log(params);
    
    debugger;
    return this.http.post(this.storenote,params, otheroption).pipe(
      map((res: Response) => res)
    )
  }
}
