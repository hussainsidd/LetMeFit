// LocalStorage helpers for LetMeFit app

const MEALS_KEY = "letmefit_meals";
const ACTIVITIES_KEY = "letmefit_activities";

/**
 * Returns today's date formatted as "YYYY-MM-DD"
 */
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Safe retrieval from localStorage. Handles parsing and missing data.
 */
function _getAll(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Error parsing localStorage data for key: ${key}`, e);
    return [];
  }
}

/**
 * Saves a meal object to localStorage
 * Expected meal format: {name, calories, mealType, date}
 */
function saveMeal(meal) {
  const meals = _getAll(MEALS_KEY);
  meals.push(meal);
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
}

/**
 * Returns an array of meal objects for a given date ("YYYY-MM-DD")
 */
function getMeals(date) {
  const meals = _getAll(MEALS_KEY);
  return meals.filter(m => m.date === date);
}

/**
 * Saves an activity object to localStorage
 * Expected activity format: {name, duration, caloriesBurned, date}
 */
function saveActivity(activity) {
  const activities = _getAll(ACTIVITIES_KEY);
  activities.push(activity);
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
}

/**
 * Returns an array of activity objects for a given date ("YYYY-MM-DD")
 */
function getActivities(date) {
  const activities = _getAll(ACTIVITIES_KEY);
  return activities.filter(a => a.date === date);
}

/**
 * Removes all meal and activity entries for the given date
 */
function clearDay(date) {
  const meals = _getAll(MEALS_KEY);
  const updatedMeals = meals.filter(m => m.date !== date);
  localStorage.setItem(MEALS_KEY, JSON.stringify(updatedMeals));

  const activities = _getAll(ACTIVITIES_KEY);
  const updatedActivities = activities.filter(a => a.date !== date);
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updatedActivities));
}
