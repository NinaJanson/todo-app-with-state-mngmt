const list = document.querySelector("#list");
const addTodoBotton = document.querySelector("#add");
const removeTodoBotton = document.querySelector("#remove");

let todos = [];

function addToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function syncTodos() {
  const todosFromLocalStorage = localStorage.getItem("todos");
  if (todosFromLocalStorage) {
    todos = JSON.parse(todosFromLocalStorage);
  }
}

syncTodos();

function renderTodos() {
  list.innerHTML = "";

  const filteredTodos = todos.filter(checkFilterForTodo);
  filteredTodos.forEach((todo) => renderSingleTodo(todo));
}

function checkFilterForTodo(todo) {
  const filter = getCurrentFilter();

  return (
    filter === "all" ||
    (filter === "open" && todo.done === false) ||
    (filter === "done" && todo.done === true)
  );
}

function renderSingleTodo(todo) {
  const newLi = document.createElement("li");
  if (todo.done === true) {
    newLi.style.textDecoration = "line-through";
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;

  checkbox.addEventListener("change", () => {
    todo.done = !todo.done;
    addToLocalStorage();
  });

  newLi.appendChild(checkbox);

  const todoText = document.createTextNode(todo.description);
  newLi.appendChild(todoText);

  list.appendChild(newLi);
}

addTodoBotton.addEventListener("click", function () {
  const newInput = document.querySelector("#input");
  const newTodo = {
    description: newInput.value,
    done: false,
  };
  if (newInput.value === "") {
    alert("What is your ToDo?");
  } else {
    todos.push(newTodo);

    addToLocalStorage();

    newInput.value = "";
    renderTodos();
  }
});
renderTodos();
addToLocalStorage();

const filters = document.querySelector("#filter");
filters.addEventListener("change", function (e) {
  //console.log(getCurrentFilter());
  renderTodos();
});

function getCurrentFilter() {
  return document.querySelector('input[name="filter"]:checked').value;
}
renderTodos();

removeTodoBotton.addEventListener("click", (event) => {
  todos = todos.filter((todo) => !todo.done);
  addToLocalStorage();
  renderTodos();
});

function changeDoneStyle(e) {
  if (e.target.checked === true) {
    e.target.parentElement.style.textDecoration = "line-through";
  } else {
    e.target.parentElement.style.textDecoration = "none";
  }
}
list.addEventListener("change", changeDoneStyle);
