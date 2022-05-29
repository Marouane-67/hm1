//creazione di un nuovo post
function Post(event) {
  const string = document.querySelector("#search_post");
  const scelta = document.querySelector("#api");

  const servizio = scelta.options[scelta.selectedIndex].value;

  const ricerca_gif = encodeURIComponent(string.value);

  const formData = new FormData();
  formData.append("ricerca_stringa", ricerca_gif);
  formData.append("ricerca_servizio", servizio);

  fetch("http://localhost/HM1/do_search_content.php", {
    method: "post",
    body: formData,
  })
    .then(onResponse)
    .then(stampaServizi);

  function onResponse(response) {
    return response.json();
  }

  function stampaServizi(json) {
    if (servizio == "giphy") {
      if (json.pagination.count == 0) {
        alert("Nessun contenuto trovato");
      } else {
        const boxTrovato = document.querySelector(".container_giphy");
        boxTrovato.classList.remove("hidden");

        boxTrovato.innerHTML = "";

        for (OgniPost of json.data) {
          const boxPost = document.createElement("div");
          boxPost.classList.add("giphy");

          const imgPost = document.createElement("img");
          imgPost.classList.add("gif");

          const text = document.createElement("p");
          text.textContent = "Clicca sulla gif per condividerla";

          imgPost.src =
            "https://media.giphy.com/media/" + OgniPost.id + "/source.gif";

          const tuttiPost = document.querySelectorAll(".gif");
          for (const singoloPost of tuttiPost) {
            singoloPost.addEventListener("click", eventPost);
          }

          boxPost.appendChild(text);
          boxPost.appendChild(imgPost);
          boxTrovato.appendChild(boxPost);
        }

        function eventPost(event) {
          console.log("foto cliccata");
          const container = event.currentTarget;

          const containerBrothers =
            container.parentNode.querySelectorAll("div");
          containerBrothers.forEach((element) => {
            element.classList.add("unselected");
            element.classList.remove("selected");
          });

          container.classList.remove("unselected");
          container.classList.add("selected");

          const boxTrovato = document.querySelector(".modale");
          boxTrovato.classList.remove("hidden");

          boxTrovato.innerHTML = "";

          const containerModal = document.createElement("div");
          containerModal.classList.add("container_modal");

          const btnEsc = document.createElement("button");
          btnEsc.classList.add("Esc_modal");
          btnEsc.addEventListener("click", EsciModale);
          btnEsc.textContent = "Esci";

          const btnCondividi = document.createElement("button");
          btnCondividi.classList.add("btnCond");
          btnCondividi.textContent = "Condividi";
          btnCondividi.addEventListener("click", Condividi);

          const titoloPost = document.createElement("input");
          titoloPost.type = "text";
          titoloPost.classList.add("titolo");
          titoloPost.placeholder = "Inserisci un titolo";

          const imgPost = document.createElement("img");
          imgPost.classList.add("img_condivisione");
          imgPost.src = event.currentTarget.src;

          boxTrovato.appendChild(containerModal);
          containerModal.appendChild(titoloPost);
          containerModal.appendChild(imgPost);
          containerModal.appendChild(btnEsc);

          containerModal.appendChild(btnCondividi);
        }
      }
    } else if (servizio == "YouTube") {
      const boxTrovato = document.querySelector(".container_giphy");
      boxTrovato.classList.remove("hidden");

      boxTrovato.innerHTML = "";

      for (OgniVideo of json.items) {
        const cont_video = document.createElement("div");
        cont_video.classList.add("cont_video");

        const title_video = document.createElement("text");
        title_video.classList.add("title_video");
        title_video.textContent = "" + OgniVideo.snippet.title;

        const video = document.createElement("iframe");
        video.classList.add("iframe_video");
        video.src = "https://youtube.com/embed/" + OgniVideo.id.videoId;

        const btnCondividi = document.createElement("button");
        btnCondividi.classList.add("btnCondividiVideo");
        btnCondividi.textContent = "Condividi";
        btnCondividi.id = "https://youtube.com/embed/" + OgniVideo.id.videoId;
        btnCondividi.addEventListener("click", CondividiVideo);

        boxTrovato.appendChild(cont_video);
        cont_video.appendChild(title_video);
        cont_video.appendChild(video);
        cont_video.appendChild(btnCondividi);
      }
    }
  }
}

function CondividiVideo(event) {
  //recupero l'id del video da condividere dal tasto Condividi
  const container = event.currentTarget.id;
  console.log(container);
  const boxTrovato = document.querySelector(".modale");
  boxTrovato.classList.remove("hidden");

  boxTrovato.innerHTML = "";

  const containerModal = document.createElement("div");
  containerModal.classList.add("container_modal");

  const btnEsc = document.createElement("button");
  btnEsc.classList.add("Esc_modal");
  btnEsc.addEventListener("click", EsciModale);
  btnEsc.textContent = "Esci";

  const btnCondividi = document.createElement("button");
  btnCondividi.classList.add("btnCond");
  btnCondividi.textContent = "Condividi";
  btnCondividi.addEventListener("click", Condividi);

  const titoloPost = document.createElement("input");
  titoloPost.type = "text";
  titoloPost.classList.add("titolo");
  titoloPost.placeholder = "Inserisci un titolo";

  const iframeVideo = document.createElement("iframe");
  iframeVideo.classList.add("img_condivisione");
  iframeVideo.src = container;

  boxTrovato.appendChild(containerModal);
  containerModal.appendChild(titoloPost);
  containerModal.appendChild(iframeVideo);
  containerModal.appendChild(btnEsc);

  containerModal.appendChild(btnCondividi);
}

function EsciModale(event) {
  const Esc = document.querySelector(".modale");
  Esc.classList.add("hidden");
}

//Condividi il post
function Condividi(event) {
  const controltitolo = document.querySelector(".titolo");

  if (controltitolo.value == "") {
    alert("Inserisci un titolo al Post");
  } else {
    const titolo = document.querySelector(".titolo");
    const img = document.querySelector(".img_condivisione");

    const formData = new FormData();

    formData.append("titolo", titolo.value);
    formData.append("img_condivisione", img.src);

    fetch("http://localhost/HM1/condivisione_post.php", {
      method: "post",
      body: formData,
    })
      .then(onResponse)
      .then(RitornoHome);

    function onResponse(response) {
      return response.json();
    }

    function RitornoHome() {
      location.href = "home.php";
    }
  }
}

const btnCerca = document.querySelector(".btn");
btnCerca.addEventListener("click", Post);

//permette l'autentificazione da parte del servizio Api in questo caso google.
function Autentificazione(event) {
  window.location.href = "api_youtube.php";
}

const btnAutentificazione = document.querySelector(".btnAutentificazione");
btnAutentificazione.addEventListener("click", Autentificazione);
