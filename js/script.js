const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");

let todos = [];

// Render Table
function renderTodos(list = todos) {
  todoList.innerHTML = "";
  if (list.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    return;
  }

  list.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "✅ Done" : "⏳ Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTodo(${index})" class="danger">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

// Add Todo
addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (!task) {
    alert("Please enter a task!");
    return;
  }

  if (!date) {
    alert("Please select a date!");
    return;
  }

  todos.push({ task, date, done: false });
  todoInput.value = "";
  dateInput.value = "";
  renderTodos();
});

// Toggle Status
function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

// Delete Todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Delete All
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure to delete all tasks?")) {
    todos = [];
    renderTodos();
  }
});

// Filter (tampilkan hanya yang belum selesai)
filterBtn.addEventListener("click", () => {
  const filtered = todos.filter((todo) => !todo.done);
  renderTodos(filtered);
});

// Initial Render
renderTodos();
