import { Todo, TodoList } from "./todo";
import "./styles.css";

if (!localStorage.getItem("todoLists")) {
    localStorage.todoLists = JSON.stringify([new TodoList()]);
}

const addTaskButton = document.querySelector('button');
const addTaskDialog = document.querySelector('dialog');
addTaskButton.addEventListener("click", () => {
    addTaskDialog.showModal();
})

addTaskDialog.addEventListener("close", () => {
    const form = document.querySelector("form");
    if (addTaskDialog.returnValue === "submit") {
        const formElements = Array.from(form.elements)
        const todoLists = JSON.parse(localStorage.todoLists);
        todoLists[0].todos.push(new Todo(formElements[0].value, formElements[1].value, formElements[2].value, formElements[3].value));
        localStorage.todoLists = JSON.stringify(todoLists);
    }
    displayTasks(0);
})

function displayTasks(index) {
    const todoList = getTodoList(index);
    const todos = todoList.querySelector(".todos");
    console.log(todos);
    clearTodoList(todoList);
    for (const task of JSON.parse(localStorage.todoLists)[index].todos) {
        const taskElement = makeTodoElement(task);
        todos.appendChild(taskElement);
    }
}

function makeTodoElement(task) {
    const taskElement = document.createElement("div");
    taskElement.textContent = task.title;
    return taskElement;
}

function getTodoList(index) {
    const todoLists = document.querySelector("#todo-lists");
    const children = todoLists.children;
    return children[index];
}

function clearTodoList(todoList) {
    todoList.querySelector(".todos").replaceChildren();
}

displayTasks(0);