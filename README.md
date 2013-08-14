http://kalmanolah.github.com/Beyond.JS
-

Beyond.JS v1.0.1, by Kalman Olah (http://kalmanolah.net)

Beyond.JS is a simple Javascript library intended for the conversion of absolute timestamps
into relative timestamps. It was created as a lightweight alternative for similar libraries,
but without the need for jQuery.
 
Beyond.JS © Kalman Olah 2013

This script is free for both personal and commercial use.

Usage
-

First, include the script in your page head or body

	<script src="js/beyond.min.js"></script>

Next, proceed to create your Beyond.JS instance

```javascript
	BJSInstance = new BeyondJS();
```
	
Or with a custom configuration...

```javascript
	BJSInstance = new BeyondJS({ "future": true, "now": +new Date().getTime() - 86400 });
```

Finally, proceed to parse your timestamps!

```javascript
	// UNIX timestamp
	var parsed = BJSInstance.parse(1360827501);
	// ISO timestamp
	var parsed = BJSInstance.parse('2013-01-31T07:40:22.105Z');
	// UTC timestamp
	var parsed = BJSInstance.parse('Thu, 31 Jan 2013 07:42:11 GMT');
```
