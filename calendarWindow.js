/**
 * Provides a month view window for a given month and year.  Returns the 42 cells for a 7 by 6 calendar. 
 * Thursday, September 14, 1752 and newer; still works for older dates.  Aligns with JavaScript fairly far back.
 * Call calendarUtil.monthWindow(2044,01) -- Returns the 42 cells for the 2044 January calendar view/window.
 * @author Ted Johnson
 */
var calendarWindow = (function ()
{
    "use strict";
    var leap = { markers: [0,7,38,67,98,128,159,189,220,251,281,312,342], days: [25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10] },
        normal = { markers: [0,7,38,66,97,127,158,188,219,250,280,311,341], days: [25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10] },
        isLeapYear = function(year)
        {
        	//Examples in order: 2001, 1900, 2000
        	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        },
        determineDayOfWeek = function(year, month, day, yearData) {
        	//Based on logic of: 365 + 1/4 − 1/100 + 1/400
			return (
				year * 365
				+ (year % 4 ? 1 : 0)
				+ Math.floor(year/4)
				- Math.floor(year/100) 
				+ Math.floor(year/400) 
				+ yearData.markers[month] 
				- yearData.markers[1] 
				+ day 
				+ 5 //An offset for what 0000-01-01 would have been, a Friday 
				) 
				% 7;
        },
        checkParameters = function(year, month, day)
    	{
    		//Year is greater than 0, month is between 1 and 12, and day is between 1 and 31.
    		return year && year > 0 && month && month > 0 && month < 13 && (arguments.length < 3 || (day && day > 0 && day < 32));
    	},
        dayOfWeek = function(year, month, day) {
        	//Check parameters
		    return checkParameters(year, month, day) ? determineDayOfWeek(year, month, day, isLeapYear(year) ? leap : normal) : undefined;
        },
        monthWindow = function(year, month) {
        	var yearData = isLeapYear(year) ? leap : normal,
        	    day = determineDayOfWeek(year, month, 1, yearData),
        	    markerPoint = yearData.markers[month] - (day || 7);
			
			//http://stackoverflow.com/questions/3978492/javascript-fastest-way-to-duplicate-an-array-slice-vs-for-loop
    		//http://jsperf.com/new-array-vs-splice-vs-slice/19
    		//slice seems very fast, lets us that.
    		return yearData.days.slice(markerPoint, markerPoint+42);
    	};
    	
    return {
    	monthWindow: function (year, month) { 
    		return checkParameters(year, month) ? monthWindow(year, month) : undefined; 
    		},
    	dayOfWeek: function (year, month) { 
    		return checkParameters(year, month, day) ? dayOfWeek(year, month, day) : undefined; 
    		},
    	isLeapYear : function (year, month) { 
    		return (year && year > 0) ? isLeapYear(year) : undefined; 
    		}
    };
}());
