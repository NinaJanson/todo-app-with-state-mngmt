const list = document.querySelector("#list");
const addTodoBotton = document.querySelector("#add");
const removeTodoBotton = document.querySelector("#remove");

const todos = [];

/*l
ocalStorage.setItem("todos", JSON.stringify(todos));
const allTodos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(allTodos);
*/

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const newLi = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    newLi.appendChild(checkbox);

    const todoText = document.createTextNode(todo.description);
    newLi.appendChild(todoText);

    list.appendChild(newLi);
  });
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
    newInput.value = "";
    renderTodos();
  }
});

function removeDoneTodos() {
  const allTasks = list.children;
  console.log(allTasks);
  for (let i = allTasks.length - 1; i >= 0; i--) {
    const li = allTasks[i];
    const checkbox = li.querySelector('input[type="checkbox"]');
    if (checkbox.checked === true) {
      li.remove();
    }
  }
}
removeTodoBotton.addEventListener("click", removeDoneTodos);

function changeDoneStyle(e) {
  if (e.target.checked === true) {
    e.target.parentElement.style.textDecoration = "line-through";
  } else {
    e.target.parentElement.style.textDecoration = "none";
  }
}
list.addEventListener("change", changeDoneStyle);
