const buttons = document.querySelectorAll("button");
const object = document.querySelector(".object");
const customColorInput = document.querySelector("#customcolor");

buttons.forEach(button =>{
    button.addEventListener("click", () => {
        const color = button.innerText.toLowerCase();
        object.style.backgroundColor = color;
    });
});

customColorInput.addEventListener("input", () => {
    object.style.backgroundColor = customColorInput.value;
});