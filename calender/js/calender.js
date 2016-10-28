
//获取日历表格中的每一个按键
var oTable = document.getElementsByClassName("calender")[0];
var aTd = oTable.getElementsByTagName("td");
var oCaption = document.getElementsByTagName("caption")[0];
var oPrevMon=oCaption.getElementsByClassName("prevMon")[0];
var oNextMon=oCaption.getElementsByClassName("nextMon")[0];
var showChoose=oCaption.getElementsByClassName("showChooseDate")[0];
var oSubmit=oCaption.getElementsByClassName("submit")[0];
var oSetYear=oCaption.getElementsByClassName("setYear")[0];
var oSetMonth=oCaption.getElementsByClassName("setMonth")[0];

//建造一个日历对象
var calender = {};
//写明一年中的所有月份的天数，以及获取今天的日期
calender.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
calender.today=new Date();
calender.thisYear=calender.today.getFullYear();
calender.thisMon=calender.today.getMonth();
calender.thisDate=calender.today.getDate();
calender.thisDay="";
calender.chooseYear=calender.thisYear;
calender.chooseMon=calender.thisMon;

//将获取的星期修改为方便显示的星期几
(calender.convThisDay=function(){
  switch (calender.today.getDay()) {
   case 0: calender.thisDay="星期日";break;
   case 1: calender.thisDay="星期一";break;
   case 2: calender.thisDay="星期二";break;
   case 3: calender.thisDay="星期三";break;
   case 4: calender.thisDay="星期四";break;
   case 5: calender.thisDay="星期五";break;
   case 6: calender.thisDay="星期六";break;
   default: return ;
 }  	
})();

//判断是否是闰年
calender.runNian = function(y) {
  if (y%400===0 || (y%4 === 0 && y%100!== 0)) {
	return true;	
  }	else {
	 return false;    
  }
}
//判断某年某月的1号是星期几
calender.getFirstDay= function (_y,_m) {
  var allDay = 0, y = _y-1, i = 0;	
  
  //计算从公元1年以来的天数
  allDay = y*365 + Math.floor(y/400)+1+Math.floor(y/4)+1-Math.floor(y/100)-1;
  
  if (calender.runNian(_y)) {
	//  console.log(calender.runNian(calender.chooseYear));
	 calender.monthDays[1]=29;  
  } else {
     calender.monthDays[1]=28;	  
  }
  
  for (i=0; i<_m; i++){	  
	allDay += calender.monthDays[i];
  }
 
 return allDay%7;
};
//将时间的格式标准化
calender.toDouble=function(n){
  if (n<10)
  {
	 return "0"+n;
  } else {
    return ""+n;
  }
}
//显示日历标题
calender.showCaption = function() { 
  function loadTime(){
	var immedate=new Date();
	var time=calender.toDouble(immedate.getHours())+":"+calender.toDouble(immedate.getMinutes())+":"+calender.toDouble(immedate.getSeconds());  
	oCaption.children[1].innerHTML = calender.thisYear+"-"+(calender.thisMon+1)+"-"+calender.thisDate+","+calender.thisDay+"    "+time; 
  }
 setInterval(loadTime,1000);
 loadTime();  
}

//填充表格
calender.fillTable=function(y,m){
  var monthDay=0,i=0,newM=1,j=0,lastMonth=0,nextMonDay=0,today=new Date(),date=today.getDate(),k=0,p; 
  //清除所有格式
  for (k=0; k<aTd.length; k++) {
	 aTd[k].className="";  
  }
  
  var firstDayWeek=calender.getFirstDay(y,m); 
  monthDay=calender.monthDays[m]; 
  if(m==0){
	lastMonth=calender.monthDays[11];  
  } else {
  lastMonth=calender.monthDays[m-1];
  }
  
 for (p=0; p<aTd.length; p++){	
 if(aTd[p].className=="thisDay") {
     aTd[p].className=="";
 }
}
                              
  while(i<monthDay) {
	aTd[firstDayWeek+i].innerHTML=1+i; 	
	if(y===calender.thisYear && m===calender.thisMon && calender.thisDate===i+1) { 		
	
	  aTd[firstDayWeek+i].className="thisDay" ;	
	}
	i++;
  }
  
  newM=i-monthDay;
  
  while (j<firstDayWeek) {
	aTd[firstDayWeek-j-1].className="outdate";
    aTd[firstDayWeek-j-1].innerHTML=lastMonth--;
	j++;
  }
 // console.log(i);
  nextMonDay=i+firstDayWeek;
  while(nextMonDay<aTd.length){
   aTd[nextMonDay].className="outdate";
   aTd[nextMonDay].innerHTML = ++newM;	
   nextMonDay++;   
 }

}

//阻止时间默认程序
calender.preventDefault=function(event) {
  var ev = event || window.event;
  if(ev.preventDefault){
	  ev.preventDefault();  
   } else {
	  ev.returnValue = false;   
   }	
}

//点击模块
oPrevMon.onclick=function(event){
    calender.chooseMon--;
    if (calender.chooseMon<0) {
	 calender.chooseMon=11;  
	 calender.chooseYear-=1;
   }	
   var i=0;  
   var ev=event || window.event;    
   calender.fillTable(calender.chooseYear,calender.chooseMon);
   showChoose.innerHTML=calender.chooseYear+"/"+(calender.chooseMon+1);
   calender.preventDefault(ev);
}

oNextMon.onclick=function(event){
   calender.chooseMon++;                           
   if(calender.chooseMon>11){
	  calender.chooseYear++;
	  calender.chooseMon=0;
   } 
   var ev=event || window.event;
   var i=0;  
   calender.fillTable(calender.chooseYear,calender.chooseMon); 
   showChoose.innerHTML=calender.chooseYear+"/"+(calender.chooseMon+1);     
   calender.preventDefault(ev);   
}

//调用函数模块
calender.showCaption();
calender.fillTable(calender.chooseYear,calender.chooseMon);

oSubmit.onclick=function(){
//这里需要将从input里面传输进来的value取为数值，因为默认情况下，传进来的是字符串。
  calender.chooseYear=parseInt(oSetYear.value);
 // console.log(year);
  calender.chooseMon=oSetMonth.value-1;
  
  if(calender.chooseYear==""||calender.chooseMon>11||calender.chooseYear<0||calender.chooseMon<0) {
	  alert("wrong input");   
  }
  else {
	  showChoose.innerHTML=calender.chooseYear+"/"+(calender.chooseMon+1);
	  calender.fillTable(calender.chooseYear,calender.chooseMon); 	 
  }
}
//获取日历表格中的每一个按键
var oTable = document.getElementsByClassName("calender")[0];
var aTd = oTable.getElementsByTagName("td");
var oCaption = document.getElementsByTagName("caption")[0];
var oPrevMon=oCaption.getElementsByClassName("prevMon")[0];
var oNextMon=oCaption.getElementsByClassName("nextMon")[0];
var showChoose=oCaption.getElementsByClassName("showChooseDate")[0];
var oSubmit=oCaption.getElementsByClassName("submit")[0];
var oSetYear=oCaption.getElementsByClassName("setYear")[0];
var oSetMonth=oCaption.getElementsByClassName("setMonth")[0];

//建造一个日历对象
var calender = {};
//写明一年中的所有月份的天数，以及获取今天的日期
calender.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
calender.today=new Date();
calender.thisYear=calender.today.getFullYear();
calender.thisMon=calender.today.getMonth();
calender.thisDate=calender.today.getDate();
calender.thisDay="";
calender.chooseYear=calender.thisYear;
calender.chooseMon=calender.thisMon;

//将获取的星期修改为方便显示的星期几
(calender.convThisDay=function(){
  switch (calender.today.getDay()) {
   case 0: calender.thisDay="星期日";break;
   case 1: calender.thisDay="星期一";break;
   case 2: calender.thisDay="星期二";break;
   case 3: calender.thisDay="星期三";break;
   case 4: calender.thisDay="星期四";break;
   case 5: calender.thisDay="星期五";break;
   case 6: calender.thisDay="星期六";break;
   default: return ;
 }  	
})();

//判断是否是闰年
calender.runNian = function(y) {
  if (y%400===0 || (y%4 === 0 && y%100!== 0)) {
	return true;	
  }	else {
	 return false;    
  }
}
//判断某年某月的1号是星期几
calender.getFirstDay= function (_y,_m) {
  var allDay = 0, y = _y-1, i = 0;	
  
  //计算从公元1年以来的天数
  allDay = y*365 + Math.floor(y/400)+1+Math.floor(y/4)+1-Math.floor(y/100)-1;
  
  if (calender.runNian(_y)) {
	//  console.log(calender.runNian(calender.chooseYear));
	 calender.monthDays[1]=29;  
  } else {
     calender.monthDays[1]=28;	  
  }
  
  for (i=0; i<_m; i++){	  
	allDay += calender.monthDays[i];
  }
 
 return allDay%7;
};
//将时间的格式标准化
calender.toDouble=function(n){
  if (n<10)
  {
	 return "0"+n;
  } else {
    return ""+n;
  }
}
//显示日历标题
calender.showCaption = function() { 
  function loadTime(){
	var immedate=new Date();
	var time=calender.toDouble(immedate.getHours())+":"+calender.toDouble(immedate.getMinutes())+":"+calender.toDouble(immedate.getSeconds());  
	oCaption.children[1].innerHTML = calender.thisYear+"-"+(calender.thisMon+1)+"-"+calender.thisDate+","+calender.thisDay+"    "+time; 
  }
 setInterval(loadTime,1000);
 loadTime();  
}

//填充表格
calender.fillTable=function(y,m){
  var monthDay=0,i=0,newM=1,j=0,lastMonth=0,nextMonDay=0,today=new Date(),date=today.getDate(),k=0,p; 
  //清除所有格式
  for (k=0; k<aTd.length; k++) {
	 aTd[k].className="";  
  }
  
  var firstDayWeek=calender.getFirstDay(y,m); 
  monthDay=calender.monthDays[m]; 
  if(m==0){
	lastMonth=calender.monthDays[11];  
  } else {
  lastMonth=calender.monthDays[m-1];
  }
  
 for (p=0; p<aTd.length; p++){	
 if(aTd[p].className=="thisDay") {
     aTd[p].className=="";
 }
}
                              
  while(i<monthDay) {
	aTd[firstDayWeek+i].innerHTML=1+i; 	
	if(y===calender.thisYear && m===calender.thisMon && calender.thisDate===i+1) { 
	console.log(y===calender.thisYear && m===calender.thisMon && calender.thisDate===i+1);	
	
	  aTd[firstDayWeek+i].className="thisDay" ;	
	}
	i++;
  }
  
  newM=i-monthDay;
  
  while (j<firstDayWeek) {
	aTd[firstDayWeek-j-1].className="outdate";
    aTd[firstDayWeek-j-1].innerHTML=lastMonth--;
	j++;
  }
 // console.log(i);
  nextMonDay=i+firstDayWeek;
  while(nextMonDay<aTd.length){
   aTd[nextMonDay].className="outdate";
   aTd[nextMonDay].innerHTML = ++newM;	
   nextMonDay++;   
 }

}

//阻止时间默认程序
calender.preventDefault=function(event) {
  var ev = event || window.event;
  if(ev.preventDefault){
	  ev.preventDefault();  
   } else {
	  ev.returnValue = false;   
   }	
}

//点击模块
oPrevMon.onclick=function(){
    calender.chooseMon--;
    if (calender.chooseMon<0) {
	 calender.chooseMon=11;  
	 calender.chooseYear-=1;
   }	
   var i=0;      
   calender.fillTable(calender.chooseYear,calender.chooseMon);
   showChoose.innerHTML=calender.chooseYear+"/"+(calender.chooseMon+1);
   calender.preventDefault(ev);
}

oNextMon.onclick=function(event){
   calender.chooseMon++;                           
   if(calender.chooseMon>11){
	  calender.chooseYear++;
	  calender.chooseMon=0;
   } 
   var ev=event || window.event;
   var i=0;  
   calender.fillTable(calender.chooseYear,calender.chooseMon); 
   showChoose.innerHTML=calender.chooseYear+"/"+(calender.chooseMon+1);     
   calender.preventDefault(ev);   
}

//调用函数模块
calender.showCaption();
calender.fillTable(calender.chooseYear,calender.chooseMon);

oSubmit.onclick=function(){
//这里需要将从input里面传输进来的value取为数值，因为默认情况下，传进来的是字符串。
  calender.chooseYear=parseInt(oSetYear.value);
 // console.log(year);
  calender.chooseMon=oSetMonth.value-1;
  
  if(calender.chooseYear==""||calender.chooseMon>11||calender.chooseYear<0||calender.chooseMon<0) {
	  alert("wrong input");   
  }
  else {
	  showChoose.innerHTML=calender.chooseYear+"/"+(calender.chooseMon+1);
	  calender.fillTable(calender.chooseYear,calender.chooseMon); 	 
  }
}