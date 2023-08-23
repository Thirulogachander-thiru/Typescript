//@ts-nocheck
function addTask() {
    var taskInput = document.getElementById("new-task");
    var taskText = taskInput.value.trim();
    if (taskText !== "") {
        var list_1 = document.getElementById("todo-list");
        var existingTasks = list_1.querySelectorAll("li span");
        for (var _i = 0, _a = Array.from(existingTasks); _i < _a.length; _i++) {
            var existingTask = _a[_i];
            if (existingTask.textContent === taskText) {
                alert(taskText + " is a duplicate task and already presented");
                return;
            }
        }
        var listItem_1 = document.createElement("li");
        var checkbox_1 = document.createElement("input");
        checkbox_1.type = "checkbox";
        var taskSpan_1 = document.createElement("span");
        taskSpan_1.textContent = taskText;
        var statusDropdown_1 = document.createElement("select");
        var todo = document.createElement("option");
        todo.textContent = "ToDo";
        var pendingOption = document.createElement("option");
        pendingOption.textContent = "Pending";
        var completedOption = document.createElement("option");
        completedOption.textContent = "Completed";
        statusDropdown_1.appendChild(todo);
        statusDropdown_1.appendChild(pendingOption);
        statusDropdown_1.appendChild(completedOption);
        checkbox_1.addEventListener("change", updateTaskStatus);
        statusDropdown_1.addEventListener("change", updateTaskStatus);
        function updateTaskStatus() {
            if (statusDropdown_1.value === "Completed") {
                checkbox_1.disabled = false;
                if (checkbox_1.checked) {
                    taskSpan_1.style.textDecoration = "line-through";
                }
                else {
                    taskSpan_1.style.textDecoration = "none";
                }
            }
            else {
                checkbox_1.disabled = true;
                taskSpan_1.style.textDecoration = "none";
            }
        }
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            list_1.removeChild(listItem_1);
        });
        listItem_1.appendChild(checkbox_1);
        listItem_1.appendChild(taskSpan_1);
        listItem_1.appendChild(statusDropdown_1);
        listItem_1.appendChild(deleteButton);
        list_1.appendChild(listItem_1);
        taskInput.value = "";
        updateTaskStatus(); // Passing the listItem parameter is not necessary here
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.getElementById("search");
    searchInput.addEventListener("input", searchTask);
    function searchTask() {
        var searchValue = searchInput.value.toLowerCase();
        var taskItems = document.querySelectorAll("li");
        taskItems.forEach(function (taskItem) {
            var taskName = taskItem.querySelector("span").textContent.toLowerCase();
            if (taskName.indexOf(searchValue) !== -1) {
                taskItem.style.display = "block";
            }
            else {
                taskItem.style.display = "none";
            }
        });
    }
});
