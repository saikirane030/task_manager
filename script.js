let tasks = [];
let showApp = false;

function startApp() {
  document.getElementById('landingPage').style.display = 'none';
  document.getElementById('taskApp').style.display = 'block';
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const categoryInput = document.getElementById('categoryInput');
  const task = taskInput.value.trim();
  if (!task) return;
  tasks.push({
    text: task,
    date: dateInput.value,
    time: timeInput.value,
    category: categoryInput.value,
    completed: false
  });
  taskInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  const search = document.getElementById('searchInput').value.toLowerCase();
  const filter = document.getElementById('filterInput').value;
  list.innerHTML = '';
  let filtered = tasks.filter(t => t.text.toLowerCase().includes(search));
  if (filter === 'completed') filtered = filtered.filter(t => t.completed);
  if (filter === 'pending') filtered = filtered.filter(t => !t.completed);
  filtered.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = t.completed ? 'completed' : '';
    li.innerHTML = `<span onclick="toggleTask(${i})">${t.text} (${t.category}${t.date ? ', ' + t.date : ''}${t.time ? ', ' + t.time : ''})</span> <button onclick="deleteTask(${i})">Delete</button>`;
    list.appendChild(li);
  });
  updateProgress();
}

function toggleTask(i) {
  tasks[i].completed = !tasks[i].completed;
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  renderTasks();
}

function updateProgress() {
  const progress = document.getElementById('progress');
  if (!tasks.length) {
    progress.textContent = '';
    return;
  }
  const completed = tasks.filter(t => t.completed).length;
  progress.textContent = `Completed: ${completed} / ${tasks.length}`;
}

window.onload = function() {
  document.getElementById('taskApp').style.display = 'none';
  renderTasks();
  document.getElementById('searchInput').addEventListener('input', renderTasks);
};
