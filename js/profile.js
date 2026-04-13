document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const ind1 = document.getElementById('ind-1');
  const ind2 = document.getElementById('ind-2');
  const ind3 = document.getElementById('ind-3');
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  const errEl = document.getElementById('setup-error');

  const btnToStep2 = document.getElementById('btn-to-step2');
  const btnBack1 = document.getElementById('btn-back-1');
  const btnToStep3 = document.getElementById('btn-to-step3');
  const btnBack2 = document.getElementById('btn-back-2');
  const btnSave = document.getElementById('btn-save-profile');

  // Step 1 Input Elements
  const ageIn = document.getElementById('prof-age');
  const genderIn = document.getElementById('prof-gender');
  const heightIn = document.getElementById('prof-height');
  const weightIn = document.getElementById('prof-weight');
  const activityIn = document.getElementById('prof-activity');

  let userProfile = {};

  // Form Validation & Step 1 -> 2 Math Logic
  btnToStep2.addEventListener('click', () => {
    const age = parseInt(ageIn.value, 10);
    const h = parseInt(heightIn.value, 10);
    const w = parseInt(weightIn.value, 10);
    const gender = genderIn.value;
    const activityMult = parseFloat(activityIn.value);

    // Validate inputs
    if (isNaN(age) || isNaN(h) || isNaN(w)) {
      errEl.textContent = "Please fill out all fields with valid numbers.";
      errEl.classList.add('show');
      return;
    }
    if (age < 10 || h < 100 || w < 30) {
      errEl.textContent = "Please check your inputs (must be realistic height/weight/age targets).";
      errEl.classList.add('show');
      return;
    }

    errEl.classList.remove('show');

    // BMI Calculation
    const height_m = h / 100;
    const bmi = w / (height_m * height_m);
    
    // BMR Calculation (Mifflin-St Jeor)
    let bmr = (10 * w) + (6.25 * h) - (5 * age);
    bmr += (gender === 'Male') ? 5 : -161;

    // TDEE
    const tdee = Math.round(bmr * activityMult);

    userProfile = {
      age, gender, height: h, weight: w, activityMult,
      bmi: Number(bmi.toFixed(1)),
      bmr: Math.round(bmr),
      tdee
    };

    populateStep2();
    
    // Wizard Transition
    step1.classList.remove('active');
    ind1.classList.remove('active');
    step2.classList.add('active');
    ind2.classList.add('active');
  });

  // Step 2 Visual Populator Map
  function populateStep2() {
    document.getElementById('res-bmi').textContent = userProfile.bmi;
    document.getElementById('res-bmr').textContent = userProfile.bmr;
    document.getElementById('res-tdee').textContent = userProfile.tdee;
    
    const badge = document.getElementById('res-bmi-badge');
    const msg = document.getElementById('bmi-context-msg');
    const needle = document.getElementById('bmi-needle');

    let category = "Normal";
    let color = "#4caf50";
    if (userProfile.bmi < 18.5) {
      category = "Underweight";
      color = "#2196f3";
      msg.textContent = "Your BMI indicates you are underweight. A targeted lean bulk could be highly beneficial here.";
    } else if (userProfile.bmi < 25) {
      category = "Normal";
      msg.textContent = "You're in a great, healthy range! Focus on maintaining weight or building lean muscle.";
    } else if (userProfile.bmi < 30) {
      category = "Overweight";
      color = "#ff9800";
      msg.textContent = "Your BMI indicates slight overweight. Opting for a slow, sustainable fat loss goal would be perfect.";
    } else {
      category = "Obese";
      color = "#f44336";
      msg.textContent = "Your focus should be on steady, sustainable weight loss.";
    }

    badge.textContent = category;
    badge.style.color = color;
    document.getElementById('res-bmi').style.color = color;

    // Scales practical BMI metrics (10 base to roughly 40 scale max difference) to UI percent positioning
    let pos = ((userProfile.bmi - 10) / 30) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    // Animate smoothly after DOM loads the view
    setTimeout(() => {
      needle.style.left = `${pos}%`;
    }, 100);
  }

  btnBack1.addEventListener('click', () => {
    step2.classList.remove('active');
    ind2.classList.remove('active');
    step1.classList.add('active');
    ind1.classList.add('active');
  });

  // Step 2 -> Step 3 Validation Gate
  btnToStep3.addEventListener('click', () => {
    populateStep3();
    step2.classList.remove('active');
    ind2.classList.remove('active');
    step3.classList.add('active');
    ind3.classList.add('active');
  });

  btnBack2.addEventListener('click', () => {
    step3.classList.remove('active');
    ind3.classList.remove('active');
    step2.classList.add('active');
    ind2.classList.add('active');
  });

  // Step 3 Data Binder
  function populateStep3() {
    document.getElementById('goal-tdee-display').textContent = userProfile.tdee;
    const grid = document.getElementById('goal-grid');
    grid.innerHTML = '';

    const goals = [
      { id: "lose_fast", title: "Lose weight (fast)", cal: userProfile.tdee - 500, desc: "~0.5kg/week loss" },
      { id: "lose_slow", title: "Lose weight (slow)", cal: userProfile.tdee - 250, desc: "~0.25kg/week, sustainable" },
      { id: "maintain", title: "Maintain weight", cal: userProfile.tdee, desc: "Maintain current weight" },
      { id: "muscle", title: "Gain muscle", cal: userProfile.tdee + 300, desc: "Lean bulk with training" }
    ];

    goals.forEach(g => {
      const card = document.createElement('div');
      card.className = 'goal-card';
      card.innerHTML = `
        <h4>${g.title}</h4>
        <p style="font-size: 0.85rem; color:#666; margin-bottom: 0.5rem;">${g.desc}</p>
        <div style="font-size: 1.3rem; font-weight: 700; color: var(--primary-color);">${g.cal} kcal</div>
      `;
      
      card.addEventListener('click', () => {
        // Enforce specific goal selections across CSS classes logically
        document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        userProfile.selectedGoal = { id: g.id, title: g.title, calories: g.cal };
        
        const b = document.getElementById('goal-info-box');
        b.style.display = 'block';
        b.innerHTML = `<strong>Selected:</strong> You chose <strong>${g.title}</strong>! We will assign your daily calorie target automatically to precisely <strong>${g.cal}</strong> kcal.`;

        btnSave.disabled = false;
        btnSave.style.opacity = 1;
      });
      grid.appendChild(card);
    });
  }

  // Final Submit
  btnSave.addEventListener('click', () => {
    saveUserProfile(userProfile);
    window.location.href = "dashboard.html";
  });
});
