import srvAddr from "./../data/srv";

function sendLocation() {
	if ("geolocation" in navigator) {
		// Fetch and submit coordinates
		navigator.geolocation.getCurrentPosition(position => {
			const data = {
				latt: position.coords.latitude.toString(),
				longt: position.coords.longitude.toString()
			};
			console.log(JSON.stringify(data));
			fetch(srvAddr + "/location", {
				method: "POST",
				headers: {"Content-type": "application/json; charset=UTF-8"},
				credentials: "include",
				body: JSON.stringify(data)
			}).then(async res => {
				if (!res.ok) {
					console.log("Request failed:", await res.text());
				}
			}).catch(err => {
				console.log("Request failed:", err);
			});
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

export default sendLocation;