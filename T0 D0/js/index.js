let goals = JSON.parse(localStorage.getItem('goals')) || [];

const goalForm = document.getElementById('goalForm');
const goalList = document.getElementById('goalList');
const stats = document.getElementById('stats');

function saveGoals() {
  localStorage.setItem('goals', JSON.stringify(goals));
}

function renderGoals() {
  goalList.innerHTML = '';

  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `
      <div>
        <strong style="text-decoration:${goal.done ? 'line-through' : 'none'}">${goal.title}</strong>
        <br>
        <small>${goal.description || ''}</small>
      </div>
      <div>
        <button class="btn btn-sm me-1" onclick="toggleDone(${index})" style="background-color: darkseagreen;">✔</button>
        <button class="btn btn-warning btn-sm me-1" onclick="editGoal(${index})">✏</button>
        <button class="btn btn-danger btn-sm" onclick="deleteGoal(${index})">🗑</button>
      </div>
    `;

    goalList.appendChild(li);
  });

  renderStats();
}

function renderStats() {
  const total = goals.length;
  const done = goals.filter(g => g.done).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  stats.innerHTML = `
    Всего целей: <strong>${total}</strong><br>
    Выполнено: <strong>${done}</strong><br>
    Прогресс: <strong>${percent}%</strong>
    <div class="progress mt-2">
      <div class="progress-bar" style="width:${percent}%"></div>
    </div>
  `;
}

function addGoal(title, description) {
  goals.push({ title, description, done: false });
  saveGoals();
  renderGoals();
}

function deleteGoal(index) {
  if (confirm('Удалить цель?')) {
    goals.splice(index, 1);
    saveGoals();
    renderGoals();
  }
}

function toggleDone(index) {
  goals[index].done = !goals[index].done;
  saveGoals();
  renderGoals();
}

function editGoal(index) {
  const newTitle = prompt('Новое название', goals[index].title);
  if (newTitle !== null) {
    const newDesc = prompt('Новое описание', goals[index].description);
    goals[index].title = newTitle;
    goals[index].description = newDesc;
    saveGoals();
    renderGoals();
  }
}

goalForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title) return;

  addGoal(title, description);
  goalForm.reset();
});

renderGoals();