// Automatically set current date in the "Age at the Date of" field
window.onload = function() {
    const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
    document.getElementById('calcDate').value = today;     // Set the current date by default
};

function calculateAge() {
    const dobInput = document.getElementById("dob").value;
    const calcDateInput = document.getElementById("calcDate").value;

    // Ensure both date inputs are filled
    if (!dobInput || !calcDateInput) {
        alert("Please select both dates!");
        return;
    }

    const dob = new Date(dobInput);
    const calcDate = new Date(calcDateInput);

    // Ensure the date of birth is before the calculation date
    if (dob > calcDate) {
        alert("Date of Birth should be before the Age at the Date of!");
        return;
    }

    const diff = calcDate - dob;

    // Calculate years, months, and days
    let ageYears = calcDate.getFullYear() - dob.getFullYear();
    let ageMonths = calcDate.getMonth() - dob.getMonth();
    let ageDays = calcDate.getDate() - dob.getDate();

    // Adjust if day or month is negative
    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(calcDate.getFullYear(), calcDate.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Calculate the total difference in other units of time
    const totalMonths = ageYears * 12 + ageMonths;
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalSeconds = Math.floor(diff / 1000);

    // Display the results
    document.getElementById("age").innerHTML = `${ageYears} years ${ageMonths} months ${ageDays} days`;
    document.getElementById("months").innerHTML = `${totalMonths} months ${totalDays % 30} days`;
    document.getElementById("weeks").innerHTML = `${totalWeeks} weeks ${totalDays % 7} days`;
    document.getElementById("days").innerHTML = `${totalDays} days`;
    document.getElementById("hours").innerHTML = `${totalHours} hours`;
    document.getElementById("minutes").innerHTML = `${totalMinutes} minutes`;
    document.getElementById("seconds").innerHTML = `${totalSeconds} seconds`;

    // Show the result section after calculation
    document.getElementById('result-section').style.visibility = "visible";
}
