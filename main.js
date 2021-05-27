const form = document.getElementById("form");
const formButton = form.querySelector("button");
const errorMessage = form.querySelector("#error");


function checkFirstName(value) {
    if (value.length >= 2) {                   // kolla om vardet ar storre eller likamed 2.
        return { ok: true, message: "" };      // ge tillbaka ett objekt dar ok ar true.
    } else {                                   
                                               // vardet ar inte acceptabelt. Dvs, vardet ar mindre an 2.
        return {                               // returnera objekt dar ok ar false.
            ok: false,
            message: "firstname must be at least 2 chars"
        }
    }
}

function checkEmail(value) {
    if (value.length >= 3 && value.includes("@")) {         // kolla om vardet ar storre eller lika med 3, och om "@" finns.
        return { ok: true, message: "" };                   // ge tillbaka objekt dar ok ar true.
    } else {

                                                            // vardet ar inte acceptabelt, ge tillbaka objekt med ok false.
        return { ok: false, message: "This does not look like an email" };
    }
}

function validateInputField(inputField) {
    const inputName = inputField.name;                     // plocka ut namnet pa input faltet, kan tex vara "firstname", "password" osv.
    switch (inputName) {
        // om namnet pa faltet ar "firstname", da kor vi "checkFirstName" funktionen.
        case "firstname": return checkFirstName(inputField.value); break;

        // om namnet pa faltet ar "email", da kor vi "checkEmail" funktionen.
        case "email": return checkEmail(inputField.value); break;

        // annars sa returnerar vi bara ett objekt med ok: true.
        default: return { ok: true }; break;
    }
}

formButton.addEventListener("click", function(event){
    event.preventDefault(); // ser till att sidan inte laddas om

    const inputElements = form.querySelectorAll("input");

    const messages = [];

    for (let i = 0; i < inputElements.length; i++) {           // loopa igenom alla input falt, och kalla
                                                               // pa validateInputField funktionen pa dessa.
        const error = validateInputField(inputElements[i]);
    
        if (!error.ok) {
            messages.push(error.message);
        }
    }

    console.log(messages);

    // errors arrayen ar nu en lista med true och false booleans.

    if (messages.length > 0) {                             // kolla om listan innehaller nagot fel
        // nagot fel, det finns ett false i arrayen.
        errorMessage.setAttribute("data-active", 1);
        errorMessage.innerText = messages.join(",");
    }
    else {                                                   // annars ar allt okej.
        // allt ar OK, inga false i arrayen
        errorMessage.removeAttribute("data-active");
    }
});