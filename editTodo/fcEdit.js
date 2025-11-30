const parentElement = document.getElementById("editTodoForm");
const get_idNumber = localStorage.getItem("idNumber");
const obj_idNumber = JSON.parse(localStorage[get_idNumber]);
const getFormData = document.getElementsByClassName("newValue");
Array.from(getFormData).forEach(element => {
    if (element.value === "on") {
        element.setAttribute(obj_idNumber["tick"], "checked");
    } else if (element.name === "priority") {
        if (element.value === obj_idNumber[element.name]) {
            element.classList.add("active");
        }
    } else {
        element.value = obj_idNumber[element.name];
    }
})
const handleForm = (e) => {
    switch (true) {
        case e.target.matches(".btn-save"):
            Array.from(getFormData).forEach(element => {
                // obj_idNumber[element.name] = element.value;
                if (element.name === "priority") {
                    if (element.className.includes("active")) {
                        obj_idNumber[element.name] = element.value;
                    }
                } else if (element.value === "on") {
                    if (element.checked) {
                        obj_idNumber["tick"] = "checked";
                        obj_idNumber["status"] = "completed";
                    } else {
                        obj_idNumber["tick"] = null;
                        obj_idNumber["status"] = null;
                    }
                } else {
                    obj_idNumber[element.name] = element.value;
                }
            })
            if (document.querySelector(".titleInput").value) {
                localStorage.setItem(get_idNumber, JSON.stringify(obj_idNumber));
                location.href = "/yourtodoList/";
            }
            break;
        case e.target.matches(".btn-cancel"):
            location.href = "inel.html";
            break;
        case e.target.matches(".btn-delete"):
            location.href = "/yourtodoList/";
            delete localStorage[get_idNumber];
            break;
        case e.target.matches(".priority-btn"):
            let priority = document.getElementsByClassName("priority-btn");
            for (let i of priority) {
                i.classList.remove("active");
            }
            e.target.classList.add("active");
            break;
        case e.target.matches(".titleInput"):
            e.target.addEventListener("keyup", () => {
                if (e.target.validity.valueMissing) {
                    e.target.style.borderBlockColor = "red";
                } else {
                    e.target.style.borderBlockColor = null;
                }
            })
            break;
        case e.target.matches(".checkbox"):

            break;
    }
};

parentElement.addEventListener("click", handleForm);
