// Get the form and the submit button
const form = document.getElementById('payment-form');
const submitButton = form.querySelector('button[type="submit"]');

// Add an event listener to the form's submit event
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Check if all form fields are filled out
    const formFields = form.querySelectorAll('input, textarea');
    const allFieldsFilled = Array.from(formFields).every(field => field.value.trim() !== '');

    if (allFieldsFilled) {
        // Get the form values
        const accountNumber = document.getElementById('account-number').value;
        const accountName = document.getElementById('account-name').value;
        const description = document.getElementById('description').value;
        const amountInput = document.getElementById('amount');
        const amountValue = amountInput.value.replace(/,/g, '');
        const amount = parseFloat(amountValue);

        // Format the amount with commas and decimal places
        const formattedAmount = amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Generate a random payment ID
        const paymentId = Math.floor(100000000000000000 + Math.random() * 900000000000000000);

        // Update the popup details
        const popupDetails = document.getElementById('popup-details');
        popupDetails.innerHTML = `
            <p><b>Paid on:</b> <span id="dateTimeDisplay"></span></p>
            <p><b>Sender</b>: LANGSTAN-XYZ-3827</p>
            <p><b>Beneficiary Name</b>: ${accountName}</p>
            <p><b>Account Number</b>: ${accountNumber}</p>
            <p><b>Amount:</b> ${formattedAmount}</p>
            <p><b>Payment ID</b>: ${paymentId}</p>
            <p><b>Payment Description</b>: ${description}</p>
        `;

        // Display the date and time
        showDateTime();

        // Show the popup
        const popupContainer = document.querySelector('.popup-container');
        popupContainer.style.display = 'flex';

        // Save the form data in local storage
        localStorage.setItem('formData', JSON.stringify({
            accountNumber,
            accountName,
            description,
            amount: formattedAmount,
            paymentId
        }));

        // Add the event listener to the "View PDF" button
        const goToReceiptButton = document.getElementById('go-to-receipt');
        goToReceiptButton.addEventListener('click', () => {
            // Redirect the user to the receipt page
            window.location.href = 'pdfFT.html';
        });
    } else {
        alert('Please fill out all the fields.');
    }
});

// Get the "OK" button inside the popup
const okButton = document.querySelector('.popup button');

// Add an event listener to the "OK" button
okButton.addEventListener('click', () => {
    // Hide the popup container
    const popupContainer = document.querySelector('.popup-container');
    popupContainer.style.display = 'none';

    // Clear the form fields
    form.reset();
});

// Function to display the date and time
function showDateTime() {
    const currentDateTime = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const dateTimeString = currentDateTime.toLocaleString('en-US', options);
    document.getElementById("dateTimeDisplay").textContent = dateTimeString;
}