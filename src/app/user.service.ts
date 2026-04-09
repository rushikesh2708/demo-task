import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private API = 'https://demo-task-backend-x2qt.onrender.com/api/members'
  constructor(private http:HttpClient) { }

  getMembers(page:number,limit:number):Observable<any>{
    return this.http.get(`${this.API}?page=${page}&limit=${limit}`)
  }

  addMember(data:any){
    return this.http.post(this.API,data);
  }

  updateMember(id:number,data:any){
    return this.http.put(`${this.API}/${id}`,data)
  }

  deleteMember(id:number){
    return this.http.delete(`${this.API}/${id}`);
  }
}
