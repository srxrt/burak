console.log("Signup frontend javascript file");

function validateSignupForm() {
	const memberNick = $(".member-nick").val();
	const memberPassword = $(".member-password").val();
	const confirmPassword = $(".confirm-password").val();
	const memberPhone = $(".member-phone").val();

	if (
		memberNick === "" ||
		memberPassword === "" ||
		memberPhone === "" ||
		memberPassword === "" ||
		confirmPassword === ""
	) {
		alert("Please insert all required inputs!");
		return false;
	}

	if (memberPassword !== confirmPassword) {
		alert("Password does not match!");
		return false;
	}
	return true;
}
