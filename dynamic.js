let inputField = document.getElementById("inputField");
let form = document.getElementById("myForm");
var selectElement;
var fieldId = 0
let submitBtn = document.getElementById("submit");
let checkBoxName;
let showForms = document.getElementById("showForms");



inputField.addEventListener("click", function () {
  let inputType = prompt("enter input type", "text");
  let div = "";
  if (
    inputType === "text" ||
    inputType === "password" ||
    inputType === "email"
  ) {
    div = textInputField(inputType);
  } else if (inputType === "dropdown") {
    div = dropDownField();
  } else if (inputType === "textarea") {
    div = textAreaField();
  } else if (inputType === "radio") {
    div = radioBtnField();
  } else {
    alert(
      "enter a valid input type e.g: text,password,email,dropdown,textarea,radio"
    );
  }
  if (div) {
    form.insertBefore(div,submitBtn)
    // form.appendChild(div);
  }

});

function textInputField(inputType) {
  let div = document.createElement("div");
 
  div.classList.add("ms-auto");
  div.classList.add("my-2");

  let input = document.createElement("input");
  input.setAttribute("type", inputType);
  let inputId = `field${fieldId++}`
  input.setAttribute("id", inputId);

  let lbl = createLabel(inputId);

  div.appendChild(lbl);
  div.appendChild(input);

  return div;
}

function dropDownField() {
  let div = document.createElement("div");
  div.classList.add("ms-auto");
  div.classList.add("my-2");
  selectElement = document.createElement("select");
  let inputId = `field${fieldId++}`
  selectElement.setAttribute("id", inputId);

  let lbl = createLabel(inputId);

  let options = prompt("enter comma separated options for drop down");
  options = options.split(",");
  console.log(options);
  options.forEach(function (element) {
    let opt = document.createElement("option");
    opt.setAttribute("value", element);
    opt.innerText = element;
    selectElement.appendChild(opt);
  });
  div.appendChild(lbl);
  div.appendChild(selectElement);
  return div;
}

function getDropDownValue() {
  console.log(selectElement);

  if (selectElement) {
    var selectedOption = selectElement.options[selectElement.selectedIndex];

    var selectedValue = selectedOption.value;

    console.log("Selected value:", selectedValue);
    return selectedValue;
  } else return null;
}

function textAreaField() {
  let div = document.createElement("div");
  div.classList.add("ms-auto");
  div.classList.add("my-2");
  let textarea = document.createElement("textarea");
  let inputId = `field${fieldId++}`
  textarea.setAttribute("id", inputId);
  let lbl = createLabel(inputId);
  textarea.setAttribute("rows", 5);
  textarea.setAttribute("cols", 30);
  div.appendChild(lbl);
  div.appendChild(textarea);
  div.classList.add("d-flex");
  return div;
}

function radioBtnField() {
  let div = document.createElement("div");
  div.classList.add("m-3");
  checkBoxName = prompt("Enter title of your radio buttons");
  let labels = prompt("enter comma separated values of radios buttons");
  div.innerText = `Select ${checkBoxName}: `;
  let radioId = `field${fieldId++}`
  labels = labels.split(",");
  labels.forEach(function (element) {
    let radioInput = document.createElement("input");
    radioInput.setAttribute("type", "radio");
    radioInput.setAttribute("name", checkBoxName);
    radioInput.setAttribute("id", ++radioId);
    radioInput.classList.add("ms-1");
    radioInput.setAttribute("value", element);
    let lbl = document.createElement("label");
    lbl.setAttribute("for", radioId);
    lbl.classList.add("ms-2");
    lbl.innerText = element;
    div.appendChild(lbl);
    div.appendChild(radioInput);

    radioInput.addEventListener("click", function () {
      checkBoxName = this.value;
    });
  });
  return div;
}

function createLabel(id) {
  let lbl = document.createElement("label");
  lbl.setAttribute("for", id);
  lblText = prompt("Enter Label of this field");
  lbl.innerText = lblText;
  lbl.classList.add("me-1");
  return lbl;
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let inputText = document.querySelector('input[type="text"]');
  let inputPswd = document.querySelector('input[type="password"]');
  let inputEmail = document.querySelector('input[type="email"]');
  let inputTxtArea = document.querySelector("textarea");
  let selectedDropDown = getDropDownValue();



  let obj = {};

  obj.text = inputText ? inputText.value : "";
  obj.password = inputPswd ? inputPswd.value : "";
  obj.email = inputEmail ? inputEmail.value : "";
  obj.textarea = inputTxtArea ? inputTxtArea.value : "";
  obj.dropdown = selectedDropDown ? selectedDropDown : "";
  obj.checkBoxVaule = checkBoxName ? checkBoxName : "";

  
  let formArray = [];
  formArray = JSON.parse(localStorage.getItem("formData"));
  if (formArray) {
    formArray.push(obj);
    localStorage.setItem("formData", JSON.stringify(formArray));
  } else {
    formArray = [];
    formArray.push(obj);
    localStorage.setItem("formData", JSON.stringify(formArray));
  }

  let html = ` <button id="submit" class="btn btn-primary align-self-center  col-3">Submit</button>`;
  form.innerHTML = html;
  show();
});

function show() {
  let formData = JSON.parse(localStorage.getItem("formData"));

  if (formData) {
    let html = "";
    formData.forEach((element) => {
      html += ` <div class="col-3  mb-2 border border-2">
                      <h4>form data</h4>
                      <div>Name : ${element.text}</div>
                      <div>email : ${element.email}</div>
                      <div>password :${element.passwrod} </div>
                      <div>Message :${element.textarea} </div>
                      <div>gender :${element.dropdown} </div>
                      <div>country :${element.checkBoxVaule} </div>
                  </div>`;
    });

    showForms.innerHTML = html;
  }
}

show();




