export function timeFromNow(time) {

	// Get timestamps
	let unixTime = new Date(time).getTime();
	if (!unixTime) return;
	let now = new Date().getTime();

	// Calculate difference
	let difference = (unixTime / 1000) - (now / 1000);

	// Setup return object
	let tfn = {};

	// Check if time is in the past, present, or future
	tfn.when = 'now';
	if (difference > 0) {
		tfn.when = 'future';
	} else if (difference < -1) {
		tfn.when = 'past';
	}

	// Convert difference to absolute
	difference = Math.abs(difference);

	// Calculate time unit
	if (difference / (60 * 60 * 24 * 365) > 1) {
		// Years
		tfn.unitOfTime = 'years';
		tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
	} else if (difference / (60 * 60 * 24 * 45) > 1) {
		// Months
		tfn.unitOfTime = 'months';
		tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
	} else if (difference / (60 * 60 * 24) > 1) {
		// Days
		tfn.unitOfTime = 'days';
		tfn.time = Math.floor(difference / (60 * 60 * 24));
	} else if (difference / (60 * 60) > 1) {
		// Hours
		tfn.unitOfTime = 'hours';
		tfn.time = Math.floor(difference / (60 * 60));
	} else {
		// Seconds
		tfn.unitOfTime = 'seconds';
		tfn.time = Math.floor(difference);
	}

	// Return time from now data
	return `${tfn.when === 'past' ? `${tfn.time} ${tfn.unitOfTime} ago` : `in ${tfn.time} ${tfn.time === 1 ? 'day' : tfn.unitOfTime}`}`;

};

export function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	console.log(re.test(email))
    return re.test(email);
}

export function validatePhone(phone) {
	var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	var phoneNumAlt = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
	console.log(phoneno.test(phone) || phoneNumAlt.test(phone))
    return (phoneno.test(phone) || phoneNumAlt.test(phone));
}

export function validateRequiredFields(contact, email, workPhone, mobilePhone, twitterId) {
	return contact && (email || workPhone || mobilePhone || twitterId)
}
