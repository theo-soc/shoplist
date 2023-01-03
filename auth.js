const xhr = new XMLHttpRequest();
xhr.open("POST", "aws.sasa");
const body = JSON.stringify({
	username: "Tsokratous",
	first_name: "Theodoros",
	last_name: "Sokratous",
	email: "teo.sokratous@gmail.com",
	password: "ts1234" 
});
xhr.onload = () => {
	if (xhr.readyState == 4 && xhr.status == 201) {
		console.log(JSON.parse(xhr.responseText));
	}else {
		console.log("error: ${xhr.status}");
	}
};
xhr.send(body);

	