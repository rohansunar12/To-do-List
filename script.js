const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let currentFilter = "all";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  listContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    if (
      (currentFilter === "active" && task.completed) ||
      (currentFilter === "completed" && !task.completed)
    ) {
      return;
    }

    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    span.onclick = () => toggleComplete(index);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.title = "Edit";
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.title = "Delete";
    delBtn.onclick = () => deleteTask(index);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);
    listContainer.appendChild(li);
  });
}

function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  tasks.push({ text: taskText, completed: false });
  inputBox.value = "";
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index].text);
  if (newTask && newTask.trim() !== "") {
    tasks[index].text = newTask.trim();
    saveTasks();
    renderTasks();
  }
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");
  });
  document.getElementById(`filter-${filter}`).classList.add("active");
  renderTasks();
}

// Initialize
renderTasks();
