/**
 * Beyond.JS v1.0.1, by Kalman Olah (http://kalmanolah.net)
 * 
 * Beyond.JS is a simple Javascript library intended for the conversion of absolute timestamps
 * into relative timestamps. It was created as a lightweight alternative for similar libraries,
 * but without the need for jQuery.
 * 
 * Beyond.JS © Kalman Olah 2013
 * 
 * This script is free for both personal and commercial use.
 */

/* 
 * Constructor function; USAGE:
 * BeyondJSInstance = new BeyondJS({future, now, lang});
 * [OPTIONAL] future(boolean): Whether to allow time differences in the future; defaults to true
 * [OPTIONAL] now(mixed): timestamp representing current time; defaults to current time
 * [OPTIONAL] locale: an object containing custom locale strings
 */
var BeyondJS = (function(args){
	
	// Object configuration variable container
	this.cfg = {
			"future"		: false,
			"now"			: null,
			"locale"		: {
				s: "second",
				S: "seconds",
				m: "minute",
				M: "minutes",
				h: "hour",
				H: "hours",
				d: "day",
				D: "days",
				w: "week",
				W: "weeks",
				mo: "month",
				MO: "months",
				y: "year",
				Y: "years",
				"default": "just now",
				"past": "ago",
				"future": "from now"
			}
	};
	
	// Object constructor
	(function(that,args){
		
		// Overwrite the default config with any custom configuration values
		if(args) {
		    for(arg in args){
		        that.cfg[arg] = args[arg];
		    }
		}
		
		// Set up the parser functions correctly
		that.parse = function(ts){
			return parse(that,ts);
		};
		that.parseUnix = function(ts){
			return parseUnix(that,ts);
		};
	}(this,args));
	
	/*
	 * Main parser function; USAGE:
	 * BeyondJSInstance.parse(timestamp);
	 * timestamp(mixed): A timestamp to parse
	 */
	var parse =  (function(that,ts){
		
		// If the timestamp isn't set or is an empty string, return null
		if(ts == null || ts == "") return null;
		
		// If the timestamp is a UNIX timestamp, return a parsed string
		if(!isNaN(ts-0)) return that.parseUnix(ts);
		
		// Try to create a Date object with the timestamp if it's not a UNIX timestamp
		try{
			var d = new Date(ts);
		}catch(e){
			return null;
		}
		
		// If a Date object has been created, return a parsed string using the Date object's UNIX timestamp
		return that.parseUnix(Math.round(d.getTime()/1000));
	});

	
	/*
	 * UNIX timestamp parser function; USAGE:
	 * BeyondJSInstance.parseUnix(timestamp);
	 * timestamp(integer): A UNIX timestamp to parse
	 */
	var parseUnix = (function(that,ts){
		
		// Set present time to timestamp from constructor, or present time if not set
		var now= that.cfg.now || Math.round(new Date().getTime()/1000);
		
		var diff = ts - now;

		// If the difference in time lies in the future and is not allowed, stop running
		if(diff>0 && !that.cfg.future) return null;
		
		// Get the absolute value of the difference in time
		var abs = Math.abs(diff);
		
		// Unit amount (X seconds, X minutes, etc.)
		var str = 0;
		
		// Unit locale string (second, seconds, minute, etc.)
		var end = "";
		
		if (abs>=31536000){
			str = Math.floor(abs/31536000); //years
			end = str>1?"Y":"y";
		}else if (abs>=2678400){
			str = Math.floor(abs/2678400); // months
			end = str>1?"MO":"mo";
		}else if (abs>=604800){
			str = Math.floor(abs/604800); // weeks
			end = str>1?"W":"w";
		}else if (abs>=86400){
			str = Math.floor(abs/86400); // days
			end = str>1?"D":"d";
		}else if (abs>=3600){
			str = Math.floor(abs/3600); // hours
			end = str>1?"H":"h";
		}else if (abs>=60){
			str = Math.floor(abs/60); // minutes
			end = str>1?"M":"m";
		}else if (abs>=1){
			str = Math.floor(abs); // seconds
			end = str>1?"S":"s";
		}
		
		// If the time difference is less than a second, return the default string
		if(str==0) return that.cfg.locale["default"];
		
		// Return the string, complete with suffix
		return str + " " + that.cfg.locale[end] + " " + that.cfg.locale[(diff<0?"past":"future")];
		
	});
	
});