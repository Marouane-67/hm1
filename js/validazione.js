function Validation(event) {
  let myform = document.forms["form_registrazione"];
  if (
    myform.nome.value.length == 0 ||
    myform.cognome.value.length == 0 ||
    myform.data.value.length == 0 ||
    myform.email.value.length == 0 ||
    myform.username.value.length == 0 ||
    myform.password.value.length == 0 ||
    myform.pass2.value.length == 0
  ) {
    alert("Errore inserire tutti i campi");

    //non invia i dati al form
    event.preventDefault();
  } else {
    console.log("Dati inviati");
  }
}

function Validation_login(event) {
  console.log(form_login);

  if (
    form_login.username.value.length == 0 ||
    form_login.password.value.length == 0
  ) {
    alert("Inserisci username e password per accedere");
    event.preventDefault();
  }
}
const form = document.forms["form_registrazione"];
form.addEventListener("submit", Validation);

const form_login = document.forms["form_accedi"];
form_login.addEventListener("submit", Validation_login);

function ValidationUsernameUtente(event) {
  //prendo il nome dell'utente cercato
  const usernameVal = form.username;
  console.log(usernameVal);

  const formdata = new FormData();

  formdata.append("validation", usernameVal.value);

  fetch("http://localhost/HM1/ControlloUsername.php", {
    method: "post",
    body: formdata,
  })
    .then(onResponse)
    .then(ValidationUsernameUtente);

  function onResponse(response) {
    return response.text();
  }
  //stampa i risultati
  function ValidationUsernameUtente(text) {
    if (text == 1) {
      const CambiaColoreUsername = document.querySelector(".username");
      CambiaColoreUsername.classList.add("usato");
    } else {
      const CambiaColoreUsername = document.querySelector(".username");
      CambiaColoreUsername.classList.remove("usato");
    }
  }
}
const usernameUtente = form.username;
usernameUtente.addEventListener("blur", ValidationUsernameUtente);
