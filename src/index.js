import { Todo, TodoList } from "./todo";

const defaultTodoList = new TodoList;

const addTaskButton = document.querySelector('button');
const addTaskDialog = document.querySelector('dialog');
addTaskButton.addEventListener("click", () => {
    addTaskDialog.showModal();
})

addTaskDialog.addEventListener("close", () => {
    let form = document.querySelector("form");
    if (addTaskDialog.returnValue === "submit") {
        formElements = Array.from(form.elements)
        defaultTodoList.todos.push(new Todo(formElements[0].value, formElements[1].value, formElements[2].value, formElements[3].value));
    }
    displayTasks();
})

function displayTasks() {
    for (task of defaultTodoList.todos) {
        const taskElement = document.createElement("div");
        taskElement.textContent = task.title;
        document.body.appendChild(taskElement);
    }

}

displayTasks();