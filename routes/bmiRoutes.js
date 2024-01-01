const express = require('express');
const moment = require('moment');
const path = require('path');
const router = express.Router();

let bmiHistory = [];

router.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '/../views/index.html');
  res.sendFile(indexPath);
});
router.post('/bmicalculator', (req, res) => {
  try {
    const { height, weight, age, gender, unit } = req.body;

    const numericHeight = parseFloat(height);
    const numericWeight = parseFloat(weight);

    if (isNaN(numericHeight) || isNaN(numericWeight)) {
      throw new Error('Invalid height or weight values.');
    }
    let heightInMeters, weightInKg;

    if (unit === 'imperial') {
      heightInMeters = numericHeight * 0.0254;
      weightInKg = numericWeight * 0.453592;
    } else if (unit === 'metric') {
      heightInMeters = numericHeight / 100;
      weightInKg = numericWeight;
    } else {
      throw new Error('Invalid unit specified.');
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    let adjustedBmi = bmi;

    if (gender === 'female') {
      adjustedBmi += 0.4;
    }

    if (age < 18) {
      adjustedBmi -= 0.1;
    } else if (age >= 60) {
      adjustedBmi += 0.2;
    }

    let bmiCategory = 'Normal Weight';
    if (adjustedBmi < 18.5) {
      bmiCategory = 'Underweight';
    } else if (adjustedBmi >= 25) {
      bmiCategory = 'Overweight';
    }

    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    const bmiRecord = { height, weight, age, gender, unit, bmi: adjustedBmi, bmiCategory, timestamp };
    bmiHistory.push(bmiRecord);

    res.status(200).json({ bmi: adjustedBmi, bmiCategory });
  } catch (error) {
    console.error('Error during BMI calculation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/history', (req, res) => {
  res.json(bmiHistory);
});

module.exports = router;
