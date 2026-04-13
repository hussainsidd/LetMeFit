document.addEventListener('DOMContentLoaded', () => {
  const displayDateEl = document.getElementById('display-date');
  const statConsumedEl = document.getElementById('stat-consumed');
  const statBurnedEl = document.getElementById('stat-burned');
  const statNetEl = document.getElementById('stat-net');
  const statGoalEl = document.getElementById('stat-goal');
  const mealBreakdownEl = document.getElementById('meal-breakdown');
  const activityLogEl = document.getElementById('activity-log');
  const motivationEl = document.getElementById('motivational-message');
  
  const DAILY_GOAL = 2000;

  function initDashboard() {
    const today = getTodayDate();
    
    // Format date nicely (e.g., Apr 13, 2026)
    const dateObj = new Date();
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    displayDateEl.textContent = dateObj.toLocaleDateString(undefined, options);

    const meals = getMeals(today);
    const activities = getActivities(today);

    // 1. Calculate stats
    let totalConsumed = 0;
    const mealBreakdown = { 'Breakfast': 0, 'Lunch': 0, 'Dinner': 0, 'Snack': 0 };
    
    meals.forEach(meal => {
      totalConsumed += meal.calories;
      if (mealBreakdown[meal.mealType] !== undefined) {
        mealBreakdown[meal.mealType] += meal.calories;
      }
    });

    let totalBurned = 0;
    activities.forEach(activity => {
      totalBurned += activity.caloriesBurned;
    });

    const netCalories = totalConsumed - totalBurned;

    // 2. Update stat cards
    statConsumedEl.textContent = totalConsumed;
    statBurnedEl.textContent = totalBurned;
    statNetEl.textContent = netCalories;
    
    // Status Logic
    if (netCalories > DAILY_GOAL) {
      statGoalEl.textContent = 'Over Goal';
      statGoalEl.style.color = '#f44336'; // Red
      statNetEl.style.color = '#f44336';
      
      motivationEl.textContent = "You're slightly over your net calorie goal for today! Try to log a quick workout if you can, or aim for a lighter meal next time!";
      motivationEl.style.backgroundColor = '#ffebee';
      motivationEl.style.color = '#c62828';
    } else {
      const remaining = DAILY_GOAL - netCalories;
      statGoalEl.textContent = 'Under Goal';
      statGoalEl.style.color = 'var(--primary-color)';
      
      if (totalConsumed === 0 && totalBurned === 0) {
         motivationEl.textContent = "Welcome! You haven't logged anything today yet. Start logging meals or workouts to see your progress.";
         motivationEl.style.backgroundColor = '#f5f5f5';
         motivationEl.style.color = '#424242';
      } else {
         motivationEl.textContent = `Great job! You're under your daily goal and have ${remaining} kcal to spare. Keep up the good work!`;
         motivationEl.style.backgroundColor = '#e8f5e9';
         motivationEl.style.color = '#2e7d32';
      }
    }

    // 3. Render Meal Breakdown
    mealBreakdownEl.innerHTML = '';
    
    let maxMealCalories = Math.max(...Object.values(mealBreakdown));
    if (maxMealCalories === 0) maxMealCalories = 1; // Prevent dividing by 0

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    let hasMeals = false;
    
    mealTypes.forEach(type => {
      const cal = mealBreakdown[type];
      if (cal > 0) hasMeals = true;
      const pct = (cal / maxMealCalories) * 100;
      
      const item = document.createElement('div');
      item.className = 'breakdown-item';
      item.innerHTML = `
        <div style="width: 80px; font-weight: 500;">${type}</div>
        <div class="breakdown-bar-bg">
          <div class="breakdown-bar-fill" style="width: ${cal > 0 ? pct : 0}%;"></div>
        </div>
        <div style="width: 60px; text-align: right; font-weight: 600;">${cal}</div>
      `;
      mealBreakdownEl.appendChild(item);
    });

    if (!hasMeals) {
      mealBreakdownEl.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem 0;">No meals logged today.</p>';
    }

    // 4. Render Activity Log
    activityLogEl.innerHTML = '';
    if (activities.length === 0) {
      activityLogEl.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem 0;">No activities logged today.</p>';
    } else {
      activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
          <div>
            <strong>${activity.name}</strong>
            <div style="font-size: 0.85rem; color: #666;">${activity.type} &bull; ${activity.duration} mins</div>
          </div>
          <div style="font-weight: 600; color: #ff5722;">${activity.caloriesBurned} kcal</div>
        `;
        activityLogEl.appendChild(item);
      });
    }
  }

  initDashboard();
});
