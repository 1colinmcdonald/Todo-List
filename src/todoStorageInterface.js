class TodoDatabase {
    constructor() {
        if (!localStorage.getItem("todoLists")) {
            localStorage.todoLists = JSON.stringify([]);
        }
    }
    set todoLists(todoLists) {
        localStorage.todoLists = JSON.stringify(todoLists);
    }

    get todoLists() {
        return JSON.parse(localStorage.todoLists);
    }
}
export default new TodoDatabase();