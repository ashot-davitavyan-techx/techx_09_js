const form = document.getElementById("form");
const cookieConsent = document.getElementById("cookie-consent");
const mainContent = document.getElementById("main");

document.addEventListener("DOMContentLoaded", function() {
	const savedFormData = localStorage.getItem('userProfile');
	const savedNotes = sessionStorage.getItem('userNote');
	const cookieConsentValue = getCookieConsent();

	if (savedFormData) {
		console.log("Loaded profile: ", JSON.parse(savedFormData));
	}
	if (savedNotes) {
		noteInput.value = savedNotes;
	}
	if (!cookieConsentValue || cookieConsentValue != "true") {
		setTimeout(() => {
			cookieConsent.style.display = "flex";
			mainContent.classList.add("blurred");
		}, 1000)
	}
});

//-----------------------Task1---------------------//

form.addEventListener('submit', function(event){
	event.preventDefault();
	const formData = new FormData(form);
	const dataObject = Object.fromEntries(formData);
	localStorage.setItem('userProfile', JSON.stringify(dataObject));
	form.reset();
});


//----------------------Task2------------------------//
const noteButton = document.getElementById("note-save-button");
const noteInput = document.getElementById("notes");

noteButton.addEventListener("click", function(){
	console.log(noteInput.value);
	sessionStorage.setItem('userNote', noteInput.value);
});

//---------------------Task3------------------------//
const cookieAcceptButton = document.getElementById("cookie-button-accept");
const cookieDenyButton = document.getElementById("cookie-button-deny");

function getCookieConsent() {
	return (document.cookie
	.split("; ")
	.find((row) => row.startsWith("consent="))
	?.split("=")[1]);
}

function hadnleCookieConsent(choice){
	cookieConsent.style.display = "none";
	mainContent.classList.remove("blurred");
	let date = new Date(Date.now() + 86400e3*7);
	if (choice){
		document.cookie = "consent=true; expires=" + date;

	}
}

cookieAcceptButton.addEventListener("click", function(){
	hadnleCookieConsent(true);
});

cookieDenyButton.addEventListener("click", function(){
	hadnleCookieConsent(false);
});

//-------------------Task4--------------------------//

const clearStorageButton = document.getElementById("clear-storage-button");

function deleteAllCookies(){
	let cookieKey;

	for (const cookie of document.cookie.split("; ")){
		cookieKey = cookie.split("=")[0];
		if (cookieKey)
			document.cookie = cookieKey + "=; expires=Thu, 03 Sep 2003 00:00:00 UTC"
	}
}

clearStorageButton.addEventListener("click", function(){
	localStorage.clear();
	sessionStorage.clear();
	deleteAllCookies();
	console.log("All Storage Cleared!");
});

//-------------------------Task5----------------------------//

const getJokeButton = document.getElementById("get-joke-button");
const jokeDisplay = document.getElementById("joke-display");

getJokeButton.addEventListener("click", async function(){
	try {
		const response = await fetch("https://icanhazdadjoke.com/", {
			headers: {
				"Accept": "application/json"
			}
		});
		const data = await response.json();
		if (!response.ok)
			throw new error("");
		jokeDisplay.innerText = data.joke;
	} catch (error) {
		jokeDisplay.innerText = "Failed to fetch joke";
	}
});


//-------------------------Task6--------------------------//

const startCountdownButton = document.getElementById("start-countdown-button");
const countdownDisplay = document.getElementById("countdown-display");
startCountdownButton.addEventListener("click", function(){
	for (let i = 5; i >= 0; i--) {
		setTimeout(() => {
			countdownDisplay.innerText = i == 0 ? "Go!" : i;
		}, (5-i) * 1000);
	}
});

//------------------------Task7---------------------------//

const startTickingButton = document.getElementById("start-ticking-button");
const stopTickingButton = document.getElementById("stop-ticking-button");
const clearTicksButton = document.getElementById("clear-ticks-button");
const tickDisplay = document.getElementById("tick-display");
let intervalId;

startTickingButton.addEventListener("click", function(){
	intervalId = setInterval(() => {
		tickDisplay.innerText += "Tick...";
	}, 1000);
});

stopTickingButton.addEventListener("click", function(){
	clearInterval(intervalId);
});

clearTicksButton.addEventListener("click", function(){
	tickDisplay.innerText = "";
});