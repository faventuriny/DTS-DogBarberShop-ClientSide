import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Queue } from '../queue';
import { QueueService } from 'src/app/services/queue.service';
import { ServerResponse } from 'src/app/services/server-response';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css']
})
export class WaitingListComponent implements OnInit {

  queueList : Queue[] = []
  userId: string = ''
  selectedQueue! : any
  indexOfSelectedQueue: any
  displayEditWindow: boolean = false
  isDataFromServerOk: boolean = false
  serverMsg: string = ''

  constructor(private authService: AuthService, private queueService: QueueService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getQueueList()
  }
  getQueueList(){
    console.log('waitingList.getUserList()');

    this.route.data
      .subscribe((data: Data) => {
        console.log("waiting-list getQueueList() data: ",data);

        if(data.WaitingListResolver.isSuccess){
          this.isDataFromServerOk = true
          this.queueList = []
          this.queueList = <Queue[]><unknown>data.WaitingListResolver.payload
          this.onClickSortByTime()
        }
        else {
          this.isDataFromServerOk = false
          this.serverMsg = data.WaitingListResolver.payload;
        }
      }, error => {
        this.serverMsg = error
        this.isDataFromServerOk = false;
      })
      this.userId = this.authService.getUserId()
  }

  isAToBSorting: boolean = true;
  onClickSortByName(){
    console.log('onClickSortByName');
    if(this.isAToBSorting){
      this.queueList.sort((queue1, queue2)=> queue1.userName.localeCompare(queue2.userName))
    } else {
      this.queueList.sort((user1, user2)=> user2.userName.localeCompare(user1.userName))
    }
    this.isAToBSorting = !this.isAToBSorting;
  }

  isNearestAppontmentSorting: boolean = true;
  onClickSortByTime(){
    console.log('onClickSortByTime');
    if(this.isNearestAppontmentSorting){
      this.queueList.sort((queue1, queue2)=> {
        let date1 = new Date(queue1.queueTime)
        let date2 = new Date(queue2.queueTime)
        return date1.getTime() - date2.getTime()
      })
    } else {
      this.queueList.sort((user1, user2)=> {
        let date1 = new Date(user1.queueTime)
        let date2 = new Date(user2.queueTime)
        return date2.getTime() - date1.getTime()
      })
    }
    this.isNearestAppontmentSorting = !this.isNearestAppontmentSorting;
  }
  onClickOpenUserEditeMode(index:number, id: string) {
    console.log('onClickOpenUserEditeMode: ', 'index',index,'id', id, this.userId);
    if(id != this.userId){
      return
    }
    this.selectedQueue = this.queueList[index]
    this.indexOfSelectedQueue = index
    this.displayEditWindow = true;
  }
  onClickOpenNewAppointment(){
    this.selectedQueue = undefined;
    this.indexOfSelectedQueue = undefined;
    this.displayEditWindow = true;
  }

  resetSelectedQueue(){
    this.selectedQueue = undefined
    this.indexOfSelectedQueue = undefined
  }

  onClickCloseWindow(event: ServerResponse) {
    if(event.isSuccess){
      //delete appointment from list
      if(event.payload === "Appontment deleted"){
        this.queueList.splice(this.indexOfSelectedQueue,1)
        this.resetSelectedQueue()
        this.displayEditWindow = false;
        return
      }
      if(this.selectedQueue !== undefined){
        //update relevant appointment
          this.queueList[this.indexOfSelectedQueue].queueTime = event.payload.queueTime
          this.resetSelectedQueue()
      }else {
        //add new appointment
        this.queueList.push(event.payload)
      }
    }
    this.displayEditWindow = false;
  }

}
