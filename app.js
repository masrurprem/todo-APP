const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUl = document.getElementById("todo-list");
// array to store todos
let allTodos = getTodos();
updateTodo();

function todoAdd() {
  const todoText = todoInput.value.trim();

  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject);
    updateTodo();
    saveTodos();

    todoInput.value = "";
  }
}
//
function updateTodo() {
  todoListUl.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoLi(todo, todoIndex);
    todoListUl.append(todoItem);
  });
}

//
function createTodoLi(todo, todoIndex) {
  const listItem = document.createElement("li");
  listItem.className = "todo";
  const todoId = "todo-" + todoIndex;
  const todoText = todo.text;
  listItem.innerHTML = `
        <input type="checkbox" id="${todoId}" />
          <label class="custom-checkbox" for="${todoId}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="transparent"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="${todoId}" class="todo-text"> ${todoText} </label>
          <button class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
          `;
  //delete a todo from list
  const deleteButton = listItem.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });
  //checkbox
  const checkbox = listItem.querySelector("input");
  checkbox.addEventListener("change", () => {
    // allTodos[todoIndex].completed = checkbox.checked;
    todo.completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;

  return listItem;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => {
    return i !== todoIndex;
  });
  //save and update todo
  saveTodos();
  updateTodo();
}

function saveTodos() {
  const todoString = JSON.stringify(allTodos);
  localStorage.setItem("todos", todoString);
  //onsole.log("todos has saved", todoString);
}
function getTodos() {
  const todoString = localStorage.getItem("todos") || "[]";
  return JSON.parse(todoString);
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // add a new task to array
  todoAdd();
});
