// Variables to store points and level
let totalPoints = 0;
let currentLevel = 'Beginner';
const pointsPerTask = 10;
const pointsForNextLevel = 100;  // Points needed to reach the next level
let taskList = [];  // Array to hold the task list

// HTML elements
const pointsDisplay = document.getElementById('points-display');
const progressBarFill = document.getElementById('progress-bar-fill');
const levelDisplay = document.getElementById('level-display');
const badgeDisplay = document.getElementById('badge-display');
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskListElement = document.getElementById('tasks');
const resetButton = document.getElementById('reset-button');

// Badge logic
let streak = 0;

// Function to add a new task
function addTask(taskName) {
    const newTask = { name: taskName, completed: false };
    taskList.push(newTask);
    renderTasks();
}

// Function to render the task list
function renderTasks() {
    taskListElement.innerHTML = '';  // Clear current tasks
    taskList.forEach((task, index) => {
        const taskItem = document.createElement('li');
        const taskText = document.createTextNode(task.name);
        const pointsSpan = document.createElement('span');
        pointsSpan.classList.add('points');
        pointsSpan.textContent = `(10 pts)`;

        // Task Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(index));

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(pointsSpan);

        taskListElement.appendChild(taskItem);
    });
}

// Function to toggle task completion
function toggleTaskCompletion(taskIndex) {
    const task = taskList[taskIndex];
    task.completed = !task.completed;
    if (task.completed) {
        updatePoints();
        streak++;
        checkStreakBadge();
    } else {
        totalPoints -= pointsPerTask;  // Deduct points if unchecked
        pointsDisplay.textContent = `Total Points: ${totalPoints}`;
        updateProgressBar();
        streak = 0;  // Reset streak on task uncheck
    }
}

// Function to update points with animation
function updatePoints() {
    totalPoints += pointsPerTask;

    // Add animation for point increase
    pointsDisplay.classList.add('points-update');
    setTimeout(() => pointsDisplay.classList.remove('points-update'), 500);

    pointsDisplay.textContent = `Total Points: ${totalPoints}`;
    updateProgressBar();
    updateLevel();
}

// Function to update progress bar
function updateProgressBar() {
    const progressPercentage = (totalPoints % pointsForNextLevel) / pointsForNextLevel * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
}

// Function to update level
function updateLevel() {
    if (totalPoints >= 100) {
        currentLevel = 'Intermediate';
    } else if (totalPoints >= 200) {
        currentLevel = 'Advanced';
    } else if (totalPoints >= 300) {
        currentLevel = 'Expert';
    }
    levelDisplay.textContent = `Level: ${currentLevel}`;
}

// Check for streak badges
function checkStreakBadge() {
    if (streak >= 5) {
        badgeDisplay.textContent = '🎖️ Streak Master Badge!';
    }
}

// Reset Functionality
function resetProgress() {
    taskList = [];
    totalPoints = 0;
    streak = 0;
    currentLevel = 'Beginner';

    // Clear UI Elements
    taskListElement.innerHTML = '';
    pointsDisplay.textContent = 'Total Points: 0';
    levelDisplay.textContent = 'Level: Beginner';
    badgeDisplay.textContent = '';
    progressBarFill.style.width = '0';

    console.log('Progress Reset!');
}

// Add event listener to "Add Task" button
addTaskButton.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
        addTask(taskName);
        taskInput.value = '';  // Clear input field
    }
});

// Add event listener to "Reset" button
resetButton.addEventListener('click', resetProgress);
