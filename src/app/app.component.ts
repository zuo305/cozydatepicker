import { Component } from '@angular/core';
import { CozyDatePickerComponent } from './cozy-date-picker/index';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [CozyDatePickerComponent]
})

export class AppComponent {
  title = 'app works!';
  checkInOpened = true;
  checkOutOpened = false;
  checkInDateString = 'Check In';
  checkOutDateString = 'Check Out';
  checkInDate : Date = null;
  checkOutDate : Date = null;
  selectType = 0;


constructor()
{
}

setCheckInDate(event : Date)
{
	this.checkInDateString = event.toString();
	this.checkInDate = event;
	this.checkInOpened = false;
  	this.checkOutOpened = false;

}

setCheckOutDate(event : Date)
{
	this.checkOutDateString = event.toString();
	this.checkOutDate = event;
	this.checkInOpened = false;
  	this.checkOutOpened = false;
}

 

}
