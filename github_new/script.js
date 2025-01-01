const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// LocalStorage'dan görevleri yükle
document.addEventListener("DOMContentLoaded", loadTasks);

// Görev ekleme işlevi
addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskValue = taskInput.value.trim();
  if (taskValue !== "") {
    const task = {
      id: Date.now(),
      name: taskValue,
      completed: false
    };

    // Görevi listeye ekle ve localStorage'a kaydet
    addTaskToList(task);
    saveTaskToLocalStorage(task);
    taskInput.value = ""; // Input kutusunu temizle
  }
}

function addTaskToList(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);

  // Tamamlanmış mı kontrol et
  if (task.completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
    <span>${task.name}</span>
    <button class="delete-btn" onclick="deleteTask(${task.id})">Sil</button>
    <button onclick="toggleComplete(${task.id})">Tamamla</button>
  `;

  taskList.appendChild(li);
}

// Görevi tamamla veya tamamlamayı kaldır
function toggleComplete(taskId) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find(task => task.id === taskId);
  task.completed = !task.completed;

  // Listeyi güncelle
  updateTaskList(tasks);
  saveAllTasksToLocalStorage(tasks);
}

// Görev silme işlevi
function deleteTask(taskId) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task.id !== taskId);

  // Listeyi güncelle
  updateTaskList(tasks);
  saveAllTasksToLocalStorage(tasks);
}

// LocalStorage'dan tüm görevleri al
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Görevi localStorage'a kaydet
function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Tüm görevleri güncelle
function updateTaskList(tasks) {
  taskList.innerHTML = "";
  tasks.forEach(task => addTaskToList(task));
}

// LocalStorage'a tüm görevleri kaydet
function saveAllTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Sayfa yüklendiğinde görevleri localStorage'tan yükle
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => addTaskToList(task));
}
