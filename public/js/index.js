document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('bmiForm').addEventListener('submit', function (event) {
	  event.preventDefault();
  
	  const formData = new FormData(document.getElementById('bmiForm'));
  
	  fetch('/bmicalculator', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded', // Set the correct Content-Type
		},
		body: new URLSearchParams(formData).toString(),
	  })
		.then(response => response.json())
		.then(data => {
		  const resultElement = document.getElementById('bmiResultText');
		  resultElement.textContent = `BMI Result: ${data.bmi}, Category: ${data.bmiCategory}`;
		  document.getElementById('bmiResultContainer').style.display = 'block';
		})
		.catch(error => {
		  console.error('Error:', error);
		  const resultElement = document.getElementById('bmiResultText');
		  resultElement.textContent = 'Error calculating BMI. Please check your input.';
		  document.getElementById('bmiResultContainer').style.display = 'block';
		});
	});
  
	document.addEventListener('DOMContentLoaded', function () {
	  fetch('/history')
		.then(response => response.json())
		.then(data => {
		  const bmiHistoryList = document.getElementById('bmiHistory');
		  data.forEach(record => {
			const listItem = document.createElement('li');
			listItem.textContent = `BMI Result: ${record.bmi}, Category: ${record.bmiCategory}, Time: ${record.timestamp}`;
			bmiHistoryList.appendChild(listItem);
		  });
		})
		.catch(error => console.error('Error:', error));
	});
  });
  