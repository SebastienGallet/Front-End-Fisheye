const form = document.querySelector('form');
const firstName = document.querySelector('#prenom');
const lastName = document.querySelector('#nom');
const mail = document.querySelector('#email');
const message = document.querySelector('#message-input');
const sendButton = document.querySelector('.send_button')
const regexName = /^[A-Z][A-Za-z\é\è\ê\î\ï\ë\ô\ö\û\ü-]+$/
const regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


firstName.addEventListener('input', checkFirstName)
lastName.addEventListener('input', checkLastName)
mail.addEventListener('input', checkMail)
message.addEventListener('input', checkMessage)
form.addEventListener('input', validate)

function checkFirstName() {
    if (!isFirstNameValid()) {
      showError(firstName)
    } else {
      hideError(firstName);
    }
};

function checkLastName() {
    if (!isLastNameValid()) {
      showError(lastName);
    } else {
      hideError(lastName);
    }
};

function checkMail() {
    if (isMailValid()) {
      hideError(mail);
    } else {
      showError(mail);
    }
};

function checkMessage() {
    if(!isMessageValid()) {
        showError(message);
    } else {
        hideError(message)
    }
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function disableSendButton() {
    sendButton.style.opacity = 0.3;
    sendButton.style.cursor= "not-allowed"
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function enableSendButton() {
    sendButton.style.opacity = "1";
    sendButton.style.cursor= "pointer"
}

function hideError(element) {
    return (element.parentElement.setAttribute("data-error-visible", "false"))
}

function isFirstNameValid() {
    if (firstName.value.length >= 2 && firstName.value.match(regexName)) {
      return true
    }
};

function isLastNameValid() {
    if (lastName.value.length >= 2 && lastName.value.match(regexName)) {
      return true
    }
};

function isMailValid() {
    if (mail.value.match(regexMail)) {
      return true
    } 
};

function isMessageValid() {
    if (message.value.length > 2) {
      return true
    }
};

function showError(element) {
    return (element.parentElement.setAttribute("data-error-visible", "true"))
}

function validate(){
    if (
      isFirstNameValid() &&
      isLastNameValid() &&
      isMailValid() &&
      isMessageValid()
      ) { 
      enableSendButton()
      return true;
    }
    disableSendButton()
    return false
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Prénom: ' + firstName.value);
  console.log('Nom: ' + lastName.value);
  console.log('Email: ' + mail.value);
  console.log('Message: ' + message.value);
});
