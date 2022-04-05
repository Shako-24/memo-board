function saveNote() {

    // Read current JSON array from the local storage:
    const currentNotesArray = localStorage.getItem("myNotes");

    // Convert to a javascript array:
    let existingNotesArray = JSON.parse(currentNotesArray);
    if (existingNotesArray === null) {
        existingNotesArray = []; // Only on first time
    }

    const newNote = readNoteDetails();
    existingNotesArray.push(newNote);

    // Create a new JSON array containing the new book:
    const updatedNotesArray = JSON.stringify(existingNotesArray);

    // Save the new array to the local storage:
    localStorage.setItem("myNotes", updatedNotesArray);
  
    addNote(newNote);
}

function readNoteDetails() {
    const timeBox = document.getElementById("timeBox");
    const dateBox = document.getElementById("dateBox");
    const textBox = document.getElementById("textBox");

    const time = timeBox.value;
    const date = dateBox.value;
    const text = textBox.value;

    return {
        time: time,
        date: date,
        text: text,
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
    const containerDiv = document.getElementById("containerDiv");

    let newDate = document.createElement("div");
    let newTime = document.createElement("div");
    let newText = document.createElement("div");

    newText.innerHTML = obj.text
    newDate.innerHTML = obj.date
    newTime.innerHTML = obj.time

    containerDiv.appendChild(newDate);
    containerDiv.appendChild(newTime);
    containerDiv.appendChild(newText);


}
function displayAllNotes(notesArr){

    for(const note of notesArr){
        addNote(note)
    }
    
}