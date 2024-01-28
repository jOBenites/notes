import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Note from '../modules/note.model';

@Injectable({
  providedIn: 'root',

})
export class ConsumeServeService {
  private baseUrl = "http://localhost:8090/api/notes/v1";

  constructor(private httpClient: HttpClient) { }

  public get(url: String) {
    return this.httpClient.get(this.baseUrl + url);
  }

  public post(url: string, data: Note){
     return this.httpClient.post(this.baseUrl + url, data);
  }

  public put(url: string, id: number, data: Note){
     return this.httpClient.put(this.baseUrl + url+'/'+id, data);
  }

  public putOther(url: string, id: number){
     return this.httpClient.put(this.baseUrl + url+'/'+id, {});
  }

  public delete(url: string, id: number){
     return this.httpClient.delete(this.baseUrl + url+'/'+id);
  }

}
