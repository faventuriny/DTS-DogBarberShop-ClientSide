import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { QueueService } from './queue.service';
import { ServerResponse } from './server-response';

@Injectable({
  providedIn: 'root'
})
export class WaitingListResolver implements Resolve<ServerResponse> {
  constructor(private queueServices: QueueService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.queueServices.getQueueListFromServer()
  }
}
