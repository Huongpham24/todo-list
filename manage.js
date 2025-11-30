let count = 0;
document.querySelector(".empty-state").style.display = localStorage.length > 2 ? "none" : "flex";
// Create Todo
const createTodo = (info, idNUmber) => {
    const groupTask = document.getElementsByClassName("task-list")[0];
    let getDate = info.dueDate === "" ? "" : "📅 " + info.dueDate;
    let getTime = info.dueTime === "" ? "" : "⏰ " + info.dueTime;
    let getCategory = info.category === "" ? "" : "category-badge";
    let createElement = `<div class="task-item ${info.status}" id="${idNUmber}">
    <div class="task-main">
    <input type="checkbox" class="task-checkbox" ${info.tick}>
    <div class="task-content">
    <div class="task-header">
                            <span class="task-title">${info.titleTask}</span>
                            <span class="priority-badge priority-high">${info.priority}</span>
                        </div>
                        <div class="task-description">
                            ${info.description}
                        </div>
                        <div class="task-meta">
                            <span class="meta-item">${getDate}</span>
                            <span class="meta-item">${getTime}</span>
                            <span class="${getCategory}">${info.category}</span>
                        </div>
                    </div>
                    <button class="delete-btn">×</button>
                </div>
            </div>`
    groupTask.insertAdjacentHTML("beforeend", createElement);

    const newTask = groupTask.lastElementChild;
    const checkbox = newTask.querySelector('.task-checkbox');
    const deleteBtn = newTask.querySelector('.delete-btn');
    
    // Delete Todo
    deleteBtn.addEventListener("click", (e) => {
        // e.stopPropagation();
        let parent = e.target.closest(".task-item");
        let index = parent.id;
        count -= 1;
        document.getElementById("todo-count").innerText = count;
        parent.remove();
        delete localStorage[index];
        if (localStorage.length < 4) {
            document.querySelector(".empty-state").style.display = "flex";
            delete localStorage["idNumber"];
        }
    });
    
    // Completed Todo
    checkbox.addEventListener("change", (e) => {
        // e.stopPropagation();
        let parent = e.target.closest(".task-item");
        let index = parent.id;
        let convert = JSON.parse(localStorage[index]);
        if (checkbox.checked) {
            parent.classList.add("completed");
            convert.status = "completed";
            convert.tick = 'checked'
            count -= 1;
            document.getElementById("todo-count").innerText = count;
            localStorage.setItem(index, JSON.stringify(convert));
        } else {
            parent.classList.remove("completed");
            convert.status = null;
            convert.tick = null;
            count += 1;
            document.getElementById("todo-count").innerText = count;
            localStorage.setItem(index, JSON.stringify(convert));
        }
    });
    
    // Edit Todo
    newTask.addEventListener("click", (e) => {
        // ✅ QUAN TRỌNG: Kiểm tra target
        if (e.target.matches('.task-checkbox') || 
            e.target.matches('.delete-btn') ||
            e.target.closest('.delete-btn')) {
            return; // Không xử lý nếu click vào checkbox hoặc delete button
        }
        location.href = "/editTodo/edit.html";
        localStorage.setItem("idNumber", e.target.closest(".task-item").id)
    });
}

// Loop Todo
Object.keys(localStorage).forEach(index => {
    if (index !== "__not_first_visit__" && index !== "isWhitelist" && index !== "idNumber") {
        let infoTodo = JSON.parse(localStorage[index]);
        count += 1;
        count = infoTodo.tick ? count - 1 : count;
        createTodo(infoTodo, index);
    }
});
document.getElementById("todo-count").innerText = count;
