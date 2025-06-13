var months = [
	"January", "February", "March", "April",
	"May", "June", "July", "August",
	"October", "November", "December"
];

function dateFormat(d) {
	if (!(d instanceof Date)) d = new Date(d);
	return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

module.exports = dateFormat;