import { Component, OnInit, Input,Output,EventEmitter} from '@angular/core';

enum DayState {
	nothing =0,
    old ,
    normal,
    weekEnd,
    middle,
    selected,
    ready,
}

interface dayStruct
{
	name : string;
	state : DayState;
	date : Date;
}

@Component({
  selector: 'b2b-cozy-date-picker',
  templateUrl: 'cozy-date-picker.component.html',
  styleUrls: ['cozy-date-picker.component.css']
})
export class CozyDatePickerComponent implements OnInit {
  
  @Output() inputCheckInDate:EventEmitter<Date> = new EventEmitter<Date>();
  @Output() inputCheckOutDate:EventEmitter<Date> = new EventEmitter<Date>();


  @Input() public selectDateType = 0;
  @Input() public checkInDate : Date = null;
  @Input() public checkOutDate : Date = null;

  TempDate : Date = null;

  public dayState = DayState;

  weekNameArray = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  monthNameArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  firstMonth = "";
  secondMonth = "";
  firstDayArray : dayStruct[] = [];
  secondDayArray : dayStruct[] = [];
  currentMonth : Date  = null;


constructor()
{
}


  ngOnInit() {
	let today = new Date();
	this.currentMonth = new Date(today.getFullYear(),today.getMonth(),1);
	this.initDayByFirstMonth(this.currentMonth);
  }

  initDayByFirstMonth(firstMonth : Date)
  {
  	 this.firstMonth = this.getMonthName(firstMonth);
  	 this.firstDayArray = this.getDayArray(firstMonth);

  	 let nextMonth = this.getNextMonth(firstMonth);
  	 this.secondMonth = this.getMonthName(nextMonth);
  	 this.secondDayArray = this.getDayArray(nextMonth);
  }

  selectDay(event:Date)
  {
  	if(this.selectDateType==0)
  	{
  		this.checkInDate = event;
  		if(this.checkOutDate != null && this.checkOutDate.getTime()<=this.checkInDate.getTime())
  		{
  			this.checkOutDate =  new Date(this.checkInDate.getTime() + 24 * 60 * 60 * 1000);
  			this.inputCheckOutDate.emit(this.checkOutDate);
  		}

  		this.inputCheckInDate.emit(event);
  	}
  	else
  	{
  		this.checkOutDate = event;
  		if(this.checkInDate != null && this.checkOutDate.getTime()<=this.checkInDate.getTime())
  		{
  			this.checkInDate =  new Date(this.checkOutDate.getTime() - 24 * 60 * 60 * 1000);
  			this.inputCheckInDate.emit(this.checkInDate);
  		}  		
  		this.inputCheckOutDate.emit(event);
  	}
  }

  getNextMonth(month:Date) : Date
  {
  	var nextMonth : Date = null;

	if (month.getMonth() == 11) {
	    nextMonth = new Date(month.getFullYear() + 1, 0, 1);
	} else {
	    nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
	}
	return nextMonth;
  }

  getPreMonth(month:Date) : Date
  {
  	var preMonth : Date = null;
  	
	if (month.getMonth() == 0) {
	    preMonth = new Date(month.getFullYear() - 1, 11, 1);
	} else {
	    preMonth = new Date(month.getFullYear(), month.getMonth() - 1, 1);
	}
	return preMonth;
  }


  getMonthName(month : Date) : string
  {
  	 return "" + month.getFullYear() + " " +  this.monthNameArray[month.getMonth()];
  }

  getDayArray(month : Date) : dayStruct[]
  {
  	let d = new Date();
  	let today = new Date(d.getFullYear(),d.getMonth(),d.getDate());

  	var dayArray : dayStruct[] = [];
  	let y = month.getFullYear();
  	let m = month.getMonth();

	let firstDay = new Date(y, m, 1);
	let lastDay = new Date(y, m + 1, 0);  
	let dayCount = lastDay.getDate();
	let firstDayWeek = firstDay.getDay();
	let lastDayWeek = 7-lastDay.getDay();

	var i=0;
	for(;i<firstDayWeek;i++)
	{
		dayArray.push({name:"",state: DayState.nothing,date:null});
	}
	for(var number = 1;i<firstDayWeek+dayCount;i++,number++)
	{	
		let day = new Date(y,m,number);
		if( ( this.checkInDate != null && day.getTime() ==  this.checkInDate.getTime() ) || ( this.checkOutDate != null && day.getTime() == this.checkOutDate.getTime() ) )
		{
			dayArray.push({name:""+number,state:DayState.selected,date:day});
		}
		else if( this.checkInDate != null && this.checkOutDate != null && day.getTime() >this.checkInDate.getTime() && day.getTime()<this.checkOutDate.getTime())
		{
			dayArray.push({name:""+number,state:DayState.middle,date:day});
		}
		else if( (this.selectDateType == 0 && day.getTime()<today.getTime()) ||
			(this.selectDateType == 1&& day.getTime()<=today.getTime() ) )
		{
			dayArray.push({name:""+number,state:DayState.old,date:day});
		}
		else
		{
			if(i%7==0  || (i+1)%7==0 )
			{
				dayArray.push({name:""+number,state:DayState.weekEnd,date:day});
			}
			else
			{
				dayArray.push({name:""+number,state:DayState.normal,date:day});
			}
		}
	}
	for(;i<firstDayWeek+dayCount+lastDayWeek;i++)
	{
		dayArray.push({name:"",state:DayState.nothing,date:null});
	}

	return dayArray;
  }

  prepareSelectDay(d: Date,state: DayState)
  {
  	if(state == DayState.middle || state == DayState.normal || state == DayState.selected || state == DayState.weekEnd)
  	{	
  		this.TempDate = d;
  		this.redrawArray(this.firstDayArray);
  		this.redrawArray(this.secondDayArray);
  	}
  }

  redrawArray(dayArray :dayStruct[])
  {
  		let td = new Date();
  		let today = new Date(td.getFullYear(),td.getMonth(),td.getDate());  

      var firstSelect = this.checkInDate;
      var secondSelect = this.checkOutDate;	
      if(this.selectDateType == 0)
      {
        if(this.checkInDate == null && this.checkOutDate)
        {
          firstSelect = this.TempDate;
        }
        else if(this.checkOutDate &&  this.TempDate.getTime()<= this.checkInDate.getTime() && this.checkOutDate)
        {
          firstSelect = this.TempDate;
        }
      }
      else
      {
        if(this.checkOutDate == null && this.checkInDate)
        {
          secondSelect = this.TempDate;
        }
        else if(this.checkInDate && this.TempDate.getTime()>= this.checkOutDate.getTime() && this.checkInDate)
        {
          secondSelect = this.TempDate;
        }
      }
  		for(var i=0;i<dayArray.length;i++)
  		{
	  		var day = dayArray[i];
	  		if(day.state == DayState.nothing)
	  		{

	  		}
  			else if( ( firstSelect != null && day.date.getTime() ==  firstSelect.getTime() ) || ( secondSelect != null && day.date.getTime() == secondSelect.getTime() ) )
	  		{
		  		day.state = DayState.selected;
			  }
			  else if( firstSelect != null && secondSelect != null && day.date.getTime() >firstSelect.getTime() && day.date.getTime()<secondSelect.getTime())
			  {
				  day.state = DayState.middle;
			  }
  			else if( (this.selectDateType == 0 && day.date.getTime()< today.getTime()) ||
	  			(this.selectDateType == 1&& day.date.getTime()<=today.getTime() ) )
		  	{
			  	day.state = DayState.old;
			  }
			  else
			  {
				  if(i%7==0  || (i+1)%7==0 )
				  {
					  day.state = DayState.weekEnd;
				  }
				  else
				  {
					 day.state = DayState.normal;
				  }
			  }

  		}

  }

  outOfValid()
  {
  	 this.TempDate = null;
  }

  pageButton(page : number)
  {
  	if(page == 0)
  	{
  		this.currentMonth = this.getPreMonth(this.currentMonth);
  	}
  	else
  	{
  		this.currentMonth = this.getNextMonth(this.currentMonth);
  	}
  	this.initDayByFirstMonth(this.currentMonth);
  }
}
