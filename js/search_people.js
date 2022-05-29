function Search(event) {
  //prendo il nome dell'utente cercato
  const username = document.querySelector("#search_people");
  console.log(username.value);

  const formdata = new FormData();

  formdata.append("utente_cercato", username.value);

  fetch("http://localhost/HM1/do_search_people.php", {
    method: "post",
    body: formdata,
  })
    .then(onResponse)
    .then(stampaUtente);

  function onResponse(response) {
    return response.json();
  }

  function stampaUtente(json) {
    if (json == 0) {
      alert("Inserisci Username/Username non trovato");
    }
    console.log(json);

    const boxTrovato = document.querySelector(".utenti_trovati");
    boxTrovato.classList.remove("hidden");

    //svuota il div
    boxTrovato.innerHTML = "";

    for (OgniUtente of json) {
      const boxUtente = document.createElement("div");
      boxUtente.classList.add("utente");

      const imgUtente = document.createElement("img");
      imgUtente.classList.add("fotoprofilo");
      imgUtente.src = OgniUtente.immagine;

      const informazioniUtente = document.createElement("p");
      informazioniUtente.classList.add("infoUtente");
      informazioniUtente.textContent =
        OgniUtente.nome + " " + OgniUtente.cognome + " " + OgniUtente.username;

      const btnSegui = document.createElement("button");
      btnSegui.classList.add("segui");

      btnSegui.textContent = "Segui";

      //aggiungo attributo nome che sarà uguale all'id del post da pubblicare
      btnSegui.name = OgniUtente.username;
      btnSegui.id = "id_bottone";

      btnSegui.addEventListener("click", Segui);

      const btnNonSegui = document.createElement("button");
      btnNonSegui.classList.add("non_segui");
      btnNonSegui.textContent = "Non seguire più";

      btnNonSegui.name = OgniUtente.username;
      btnNonSegui.id = "id_bottone";

      btnNonSegui.addEventListener("click", NonSegui);

      if (OgniUtente.seguito == "si") {
        btnSegui.classList.add("hidden");
      } else {
        btnNonSegui.classList.add("hidden");
      }

      boxUtente.appendChild(imgUtente);
      boxUtente.appendChild(informazioniUtente);
      boxUtente.appendChild(btnSegui);
      boxUtente.appendChild(btnNonSegui);
      boxTrovato.appendChild(boxUtente);
    }
  }
}

//funzione per seguire un utente
function Segui(event) {
  const utente_seguito = event.currentTarget;

  const formdataAggiungi = new FormData();

  formdataAggiungi.append("utenteseguito", utente_seguito.name);

  fetch("http://localhost/HM1/do_search_people.php", {
    method: "post",
    body: formdataAggiungi,
  })
    .then(onResponse)
    .then(Segui);

  function onResponse(response) {
    return response.text();
  }

  function Segui(text) {
    const ScambioBtn = document.getElementsByName(utente_seguito.name)[1];
    ScambioBtn.classList.remove("hidden");
    utente_seguito.classList.add("hidden");
  }
}

//non segui utente
function NonSegui(event) {
  const utente_nonseguito = event.currentTarget;

  const formdataAggiungi = new FormData();

  formdataAggiungi.append("utentenonseguito", utente_nonseguito.name);

  fetch("http://localhost/HM1/do_search_people.php", {
    method: "post",
    body: formdataAggiungi,
  })
    .then(onResponse)
    .then(NonSegui);

  function onResponse(response) {
    return response.text();
  }

  function NonSegui(text) {
    const ScambioBtn = document.getElementsByName(utente_nonseguito.name)[0];
    ScambioBtn.classList.add("hidden");
    utente_nonseguito.classList.remove("hidden");
  }
}

const Cerca = document.querySelector(".CercaUtente");
Cerca.addEventListener("click", Search);

//cerca tutti gli utenti
function SearchTutti(event) {
  const formdata = new FormData();

  formdata.append("utenti_cercati", formdata.value);

  fetch("http://localhost/HM1/do_search_people.php", {
    method: "post",
    body: formdata,
  })
    .then(onResponse)
    .then(stampaUtenti);

  function onResponse(response) {
    return response.json();
  }

  function stampaUtenti(json) {
    if (json == 0) {
      alert("Nessun utente iscritto nel database.");
    }

    const boxTrovato = document.querySelector(".utenti_trovati");
    boxTrovato.classList.remove("hidden");

    boxTrovato.innerHTML = "";

    for (OgniUtente of json) {
      const boxUtente = document.createElement("div");
      boxUtente.classList.add("utente");

      const imgUtente = document.createElement("img");
      imgUtente.classList.add("fotoprofilo");
      imgUtente.src = OgniUtente.immagine;

      const informazioniUtente = document.createElement("p");
      informazioniUtente.classList.add("infoUtente");
      informazioniUtente.textContent =
        OgniUtente.nome + " " + OgniUtente.cognome + " " + OgniUtente.username;

      const btnSegui = document.createElement("button");
      btnSegui.classList.add("segui");

      btnSegui.textContent = "Segui";

      btnSegui.name = OgniUtente.username;
      btnSegui.id = "id_bottone";

      btnSegui.addEventListener("click", Segui);

      const btnNonSegui = document.createElement("button");
      btnNonSegui.classList.add("non_segui");
      btnNonSegui.textContent = "Non seguire più";

      btnNonSegui.name = OgniUtente.username;
      btnNonSegui.id = "id_bottone";

      btnNonSegui.addEventListener("click", NonSegui);

      if (OgniUtente.seguito == "si") {
        btnSegui.classList.add("hidden");
      } else {
        btnNonSegui.classList.add("hidden");
      }

      boxUtente.appendChild(imgUtente);
      boxUtente.appendChild(informazioniUtente);
      boxUtente.appendChild(btnSegui);
      boxUtente.appendChild(btnNonSegui);
      boxTrovato.appendChild(boxUtente);
    }
  }
}

//funzione per seguire un utente dalla ricerca di tutti gli utenti
function Segui(event) {
  const utente_seguito = event.currentTarget;

  const formdataAggiungi = new FormData();

  formdataAggiungi.append("utenteseguito", utente_seguito.name);

  fetch("http://localhost/HM1/do_search_people.php", {
    method: "post",
    body: formdataAggiungi,
  })
    .then(onResponse)
    .then(Segui);

  function onResponse(response) {
    return response.text();
  }

  function Segui(text) {
    const ScambioBtn = document.getElementsByName(utente_seguito.name)[1];
    ScambioBtn.classList.remove("hidden");
    utente_seguito.classList.add("hidden");
  }
}

function NonSegui(event) {
  const utente_nonseguito = event.currentTarget;

  const formdataAggiungi = new FormData();

  formdataAggiungi.append("utentenonseguito", utente_nonseguito.name);

  fetch("http://localhost/HM1/do_search_people.php", {
    method: "post",
    body: formdataAggiungi,
  })
    .then(onResponse)
    .then(NonSegui);

  function onResponse(response) {
    return response.text();
  }
  function NonSegui(text) {
    const ScambioBtn = document.getElementsByName(utente_nonseguito.name)[0];
    ScambioBtn.classList.remove("hidden");
    utente_nonseguito.classList.add("hidden");
  }
}

const Utenti = document.querySelector(".TuttiUtenti");
Utenti.addEventListener("click", SearchTutti);
