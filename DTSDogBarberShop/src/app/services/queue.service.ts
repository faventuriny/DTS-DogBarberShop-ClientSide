import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class QueueService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  getQueueListFromServer() {
    console.log('apiService.getUsersList()');

    return this.http
      .get(environment.apiUrl + '/Appointment')
      .pipe(take(1))
  }

  createNewAppointment(newTime: Date){
    let userName = this.auth.getUserName()
    let userId = this.auth.getUserId()

    return this.http.post(
      environment.apiUrl + '/Appointment/',
      {
        queueTime: newTime,
        userName: userName,
        userId: userId
      }
    )
    .pipe(take(1))
  }

  updateAppointment(id:string, newTime: Date){
    console.log('apiService.apdateAppointment()');
    return this.http.patch(
      environment.apiUrl + '/Appointment/' + id,
      {NewQueueAsString: newTime}
    )
    .pipe(take(1))
  }

  deleteAppointment(id:number){
    console.log("apiService.deleteAppointment()");
    return this.http.delete(
      environment.apiUrl + '/Appointment/' + id
    )
    .pipe(take(1))
  }

  getSlotTime(dateAsString: String){
    return this.http.get(
      environment.apiUrl + '/Appointment/date/' + dateAsString
    )
    .pipe(take(1))
  }
}
