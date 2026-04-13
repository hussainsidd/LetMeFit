document.addEventListener('DOMContentLoaded', () => {
  const fitnessForm = document.getElementById('fitness-form');
  const activityList = document.getElementById('activity-list');
  const totalBurnedEl = document.getElementById('total-burned');
  const errorEl = document.getElementById('fitness-error');

  const MET_VALUES = {
    'Walking': 3.5,
    'Running': 9,
    'Cycling': 7,
    'Gym': 5,
    'Swimming': 8,
    'Other': 4
  };

  function calculateCalories(type, duration) {
    const met = MET_VALUES[type] || 4;
    const calories = (met * 3.5 * 70) / 200 * duration;
    return Math.round(calories);
  }

  function renderActivities() {
    const today = getTodayDate();
    const activities = getActivities(today);
    
    activityList.innerHTML = '';

    if (activities.length === 0) {
      activityList.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem 0;">No activities logged yet for today.</p>';
      totalBurnedEl.textContent = '0';
      return;
    }

    let total = 0;

    activities.forEach(activity => {
      total += activity.caloriesBurned;

      const item = document.createElement('div');
      item.className = 'list-item';
      item.innerHTML = `
        <div>
          <strong>${activity.name}</strong>
          <div style="font-size: 0.85rem; color: #666;">${activity.type} &bull; ${activity.duration} mins</div>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="font-weight: 600; color: #ff5722;">${activity.caloriesBurned} kcal</div>
          <button class="delete-btn" data-id="${activity.id}" aria-label="Delete Activity">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      activityList.appendChild(item);
    });

    totalBurnedEl.textContent = total;

    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        deleteActivity(id);
      });
    });
  }

  function deleteActivity(id) {
    const activities = JSON.parse(localStorage.getItem('letmefit_activities') || '[]');
    const updatedActivities = activities.filter(a => a.id !== id);
    localStorage.setItem('letmefit_activities', JSON.stringify(updatedActivities));
    renderActivities();
  }

  fitnessForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('workout-name').value.trim();
    const typeInput = document.getElementById('activity-type').value;
    const durationInputValue = document.getElementById('duration').value;
    const durationInput = parseInt(durationInputValue, 10);

    // Validation
    if (!nameInput || !typeInput || !durationInputValue) {
      if (errorEl) {
        errorEl.textContent = 'Please fill out all fields.';
        errorEl.classList.add('show');
      } else {
        alert('Please fill out all fields.');
      }
      return;
    }
    
    if (isNaN(durationInput) || durationInput <= 0) {
      if (errorEl) {
        errorEl.textContent = 'Please enter a valid positive number for duration.';
        errorEl.classList.add('show');
      } else {
        alert('Please enter a valid positive number for duration.');
      }
      return;
    }

    // Clear Error on Success
    if (errorEl) {
      errorEl.classList.remove('show');
      errorEl.textContent = '';
    }

    const estimatedCalories = calculateCalories(typeInput, durationInput);

    const newActivity = {
      id: Date.now().toString(),
      name: nameInput,
      type: typeInput,
      duration: durationInput,
      caloriesBurned: estimatedCalories,
      date: getTodayDate()
    };

    saveActivity(newActivity);
    
    fitnessForm.reset();
    document.getElementById('workout-name').focus();
    renderActivities();
  });

  renderActivities();
});
