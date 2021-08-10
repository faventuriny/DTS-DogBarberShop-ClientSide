import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { QueueService } from 'src/app/services/queue.service';


@Component({
  selector: 'app-user-edit-mode',
  templateUrl: './create-or-edit-queue.component.html',
  styleUrls: ['./create-or-edit-queue.component.css']
})
export class CreateOrEditQueueComponent implements OnInit {


  constructor(private fb: FormBuilder, private authService: AuthService, private queueService: QueueService) { }
  // form details
  @Input() queue!: any
  user: any
  userName :any
  userId : any
  form!:FormGroup
  timeSlot = []
  showHoursSlot = false;
  existingTimeDate : any
  registTime : any
  erorMsg = ''
  showErrorMsg = false

  // alert window
  @Output() closeWindow: EventEmitter<any> = new EventEmitter()
  displayAlertWindow: boolean = false

  // date picker
  minDate = new Date()
  dateFilter = (date: any)  => {
    if(date === null)
      return false
    const day = date.getDay();
    return day !== 5 && day !== 6;
  }

  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.userName = this.authService.getUserName()
    this.userId = this.authService.getUserId()
    this.createForm()
  }

  onClickCloseWindow(){
    this.closeWindow.emit("")
  }
  createForm() {
    if(this.queue === undefined){
      this.createFormForNewAppointment()
    } else {
      this.createFormForEditing()
      this.existingTimeDate = this.queue.queueTime
      this.registTime = this.queue.registTime
    }
  }

  createFormForNewAppointment(){
      this.form = this.fb.group({
      userName : new FormControl(this.userName),
      dateInput : new FormControl(this.minDate, Validators.required),
      selectTimeSlot: new FormControl('',Validators.required),
      registTime : new FormControl(''),
      userID : new FormControl(this.userId),
    })
  }
  createFormForEditing(){
      this.form = this.fb.group({
        userName : new FormControl(this.queue?.userName),
        dateInput : new FormControl(this.queue.queueTime, Validators.required),
        selectTimeSlot: new FormControl('',Validators.required),
        registTime : new FormControl(this.queue.registTime),
        userID : new FormControl(this.queue.userId),
        id : new FormControl(this.queue.id)
      })
  }
  onSubmit() {
    let date =this.form.value.dateInput
    let time =this.form.value.selectTimeSlot
    var hours = time.split(":")[0];
    var minutes = time.split(":")[1];
    date.setHours(hours,minutes)
    console.log('creatOrEdir, date pass to server:', date);

    if(this.queue === undefined){ // New appointment
      this.queueService.createNewAppointment(date)
      .subscribe(resData => {
        console.log('resData', resData);
        this.closeWindow.emit(resData)
      }, error => {
        console.log('error', error.message);
        this.erorMsg = error.message;
        this.showErrorMsg = true;
        this.closeWindow.emit()
      })
    } else { // Edit appointment
      this.queueService.updateAppointment(this.form.value.id, date)
        .subscribe(resData => {
          console.log('resData', resData);
          this.closeWindow.emit(resData)
        }, error => {
          console.log('error', error.message);
          this.closeWindow.emit()
        })
    }
  }

  Delete() {
    console.log('user-edit-mode.delete()');
    this.queueService.deleteAppointment(this.form.value.id)
    .subscribe(resData => {
      this.closeWindow.emit(resData)
    }, error => {
      console.log('error', error.message);
    })
  }

  onDelete() {
    this.displayAlertWindow = true;
  }

  onEvent(event: Event) {
    event.stopPropagation();
  }

  onClickCloseAlert(event: Event){
    if(JSON.stringify(event) === JSON.stringify("delete")){
      this.Delete();
    }
    this.displayAlertWindow = false;
  }
  onPickDateSelected(event: any){
    this.showErrorMsg = false;
    let dateAsString = this.returnDateAsString(event.value);

    this.queueService.getSlotTime(dateAsString).subscribe((resData: any) => {
      console.log('resData',resData);
      this.timeSlot = resData.payload;
      this.showHoursSlot = true
    }, error => {
      console.log('error', error.message);
    })
  }

  returnDateAsString(date: any){

    let dateTime = new Date(date);
    let dateAsArray = dateTime.toString().split(' ')
    let year = dateAsArray[3];
    let month
    switch(dateAsArray[1]){
      case 'Jan': month = '01'; break;
      case 'Feb': month = '02'; break;
      case 'Mar': month = '03'; break;
      case 'Apr': month = '04'; break;
      case 'May': month = '05'; break;
      case 'Jun': month = '06'; break;
      case 'Yul': month = '07'; break;
      case 'Aug': month = '08'; break;
      case 'Sep': month = '09'; break;
      case 'Oct': month = '10'; break;
      case 'Nov': month = '11'; break;
      case 'Dec': month = '12'; break;
    }
    let day = dateAsArray[2]
    if(day.length === 1){
      day = '0' + day
    }
    let dateAsString = year + '-' + month + '-' + day
    return dateAsString
  }


}
