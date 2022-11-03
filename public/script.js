let searchBy = ""
let mode = ""
const grid = document.getElementsByClassName('grid')[0]
const updateBtn = document.getElementById('updateBtn')
const deleteBtn = document.getElementById('deleteBtn')
const firstBtn = document.getElementById('firstBtn')
const lastBtn = document.getElementById('lastBtn')
const emailBtn = document.getElementById('emailBtn')
const phoneBtn = document.getElementById('phoneBtn')
const instructions = document.getElementById('instructions')
const inputField = document.getElementById('inputField')
const doneBtn = document.getElementById('done')
const updateBlock = document.getElementsByClassName('updateBlock')[0]
const deleteBlock = document.getElementsByClassName('deleteBlock')[0]
let atFinalBlock = false


function updateClicked() {
  updateBtn.classList.remove('inactive')
  updateBtn.classList.add('active')
  deleteBtn.classList.remove('active')
  deleteBtn.classList.add('inactive')
  mode = "update"
  grid.style.display = "grid"
  SetInstructions(searchBy)
  if (atFinalBlock) {
    ShowFinalBlock()
  }
}

function deleteClicked() {
  deleteBtn.classList.remove('inactive')
  deleteBtn.classList.add('active')
  updateBtn.classList.remove('active')
  updateBtn.classList.add('inactive')
  mode = "delete"
  grid.style.display = "grid"
  SetInstructions(searchBy)
  if (atFinalBlock) {
    ShowFinalBlock()
  }
}

function firstClicked() {
  searchBy = "first name"
  SetAllInactive()
  firstBtn.classList.add('active')
  ShowRHS()
  SetInstructions(searchBy)
  if (atFinalBlock) {
    ShowFinalBlock()
  }
}

function lastClicked() {
  searchBy = "last name"
  SetAllInactive()
  lastBtn.classList.add('active')
  ShowRHS()
  SetInstructions(searchBy)
  if (atFinalBlock) {
    ShowFinalBlock()
  }
}

function emailClicked() {
  searchBy = "email"
  SetAllInactive()
  emailBtn.classList.add('active')
  ShowRHS()
  SetInstructions(searchBy)
  if (atFinalBlock) {
    ShowFinalBlock()
  }
}

function phoneClicked() {
  searchBy = "phone"
  SetAllInactive()
  phoneBtn.classList.add('active')
  ShowRHS()
  SetInstructions(searchBy)
  if (atFinalBlock) {
    ShowFinalBlock()
  }
}

function doneClicked() {
  ShowFinalBlock()
  atFinalBlock = true
}

function SetAllInactive() {
  firstBtn.classList.remove('active')
  firstBtn.classList.add('inactive')

  lastBtn.classList.remove('active')
  lastBtn.classList.add('inactive')

  emailBtn.classList.remove('active')
  emailBtn.classList.add('inactive')

  phoneBtn.classList.remove('active')
  phoneBtn.classList.add('inactive')
}

function SetInstructions(searchBy) {
  instructions.innerHTML = "Enter the " + searchBy + " for the account you would like to " + mode + ":"
}

function ShowRHS() {
  instructions.style.display = "block"
  inputField.style.display = "block"
  doneBtn.style.display = "block"
}

function ShowFinalBlock() {
  if (mode === "delete") {
    deleteBlock.style.display = "block"
    updateBlock.style.display = "none"
    
  }
  else if (mode === "update") {
    deleteBlock.style.display = "none"
    updateBlock.style.display = "block"
  }
}





// ********** Add your code here
async function deleteDocument() {
  // const data = {
  //   if (searchBy === "first name") {
  //     data["firstName"] = inputField.value
  //   } else if (searchBy === "last name") {
  //     data["lastName"] = inputField.value
  //   } else {
  //     data[searchBy] = inputField
  //   }
  // }
  const options = {
      method: "DELETE"
  }

let url = "/delete?searchBy="
  
  if (searchBy === "first name") {
      url += "firstName"    // update?searchBy=firstName
  } else if (searchBy === "last name") {
      url += "lastName" 
  } else {
      url += searchBy
  }
  url += "&searchValue=" + inputField.value

    await fetch(url, options)
}
async function updateDocument() {

  const data = {
    firstName: document.getElementById("firstUpdate").value,
    lastName: document.getElementById("lastUpdate").value,
    email: document.getElementById("emailUpdate").value,
    phone: document.getElementById("phoneUpdate").value,
  }
  const options = {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  }


  let url = "/update?searchBy="
  
  if (searchBy === "first name") {
      url += "firstName"    // update?searchBy=firstName
  } else if (searchBy === "last name") {
      url += "lastName" 
  } else {
      url += searchBy
  }
  url += "&searchValue=" + inputField.value
        // update?searchBy=firstName&searchValue=
  await fetch(url, options)
  
  }

