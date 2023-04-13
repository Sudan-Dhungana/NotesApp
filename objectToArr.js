
// turn object to array
let users = {
    "01" : "abc@gmail.com",
    "02" : "bbc@gmail.com",
    "03" : "cbc@gmail.com"
}


let userEmails = Object.values(users); // arrays of emails
let userIDs = Object.keys(users); // arrays of keys
let userID_Email = Object.entries(users); // arrays of both
