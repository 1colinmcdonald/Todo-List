import { addTask, removeTask } from "./todo";
import "./styles.css";

const addTaskButton = document.querySelector('button');
const addTaskDialog = document.querySelector('dialog');
addTaskButton.addEventListener("click", () => {
    addTaskDialog.showModal();
})

addTaskDialog.addEventListener("close", () => {
    const form = document.querySelector("form");
    if (addTaskDialog.returnValue === "submit") {
        const formElements = Array.from(form.elements);
        addTask(0, formElements[0].value, formElements[1].value, formElements[2].value, formElements[3].value);
    }
    displayTasks(0);
})

function displayTasks(index) {
    const todoList = getTodoList(index);
    const todos = todoList.querySelector(".todos");
    clearTodoList(todoList);
    for (const task of JSON.parse(localStorage.todoLists)[index].todos) {
        const taskElement = makeTodoElement(task);
        todos.appendChild(taskElement);
    }
}

function makeTodoElement(task) {
    const taskElement = document.createElement("div");
    const checkBoxButton = document.createElement("button");
    const title = document.createElement("div");
    checkBoxButton.classList.add("checkbox");
    const background = document.createElement("span");
    background.classList.add("background");
    checkBoxButton.appendChild(background);
    checkBoxButton.addEventListener("click", () => {
        removeTask(0, getTaskIndex(taskElement));
        displayTasks(0);
    })
    taskElement.appendChild(checkBoxButton);
    title.textContent = task.title;
    title.classList.add("task-title");
    taskElement.appendChild(title);
    return taskElement;
}

function getTaskIndex(taskElement) {
    const index = Array.from(taskElement.parentElement.children).indexOf(taskElement);
    return index;
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

// Helper function
let domReady = (cb) => {
    document.readyState === 'interactive' || document.readyState === 'complete'
    ? cb()
    : document.addEventListener('DOMContentLoaded', cb);
}

domReady(() => {
    // Display body when DOM is loaded
    document.body.style.visibility = 'visible';
});