# 🥗 LetMeFit 🏃‍♂️

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

**Track Your Calories. Live Better.**  
LetMeFit is a sleek, client-side web application designed to help you easily monitor your nutrition, track your daily workouts, and achieve your health goals. With a focus on simplicity and a beautiful user interface, staying on top of your fitness has never been easier.

## ✨ Features

* **🥗 Calorie Counter & Diet Monitoring**: Easily log your daily meals grouped by Breakfast, Lunch, Dinner, and Snacks.
* **🏃 Fitness Tracking**: Record your daily physical activities and auto-estimate calories burned using standard MET formula calculations.
* **📊 Daily Dashboard**: Visualize your consumed vs. burned calories in a unified, responsive grid complete with interactive progress bars, breakdown statistics, and motivational goal tracking.
* **💾 Local Storage Persistence**: All data is saved directly in your browser without the need for a backend server or a database. 100% private and fast!
* **📱 Responsive Design**: Seamlessly scales and adapts from desktop monitors to mobile phones using CSS Grid and Flexbox.

## 🛠️ Tech Stack

LetMeFit is built with classic, vanilla web technologies:
* **HTML5**: Semantically structured layouts.
* **CSS3**: Custom design tokens, vibrant color palettes, CSS variables, and modern grids. 
* **JavaScript (ES6+)**: DOM manipulation and dynamic math computations.
* **LocalStorage**: Client-side session and data persistence.

## 🚀 How to Run Locally

Because LetMeFit relies entirely on vanilla web technologies and client-side web APIs, there is **zero installation** required. No servers, no npm packages, no dependencies!

1. Clone or download this repository.
2. Navigate to the extracted folder.
3. Simply double-click `index.html` to open it in your default web browser.
4. Start logging!

## 📂 Folder Structure

```text
LetMeFit/
│
├── index.html              # Landing page introducing LetMeFit
├── dashboard.html          # Main hub showing charts, daily summaries, and goals
├── calorie-tracker.html    # Form and list to log meals and food intake
├── fitness-tracker.html    # Form and list to log exercises and MET generation
│
├── css/
│   └── style.css           # Global stylesheet containing layout, typography, and theme
│
└── js/
    ├── app.js              # Handles global interactions like the mobile navigation menu
    ├── storage.js          # Helpers wrapping the localStorage API for clean data pulling
    ├── calorie.js          # Logic bridging the calorie tracker UI and storage
    ├── dashboard.js        # Logic that aggregates user data to dynamically build the dashboard
    └── fitness.js          # Logic bridging the fitness tracker UI and storage
```

## 📸 Screenshots

*(Add your screenshots here by replacing the placeholder links below!)*

| Dashboard Overview | Meal Tracking | Fitness Logging |
|:---:|:---:|:---:|
| <img src="https://via.placeholder.com/400x300?text=Dashboard+Screenshot" alt="Dashboard View"> | <img src="https://via.placeholder.com/400x300?text=Calorie+Screenshot" alt="Calorie Tracker View"> | <img src="https://via.placeholder.com/400x300?text=Fitness+Screenshot" alt="Fitness Tracker View"> |

## 🔮 Future Improvements

While LetMeFit is fully functional and ready to use, here are some ideas for future scaling:
- [ ] Add historical charts (weekly/monthly view) using a visual library like Chart.js.
- [ ] Incorporate an external Nutritional App API for automatically pulling real-world food calorie data.
- [ ] Allow users to enter tracking for specific macronutrients (Proteins, Carbs, Fats).
- [ ] Build user authentication and hook the storage directly to a structured backend (like Node.js / MongoDB Atlas).
- [ ] Enable a "Data Export to CSV" option.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
