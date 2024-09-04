import { addTask, getTasksFromList, removeTask, getTodoLists, addList, removeList, renameList, editTask, getTask } from "./todo";
import "./styles.css";

const addTaskButton = document.querySelector('button.add-task');
const addTaskDialog = document.querySelector('dialog.add-task');
const addListButton = document.querySelector('button.add-list');
const addListDialog = document.querySelector('dialog.add-list')
const renameListDialog = document.querySelector("dialog.rename-list");
const editTaskDialog = document.querySelector("dialog.edit-task");


renameListDialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        renameListDialog.returnValue = "cancel";
    }
})

addTaskButton.addEventListener("click", () => {
    const listSelect = document.querySelector("#list-select");
    listSelect.replaceChildren();
    const lists = getTodoLists();
    for (let i = 0; i < lists.length; i++) {
        const option = document.createElement("option");
        option.textContent = lists[i].name;
        option.value = i;
        listSelect.appendChild(option);
    }
    addTaskDialog.showModal();
})

addListButton.addEventListener("click", () => {
    addListDialog.showModal();
})

addTaskDialog.addEventListener("close", () => {
    const form = document.querySelector("form.new-task");
    if (addTaskDialog.returnValue === "submit") {
        const formElements = Array.from(form.elements);
        const task = addTask(formElements[7].value, formElements[0].value, formElements[1].value, formElements[2].value, formElements[3].value);
        addTaskDialog.returnValue = null;
        addTaskToDom(task);
    }
    form.reset();
});

function addTaskToDom(task) {
    const list = document.querySelectorAll(".todos")[task.list]
    list.appendChild(makeTodoElement(task, task.list));
    list.scrollTop = list.scrollHeight;
}

editTaskDialog.addEventListener("close", () => {
    const form = document.querySelector("form.edit-task");
    const formData = new FormData(form);
    if (editTaskDialog.returnValue === "submit") {
        console.log(`new-list-index: ${formData.get("new-index")}`);
        editTask(...["old-list-index", "new-list-index", "task-index", "new-title", "new-description", "new-due-date", "new-priority"].map((x) => formData.get(x)));
        if (formData.get("old-list-index") === formData.get("new-list-index")) {
            updateTask(formData.get("old-list-index"), formData.get("task-index"));
        } else {
            displayLists();
        }
    }

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
        for (let j = 0; j < lists[i].todos.length; j++) {
            const taskElement = makeTodoElement(lists[i].todos[j], i);
            taskElement.setAttribute("index", j);
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
        const taskElement = makeTodoElement(task, index);
        todos.appendChild(taskElement);
    }
}

function makeTodoElement(task, listIndex) {
    const taskElement = document.createElement("div");
    taskElement.setAttribute("index", task.index);
    console.log(`taskElement.getAttribute("index"): ${taskElement.getAttribute("index")}`);
    taskElement.setAttribute("list-index", listIndex);
    console.log(`taskElement.getAttribute("list-index"): ${taskElement.getAttribute("list-index")}`);
    const checkBoxButton = document.createElement("button");
    const title = document.createElement("div");
    checkBoxButton.classList.add("checkbox");
    const background = document.createElement("span");
    background.classList.add("background");
    checkBoxButton.appendChild(background);
    checkBoxButton.name = "Complete task " + task.title;
    checkBoxButton.addEventListener("click", async () => {
        const list = taskElement.parentElement.parentElement
        removeTask(listIndex, getTaskIndex(taskElement));
        displayTasks(listIndex);
    });
    taskElement.appendChild(checkBoxButton);
    title.textContent = task.title;
    title.classList.add("task-title");
    const taskInfo = document.createElement("button");
    taskInfo.classList.add("task-info");
    taskInfo.addEventListener("click", () => {
        const currentTaskElement = title.parentElement.parentElement;
        console.log(currentTaskElement.getAttribute("index"));
        console.log(`when I click list index: ${currentTaskElement.getAttribute("list-index")}`)
        currentTaskElement.setAttribute("index", getTaskIndex(currentTaskElement));
        const index = Number(currentTaskElement.getAttribute("index"))
        const currentTask = getTask(Number(currentTaskElement.getAttribute("list-index")), index);
        currentTask.index = index;
        const newTitle = document.querySelector("#new-title");
        const newDescription = document.querySelector("#new-description");
        const newDueDate = document.querySelector("#new-due-date");
        console.log(newDueDate);
        const newListSelect = document.querySelector("#new-list-select");
        newListSelect.replaceChildren();
        document.querySelector("#edit-task-index").value = currentTask.index;
        document.querySelector("#old-list-index").value = currentTask.list;
        newTitle.value = currentTask.title;
        newTitle.select();
        newDescription.value = currentTask.description;
        newDueDate.value = currentTask.dueDate;
        const lists = getTodoLists();
        for (let i = 0; i < lists.length; i++) {
            const option = document.createElement("option");
            option.textContent = lists[i].name;
            option.value = i;
            if (i === currentTask.list) {
                option.setAttribute("selected", "");
            }
            newListSelect.appendChild(option);
        }
        newListSelect.value = currentTask.list;
        editTaskDialog.showModal();
    })
    taskElement.classList.add("task")
    const dueDate = document.createElement("div");
    dueDate.classList.add("due-date");
    dueDate.textContent = task.dueDate;
    taskInfo.appendChild(title);
    taskInfo.appendChild(dueDate);
    taskElement.appendChild(taskInfo);
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

function updateTask(listIndex, taskIndex) {
    const task = getTask(listIndex, taskIndex);
    const taskInfo = document
        .querySelectorAll(".todo-list")[listIndex]
        .querySelector(".todos").children[taskIndex]
        .querySelector(".task-info");
    taskInfo.querySelector(".task-title").textContent = task.title;
    taskInfo.querySelector(".due-date").textContent = task.dueDate;
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