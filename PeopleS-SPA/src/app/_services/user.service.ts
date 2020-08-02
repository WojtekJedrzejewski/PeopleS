import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import { UserSearch } from '../_models/user-search';
import { AuthService } from './auth.service';
import { Status } from '../_models/status';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getUser(id: number) {
    return this.http.get(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id + '/updateInfo', user);
  }

  changePassword(id: number, model: any) {
    return this.http.put(this.baseUrl + 'users/' + id + '/changePassword', model);
  }

  changeDate(id: number, model: any) {
    return this.http.put(this.baseUrl + 'users/' + id + '/changeBirthDate', model);
  }

  getUserPosts(id: number, pageNumber: number){

    const params = new HttpParams()
      .set('senderId', id.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get(this.baseUrl + 'users/' + 'profile', { params });
  }

  searchUsers(query: string, pageNumber: number){
    const params = new HttpParams()
    .set('searchedString', query)
    .set('pageNumber', pageNumber.toString());

    return this.http.get<UserSearch[]>(this.baseUrl + 'users/' + 'search', { params });
  }

  addFriend(friendId: number){
    return this.http.post<Status>(this.baseUrl + 'users/' + this.authService.getToken().nameid + '/addFriend/' + friendId , {});
  }
}
