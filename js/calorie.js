document.addEventListener('DOMContentLoaded', () => {
  const calorieForm = document.getElementById('calorie-form');
  const mealList = document.getElementById('meal-list');
  const totalCaloriesEl = document.getElementById('total-calories');
  const calorieProgress = document.getElementById('calorie-progress');
  const errorEl = document.getElementById('calorie-error');
  
  // Goal UI elements
  const calorieGoalDisplay = document.getElementById('calorie-goal-display');
  const editGoalBtn = document.getElementById('edit-goal-btn');
  const goalEditContainer = document.getElementById('goal-edit-container');
  const newGoalInput = document.getElementById('new-goal');
  const saveGoalBtn = document.getElementById('save-goal-btn');
  
  let currentGoal = getGoal();

  function updateGoalUI() {
    calorieGoalDisplay.textContent = currentGoal;
    renderMeals(); // Re-render to update the progress bar percentages based on the new goal
  }

  editGoalBtn.addEventListener('click', () => {
    newGoalInput.value = currentGoal;
    goalEditContainer.style.display = goalEditContainer.style.display === 'block' ? 'none' : 'block';
  });

  saveGoalBtn.addEventListener('click', () => {
    const newVal = parseInt(newGoalInput.value, 10);
    if (!isNaN(newVal) && newVal > 0) {
      currentGoal = newVal;
      saveGoal(newVal);
      goalEditContainer.style.display = 'none';
      updateGoalUI();
    } else {
      alert('Please enter a valid positive number for your goal.');
    }
  });

  function renderMeals() {
    const today = getTodayDate();
    const meals = getMeals(today);
    
    mealList.innerHTML = '';

    if (meals.length === 0) {
      mealList.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem 0;">No meals logged yet for today.</p>';
      updateSummary(0);
      return;
    }

    let total = 0;

    meals.forEach(meal => {
      total += meal.calories;

      const item = document.createElement('div');
      item.className = 'list-item';
      item.innerHTML = `
        <div>
          <strong>${meal.name}</strong>
          <div style="font-size: 0.85rem; color: #666;">${meal.mealType}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="font-weight: 600; color: var(--primary-color);">${meal.calories} kcal</div>
          <button class="delete-btn" data-id="${meal.id}" aria-label="Delete Meal">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      mealList.appendChild(item);
    });

    updateSummary(total);

    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        deleteMeal(id);
      });
    });
  }

  function updateSummary(total) {
    totalCaloriesEl.textContent = total;
    let percentage = (total / currentGoal) * 100;
    if (percentage > 100) percentage = 100;
    calorieProgress.style.width = `${percentage}%`;

    if (total > currentGoal) {
      calorieProgress.classList.add('danger');
      totalCaloriesEl.classList.add('text-danger');
    } else {
      calorieProgress.classList.remove('danger');
      totalCaloriesEl.classList.remove('text-danger');
    }
  }

  function deleteMeal(id) {
    const meals = JSON.parse(localStorage.getItem('letmefit_meals') || '[]');
    const updatedMeals = meals.filter(m => m.id !== id);
    localStorage.setItem('letmefit_meals', JSON.stringify(updatedMeals));
    renderMeals();
  }

  calorieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('food-name').value.trim();
    const caloriesInput = document.getElementById('calories').value;
    const mealTypeInput = document.getElementById('meal-type').value;

    if (!nameInput || !caloriesInput || !mealTypeInput) {
      if (errorEl) {
        errorEl.textContent = 'Please fill out all fields.';
        errorEl.classList.add('show');
      } else {
        alert('Please fill out all fields.');
      }
      return;
    }
    
    if (isNaN(caloriesInput) || parseInt(caloriesInput, 10) <= 0) {
      if (errorEl) {
        errorEl.textContent = 'Please enter a valid positive number for calories.';
        errorEl.classList.add('show');
      } else {
        alert('Please enter a valid positive number for calories.');
      }
      return;
    }

    if (errorEl) {
      errorEl.classList.remove('show');
      errorEl.textContent = '';
    }

    const newMeal = {
      id: Date.now().toString(),
      name: nameInput,
      calories: parseInt(caloriesInput, 10),
      mealType: mealTypeInput,
      date: getTodayDate()
    };

    saveMeal(newMeal);
    
    calorieForm.reset();
    document.getElementById('food-name').focus();
    renderMeals();
  });

  // Initialize
  calorieGoalDisplay.textContent = currentGoal;
  renderMeals();
});
