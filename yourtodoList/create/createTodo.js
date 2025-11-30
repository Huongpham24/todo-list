const btn_submitTodo = document.getElementById("submit");
const btn_Priority = document.getElementsByClassName("priority-btn");
const dataUser = document.getElementsByClassName("getData");
const setData = new Object();

// Priority
const choosePriority = (element) => {
    if (!("active" in [...element.classList])) {
        Array.from(btn_Priority).forEach(value => {
            value.classList.remove("active", "getData")
        });
        element.classList.add("active", "getData");
    }
}

for (let value of btn_Priority) {
    value.addEventListener("click", choosePriority.bind(null, value));
}

// submitData
const submitData = () => {
    if (dataUser[0].validity.valueMissing) {
        dataUser[0].style.borderBlockColor = "red";
        dataUser[0].addEventListener("keyup", () => {
            if (dataUser[0].value !== "") {
                dataUser[0].style.borderBlockColor = null;
            } else {
                dataUser[0].style.borderBlockColor = "red";
            }
        })
    } else {
        getData()
        location.href = "/yourtodoList/management.html";
    }
}

btn_submitTodo.addEventListener("click", submitData);

// Get Data
const getData = () => {
    function generateId() {
        return Date.now().toString() + Math.floor(Math.random() * 10000);
    }
    for (let elementD of dataUser) {
        setData[elementD.name] = elementD.value;
    }
    localStorage.setItem(generateId(), JSON.stringify(setData));
}