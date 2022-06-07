console.log('Attached');


//user Adds a Note then add it to local storage.

let addBtn = document.getElementById('addBtn');
showNotes();
addBtn.addEventListener('click', () => {
    let addText = document.getElementById('addText');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : addTitle.value,
        text : addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTitle.value = "";
    addText.value = "";
    // console.log(notesObj);
    showNotes();
});


//function to show Elements to show the elements 
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class=" noteCard my-3 mx-3 card" style="width: 18rem;">
                    <div class=" card-body">
                        <h5 class="card-title"> ${element.title} </h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Node</button>
                    </div>
                </div>`
    });

    let noteElm = document.getElementById('notes');
    if(notesObj.length != 0){
        noteElm.innerHTML = html;
    }
    else{
        noteElm.innerHTML = ` Nothing to Show here,  Add a Note to display the notes Here!` ;
    }
}

//function to delete notes
function deleteNotes(index){
    console.log('Delete Noted with index ',index);
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index , 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

//event listener to search the notes

let search = document.getElementById('searchText');
search.addEventListener('input', function(){
    let innerVal = search.value ;
    // console.log('event fired',innerVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardText  = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardText);
        if(cardText.includes(innerVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        } 
    });
});