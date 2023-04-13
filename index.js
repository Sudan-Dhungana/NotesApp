import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; // importing initializeApp from firebase-app 

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" // same as above but firebase-database

// Setting up app
const appSettings = {
    databaseURL : "https://fir-apptest-ae67a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// initialize app setting and database
const app = initializeApp(appSettings);
const database = getDatabase(app);
const notesInDB = ref(database, "notes");

// get elements id from index.html
const inputField = document.getElementById("inputField");
let msg = document.getElementById("msg");
const noteLists = document.getElementById("note-lists");
const btn = document.getElementById("btnAdd");


btn.addEventListener("click", function() {
    let inputVal = inputField.value;
    if (inputField.value != "") {
        push(notesInDB, inputVal);
        msg.innerText = inputVal + " added to database";
        clearInputField(); // clear after btn pressed and added to db
    
    } else {
        msg.innerText = "Type! Something, LoL!";
    }
});

onValue(notesInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        clearNoteLists(); // clears the note lists that was displayed on UI
    
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];

            let currentItemID = currentItem[0];
            let currentItemVal = currentItem[1];
        
            appendNotesToList(currentItem);
        }
    } else {
        noteLists.innerHTML = "No Notes available!";
    }
})

// clear note list
function clearNoteLists() {
    noteLists.innerHTML = "";
}

// clear the inputField
function clearInputField() {
    inputField.value = "";
}

// show notes added in UI
function appendNotesToList(items) {
    // noteLists.innerHTML += '<li>'+ items + '</li>';
    let itemID = items[0];
    let itemVal = items[1];
    let newLi = document.createElement("li");
    newLi.textContent = itemVal;

    // delete/remove an item when clicked
    newLi.addEventListener("dblclick", function() {
        let whichNoteToDel = ref(database, "notes/" + itemID);
        
        remove(whichNoteToDel);
        msg.innerHTML = itemVal + " deleted successfully!";
    })

    noteLists.append(newLi);
}

