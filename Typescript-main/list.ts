//@ts-nocheck
function addTask() {
    const taskInput = document.getElementById("new-task") as HTMLInputElement;
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const list = document.getElementById("todo-list") as HTMLUListElement;

        const existingTasks = list.querySelectorAll("li span");
        for (const existingTask of Array.from(existingTasks)) {
            if (existingTask.textContent === taskText) {
                alert(taskText + " is a duplicate task and already presented");
                return;
            }
        }
        const listItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        const statusDropdown = document.createElement("select");
        const todo = document.createElement("option");
        todo.textContent = "ToDo";
        const pendingOption = document.createElement("option");
        pendingOption.textContent = "Pending";
        const completedOption = document.createElement("option");
        completedOption.textContent = "Completed";
        statusDropdown.appendChild(todo);
        statusDropdown.appendChild(pendingOption);
        statusDropdown.appendChild(completedOption);

        checkbox.addEventListener("change", updateTaskStatus);
        statusDropdown.addEventListener("change", updateTaskStatus);

        function updateTaskStatus() {
            if (statusDropdown.value === "Completed") {
                checkbox.disabled = false;
                if (checkbox.checked) {
                    taskSpan.style.textDecoration = "line-through";
                } else {
                    taskSpan.style.textDecoration = "none";
                }
            } else {
                checkbox.disabled = true;
                taskSpan.style.textDecoration = "none";
            }
        }
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            list.removeChild(listItem);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(statusDropdown);
        listItem.appendChild(deleteButton);

        list.appendChild(listItem);
        taskInput.value = "";

        updateTaskStatus(); // Passing the listItem parameter is not necessary here
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search") as HTMLInputElement;
    searchInput.addEventListener("input", searchTask);

    function searchTask() {
        const searchValue = searchInput.value.toLowerCase();
        const taskItems = document.querySelectorAll("li");
        taskItems.forEach(taskItem => {
            const taskName = taskItem.querySelector("span")!.textContent!.toLowerCase();
            if (taskName.indexOf(searchValue) !== -1) {
                taskItem.style.display = "block";
            } else {
                taskItem.style.display = "none";
            }
        });
    }
});
