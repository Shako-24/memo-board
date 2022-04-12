function saveNote() {

    // Read current JSON array from the local storage:
    const currentNotesArray = localStorage.getItem("myNotes");

    // Convert to a javascript array:
    let existingNotesArray = JSON.parse(currentNotesArray);
    if (existingNotesArray === null) {
        existingNotesArray = []; // Only on first time
    }

    const details = validationDetails()

    const newNote = readNoteDetails(details);
console.log(newNote);

    existingNotesArray.push(newNote);

    // Create a new JSON array containing the new book:
    const updatedNotesArray = JSON.stringify(existingNotesArray);

    // Save the new array to the local storage:
    localStorage.setItem("myNotes", updatedNotesArray);
  
    addNote(newNote);
}

function validationDetails (){
    const timeBox = document.getElementById("timeBox");
    const dateBox = document.getElementById("dateBox");
    const textBox = document.getElementById("textBox");

    const time = timeBox.value;
    const date = dateBox.value;
    const text = textBox.value;

    if (!time || !date || !text) {
        return alert("Missing details, please fill in all fields")
    }

    if (text.length < 1) {
        return alert("Missing details, please fill in all fields")
    }

    return {time: time, date:date, text:text}
}
function readNoteDetails(details) {
    const time = details.time;
    const date = details.date;
    const text = details.text

    return {
        time: time,
        date: date,
        text: text,
        id: new Date().toLocaleTimeString(),
    };
}

function loadNotesFromStorage() {

    // Read current JSON array from the local storage:
    const currentNotesArray = localStorage.getItem("myNotes");

    // Convert to a javascript array:
    const existingNotesArray = JSON.parse(currentNotesArray);

    // If array is empty - exit this function:
    if (existingNotesArray === null) {
        return []
    }
    
    displayAllNotes(existingNotesArray)
}

function addNote(obj) {
    let newNote = document.createElement("li")
    let deleteBtn = document.createElement("button")
    let newTime = document.createElement("p");
    let newText = document.createElement("p");
    let newDate = document.createElement("p");

    const index = findMyIndex(obj)

    newNote.setAttribute('id', `todo-${index}`);
    
   
    newTime.innerHTML = obj.time
    newText.innerHTML = obj.text
    newDate.innerHTML = obj.date
    deleteBtn.setAttribute('onclick', `deleteNote(${index})`)

    deleteBtn.className = "removeBtn glyphicon glyphicon-remove-sign"
    newTime.className = "addTime";
    newText.className = "addText";
    newDate.className = "addDate";

    newNote.appendChild(deleteBtn);
    newNote.appendChild(newTime);
    newNote.appendChild(newText);
    newNote.appendChild(newDate);

    insertNote(newNote);
} 

function displayAllNotes(notesArr){

    for(const note of notesArr){
        addNote(note)
    }
    
}

function insertNote(newNote){
const ul = document.getElementById("containerDiv");
newNote.className = "fadeIn";
ul.insertBefore(newNote, ul.firstChild);
};

function deleteNote(index){
    const myNotesList = JSON.parse(localStorage.getItem('myNotes'));

    myNotesList.splice(index, 1);

    localStorage.setItem('myNotes', JSON.stringify(myNotesList))

    /////////////////////

    const noteFromUI = document.getElementById(`todo-${index}`)

    noteFromUI.remove()
}
    
function findMyIndex(obj) {
    const myNotesList = JSON.parse(localStorage.getItem('myNotes'))
    let index = myNotesList.length; 

    for (let i = 0; i < index; i++) {
        if (obj.id === myNotesList[i].id) {
            index = i
        }
    }
   
    return index
}


