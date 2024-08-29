import { addTask, getTasksFromList, removeTask, getTodoLists, addList, removeList, renameList } from "./todo";
import "./styles.css";

const addTaskButton = document.querySelector('button.add-task');
const addTaskDialog = document.querySelector('dialog.add-task');
const addListButton = document.querySelector('button.add-list');
const addListDialog = document.querySelector('dialog.add-list')
const renameListDialog = document.querySelector("dialog.rename-list");
renameListDialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        renameListDialog.returnValue = "cancel";
    }
})
addTaskButton.addEventListener("click", () => {
    addTaskDialog.showModal();
})

addListButton.addEventListener("click", () => {
    addListDialog.showModal();
})

addTaskDialog.addEventListener("close", () => {
    const form = document.querySelector("form.new-task");
    if (addTaskDialog.returnValue === "submit") {
        const formElements = Array.from(form.elements);
        addTask(0, formElements[0].value, formElements[1].value, formElements[2].value, formElements[3].value);
        addTaskDialog.returnValue = null;
        displayTasks(0);
    }
    form.reset();
})

addListDialog.addEventListener("close", () => {
    const form = document.querySelector("form.new-list");
    if (addListDialog.returnValue === "submit") {
        const formElements = Array.from(form.elements);
        addList(formElements[0].value);
        displayLists();
    }
})

renameListDialog.addEventListener("close", () => {
    const form = document.querySelector("form.rename-list");
    if (renameListDialog.returnValue !== "cancel") {
        const formElements = Array.from(form.elements);
        renameList(renameListDialog.returnValue, formElements[0].value);
        displayLists();
    }
})

displayLists();

function displayLists() {
    const lists = getTodoLists();
    const listsElement = document.querySelector("#todo-lists");
    listsElement.replaceChildren();
    for (let i = 0; i < lists.length; i++) {
        const listElement = document.createElement("div");
        listElement.classList.add("todo-list");
        let listTitle = document.createElement("button");
        listTitle.addEventListener("click", () => {
            const dialog = document.querySelector("dialog.rename-list")
            dialog.showModal();
            const input = document.querySelector("#new-name");
            input.value = lists[i].name;
            input.select();
            dialog.returnValue = i;
        })
        listTitle.classList.add("list-title");
        listTitle.textContent = lists[i].name;
        listElement.appendChild(listTitle);
        const todos = document.createElement("div");
        todos.classList.add("todos");
        if (i > 0) {
            const deleteList = document.createElement("button");
            deleteList.textContent = "delete";
            deleteList.classList.add("delete-list");
            deleteList.addEventListener("click", () => {
                removeList(i);
                displayLists();
            })
            listElement.appendChild(deleteList);
        }
        for (const task of lists[i].todos) {
            const taskElement = makeTodoElement(task);
            todos.appendChild(taskElement);
        }
        listElement.appendChild(todos);
        listsElement.appendChild(listElement);
    }
}



function displayTasks(index) {
    const todoList = getTodoList(index);
    const todos = todoList.querySelector(".todos");
    clearTodoList(todoList);
    for (const task of getTasksFromList(index)) {
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
    checkBoxButton.name = "Complete task " + task.title;
    checkBoxButton.addEventListener("click", () => {
        removeTask(0, getTaskIndex(taskElement));
        displayTasks(0);
    })
    taskElement.appendChild(checkBoxButton);
    title.textContent = task.title;
    title.classList.add("task-title");
    taskElement.appendChild(title);
    taskElement.classList.add("task")
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