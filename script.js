let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function startApp() {
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("taskApp").style.display = "block";
  renderTasks();
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;
  const category = document.getElementById("categoryInput").value;
  if (text === "") return alert("Enter a task!");
  tasks.push({ text, date, category, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filter = document.getElementById("filterInput").value;
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  let completedCount = 0;
  tasks.forEach((task, i) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;
    if (!task.text.toLowerCase().includes(search)) return;
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>
        ${task.text} 
        <small>(${task.category}, ${task.date || "No deadline"})</small>
      </span>
      <button onclick="toggleTask(${i})">
        ${task.completed ? "Undo" : "Done"}
      </button>
    `;
    taskList.appendChild(li);
    if (task.completed) completedCount++;
  });
  const total = tasks.length;
  const percent = total ? Math.round((completedCount / total) * 100) : 0;
  document.getElementById("progress").innerHTML = `
    <div class="progress-text">${completedCount} of ${total} tasks completed (${percent}%)</div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${percent}%;"></div>
    </div>
  `;
}