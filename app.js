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
          <button class="edit-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path
                d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"
              />
            </svg>
          </button>

          
          `;
  //delete a todo from list
  const deleteButton = listItem.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });
  //edit todos
  const editButton = listItem.querySelector(".edit-button");
  editButton.addEventListener("click", () => {
    todoInput.value = todoText;
    todoInput.focus();
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
  //console.log("todos has saved", todoString);
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
