import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['../create-or-edit-queue.component.css','./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Output() closeAlert: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClickCloseWindow(){
    this.closeAlert.emit("")
  }
  onDelete(){
    this.closeAlert.emit("delete")
  }
  onEvent(event: Event) {
    event.stopPropagation();
  }
}
