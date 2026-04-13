// LocalStorage helpers for LetMeFit app

const MEALS_KEY = "letmefit_meals";
const ACTIVITIES_KEY = "letmefit_activities";
const GOAL_KEY = "letmefit_goal";
const PROFILE_KEY = "letmefit_profile";

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

function saveMeal(meal) {
  const meals = _getAll(MEALS_KEY);
  meals.push(meal);
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
}

function getMeals(date) {
  const meals = _getAll(MEALS_KEY);
  return meals.filter(m => m.date === date);
}

function saveActivity(activity) {
  const activities = _getAll(ACTIVITIES_KEY);
  activities.push(activity);
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
}

function getActivities(date) {
  const activities = _getAll(ACTIVITIES_KEY);
  return activities.filter(a => a.date === date);
}

function clearDay(date) {
  const meals = _getAll(MEALS_KEY);
  const updatedMeals = meals.filter(m => m.date !== date);
  localStorage.setItem(MEALS_KEY, JSON.stringify(updatedMeals));

  const activities = _getAll(ACTIVITIES_KEY);
  const updatedActivities = activities.filter(a => a.date !== date);
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updatedActivities));
}

/**
 * Gets entire JSON User Profile
 */
function getUserProfile() {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error parsing user profile", e);
    return null;
  }
}

/**
 * Overwrites entire JSON User Profile
 */
function saveUserProfile(profileObj) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profileObj));
}

/**
 * Reads from Profile explicitly if it exists, otherwise falls back natively
 */
function getGoal() {
  const profile = getUserProfile();
  if (profile && profile.selectedGoal && profile.selectedGoal.calories) {
    return profile.selectedGoal.calories;
  }
  const fallback = localStorage.getItem(GOAL_KEY);
  return fallback ? parseInt(fallback, 10) : 2000;
}

/**
 * Writes to Profile directly instead of creating split goal definitions
 */
function saveGoal(amount) {
  const profile = getUserProfile();
  if (profile && profile.selectedGoal) {
    profile.selectedGoal.calories = amount;
    saveUserProfile(profile);
  } else {
    localStorage.setItem(GOAL_KEY, amount.toString());
  }
}
