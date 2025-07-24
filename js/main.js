const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", function() {
	const savedFormData = localStorage.getItem('userProfile');
	if (savedFormData) {
		console.log("Loaded profile: ", JSON.parse(savedFormData));
	}
});

form.addEventListener('submit', function(event){
	event.preventDefault();
	const formData = new FormData(form);
	const dataObject = Object.fromEntries(formData);
	localStorage.setItem('userProfile', JSON.stringify(dataObject));
	form.reset();
});