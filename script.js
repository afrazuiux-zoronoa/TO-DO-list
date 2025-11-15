let input = document.querySelector(".input");
let btn = document.querySelector("#btn");
let taskContainer = document.querySelector("#task-container");
let deleteIcon = document.querySelector("#delete");
let overlay = document.querySelector(".overlay");
let cancel = document.querySelector(".cancel");
let del = document.querySelector(".delete");

let currentDeleteId = null;

let todos = [];

// Load from localStorage on page load
let saved = localStorage.getItem("todos");
if (saved) {
    todos = JSON.parse(saved);
    renderUI();
}

// Save to localStorage whenever todos change
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

btn.addEventListener("click", function () {
    createTask();
    saveTodos();
    renderUI();
    input.value = "";
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") btn.click();
})


function createTask() {
    if (input.value.trim() === "") return;

    let task = {
        id: crypto.randomUUID(),
        label: input.value,
        completed: false
    }

    todos.push(task);
}

function renderUI() {
    taskContainer.innerHTML = "";
    todos.forEach(t => {
        const task = document.createElement("div");
        task.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.id = t.id;
        checkbox.checked = t.completed;

        const label = document.createElement("label");
        label.setAttribute("for", t.id);
        label.textContent = t.label;
        if (t.completed) label.classList.add("completed");

        const del = document.createElement("i");
        del.className = "ri-delete-bin-6-line delete-icon";
        del.dataset.id = t.id;

        task.append(checkbox, label, del);
        taskContainer.appendChild(task);
    });
}

taskContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-icon")) {
        currentDeleteId = e.target.dataset.id; // Store ID
        overlay.classList.add("active");
    }

    if (e.target.classList.contains("checkbox")) {
        let current = todos.find((t) => t.id === e.target.id);
        current.completed = !current.completed;
        saveTodos();
        renderUI();
    }
});

cancel.addEventListener("click", function () {
    overlay.classList.remove("active");
});

del.addEventListener("click", function () {
    todos = todos.filter((t) => t.id !== currentDeleteId);
    overlay.classList.remove("active");
    saveTodos();
    renderUI();
});

