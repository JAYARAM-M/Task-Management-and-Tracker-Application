document.addEventListener("DOMContentLoaded", function () {
    const upcomingTaskList = document.getElementById("upcoming-task-list");
    const inProgressTaskList = document.getElementById("in-progress-task-list");
    const completedTaskList = document.getElementById("completed-task-list");
    const newTaskInput = document.getElementById("new-task-input");
    const newTaskTimerInput = document.getElementById("new-task-timer-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const deleteTaskButton = document.getElementById("delete-task-btn");
    const editTaskButton = document.getElementById("edit-task-btn");
    const startTaskButton = document.getElementById("start-task-btn");
    const completeTaskButton = document.getElementById("complete-task-btn");

    let selectedTask = null;
    let isEditing = false;
    let timerInterval = null;

    function createTaskElement(taskText, category, timer) {
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;
        taskItem.dataset.category = category;
        taskItem.dataset.timer = timer;
        return taskItem;
    }

    function addTask(taskText, category, timer) {
        const taskItem = createTaskElement(taskText, category, timer);
        const taskList = getTaskListByCategory(category);
        taskList.appendChild(taskItem);
        newTaskInput.value = "";
        newTaskTimerInput.value = "";
    }

    function startTaskTimer() {
        if (selectedTask) {
            const category = selectedTask.dataset.category;
            if (category === "Upcoming Tasks") {
                selectedTask.dataset.category = "In-Progress Tasks";
                const taskText = selectedTask.textContent;
                const timer = selectedTask.dataset.timer;
                updateTaskDetails(taskText, "In-Progress Tasks", timer);
                const taskList = getTaskListByCategory("In-Progress Tasks");
                taskList.appendChild(selectedTask);

                // Start the timer
                const timerInSeconds = parseInt(timer);
                startTimerCountdown(timerInSeconds);
            }
        }
    }

    function startTimerCountdown(timerInSeconds) {
        let timeRemaining = timerInSeconds;
        updateTimerDisplay(timeRemaining);

        timerInterval = setInterval(function () {
            timeRemaining--;
            updateTimerDisplay(timeRemaining);

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                completeTask();
            }
        }, 1000);
    }

    function updateTimerDisplay(timeRemaining) {
        const timerDisplay = document.getElementById("task-timer");
        timerDisplay.textContent = `Timer: ${timeRemaining}s`;
    }

    function completeTask() {
        if (selectedTask) {
            const category = selectedTask.dataset.category;
            if (category === "In-Progress Tasks") {
                selectedTask.dataset.category = "Completed Tasks";
                const taskText = selectedTask.textContent;
                const timer = "";
                updateTaskDetails(taskText, "Completed Tasks", timer);
                const taskList = getTaskListByCategory("Completed Tasks");
                taskList.appendChild(selectedTask);
            }
        }
    }

    function updateTaskDetails(name, category, timer) {
        document.getElementById("task-name").textContent = `Task Name: ${name}`;
        document.getElementById("task-category").textContent = `Category: ${category}`;
        document.getElementById("task-timer").textContent = `Timer: ${timer}`;
    }

    function getTaskListByCategory(category) {
        switch (category) {
            case "Upcoming Tasks":
                return upcomingTaskList;
            case "In-Progress Tasks":
                return inProgressTaskList;
            case "Completed Tasks":
                return completedTaskList;
            default:
                return upcomingTaskList;
        }
    }

    deleteTaskButton.addEventListener("click", function () {
        if (selectedTask) {
            const category = selectedTask.dataset.category;
            selectedTask.remove();
            selectedTask = null;
            updateTaskDetails("", category, "");
        }
    });

    editTaskButton.addEventListener("click", function () {
        if (selectedTask) {
            if (isEditing) {
                selectedTask.contentEditable = false;
                selectedTask.classList.remove("editing");
            } else {
                selectedTask.contentEditable = true;
                selectedTask.classList.add("editing");
            }
            isEditing = !isEditing;
        }
    });

    completeTaskButton.addEventListener("click", completeTask);

    function selectTask(event) {
        const taskItem = event.target;
        if (taskItem.tagName === "LI") {
            if (selectedTask === taskItem) {
                selectedTask.classList.remove("selected");
                selectedTask = null;
            } else {
                if (selectedTask) {
                    selectedTask.classList.remove("selected");
                }

                taskItem.classList.add("selected");
                selectedTask = taskItem;

                const name = selectedTask.textContent;
                const category = selectedTask.dataset.category;
                const timer = category === "Upcoming Tasks" ? `${selectedTask.dataset.timer}s` : "";
                updateTaskDetails(name, category, timer);
            }
        }
    }

    upcomingTaskList.addEventListener("click", selectTask);
    inProgressTaskList.addEventListener("click", selectTask);
    completedTaskList.addEventListener("click", selectTask);

    addTaskButton.addEventListener("click", function () {
        const taskText = newTaskInput.value.trim();
        const taskTimer = newTaskTimerInput.value.trim();

        if (taskText !== "") {
            addTask(taskText, "Upcoming Tasks", taskTimer);
        }
    });

    newTaskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const taskText = newTaskInput.value.trim();
            const taskTimer = newTaskTimerInput.value.trim();

            if (taskText !== "") {
                addTask(taskText, "Upcoming Tasks", taskTimer);
            }
        }
    });

    startTaskButton.addEventListener("click", startTaskTimer);
});
