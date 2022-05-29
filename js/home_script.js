window.onload = VisualizzaPost();
//permette di visualizzare i post pubblicati dalle persone seguite

function VisualizzaPost() {
  const formdata = new FormData();

  formdata.append("post_seguito", "post_da_seguire");

  fetch("http://localhost/HM1/home_post.php", {
    method: "post",
    body: formdata,
  })
    .then(onResponse)
    .then(stampaPost);

  function onResponse(response) {
    return response.json();
  }

  function stampaPost(json) {
    console.log(json);

    const boxTrovato = document.querySelector(".container_post_utenti");
    boxTrovato.classList.remove("hidden");

    boxTrovato.innerHTML = "";

    for (OgniPost of json) {
      console.log(OgniPost);
      const boxPost = document.createElement("div");
      boxPost.classList.add("box_post");

      const cont_profilo = document.createElement("div");
      cont_profilo.classList.add("cont_profil");

      const imgProfilo = document.createElement("img");
      imgProfilo.classList.add("immaginetta_profilo");
      imgProfilo.src = OgniPost.immagine;

      const utente = document.createElement("text");
      utente.classList.add("username");
      utente.textContent = OgniPost.username;

      const box_infoPost = document.createElement("div");
      box_infoPost.classList.add("infPost");

      const titolo_post = document.createElement("text");
      titolo_post.classList.add("titolo_post");
      titolo_post.textContent = OgniPost.titolo;

      const data_pubblicazione = document.createElement("text");
      data_pubblicazione.classList.add("data_pubblic");
      data_pubblicazione.textContent = OgniPost.data;

      const div_btn = document.createElement("div");
      div_btn.classList.add("contain");

      const btnLike = document.createElement("button");
      btnLike.classList.add("btnlike");
      btnLike.textContent = "Mi Piace";
      btnLike.id = OgniPost.id_post;
      btnLike.name = OgniPost.img;

      btnLike.addEventListener("click", LikePost);

      const btnNonLike = document.createElement("button");
      btnNonLike.classList.add("btn_non_like");
      btnNonLike.textContent = "Non Mi Piace più";
      btnNonLike.id = OgniPost.id_post;
      btnNonLike.name = OgniPost.img;

      btnNonLike.addEventListener("click", NonLikePost);

      if (OgniPost.mipiace == "si") {
        btnLike.classList.add("hidden");
      } else {
        btnNonLike.classList.add("hidden");
      }

      const btnTuttiLike = document.createElement("button");
      btnTuttiLike.classList.add("btnTuttilike");
      btnTuttiLike.textContent = 'Vedi i "Mi piace"';
      btnTuttiLike.addEventListener("click", TuttiLike);
      btnTuttiLike.id = OgniPost.id_post;

      boxTrovato.appendChild(boxPost);
      boxPost.appendChild(cont_profilo);
      cont_profilo.appendChild(imgProfilo);
      cont_profilo.appendChild(utente);
      boxPost.appendChild(box_infoPost);

      //controllo se il post è una gif o un video
      let esito = new RegExp("https://media.giphy.com/media/").test(
        OgniPost.img
      );
      if (esito == true) {
        const imgPost = document.createElement("img");
        imgPost.classList.add("img_post");
        imgPost.src = OgniPost.img;
        boxPost.appendChild(imgPost);
      } else {
        const iframeVideo = document.createElement("iframe");
        iframeVideo.classList.add("iframe_video");
        iframeVideo.src = OgniPost.img;
        boxPost.appendChild(iframeVideo);
      }

      box_infoPost.appendChild(titolo_post);
      box_infoPost.appendChild(data_pubblicazione);
      boxPost.appendChild(div_btn);
      div_btn.appendChild(btnLike);
      div_btn.appendChild(btnNonLike);
      div_btn.appendChild(btnTuttiLike);
    }
  }
}
//stabilisce quale tasto inserire
function LikePost(event) {
  const Like_Post = event.currentTarget;

  const formdata = new FormData();

  formdata.append("like_post", Like_Post.id);

  fetch("http://localhost/HM1/like_post.php", {
    method: "post",
    body: formdata,
  })
    .then(onResponse)
    .then(LikePost);

  function onResponse(response) {
    return response.text();
  }
  //scambia il bottone
  function LikePost(text) {
    const ScambioBtn = document.getElementsByName(Like_Post.name)[1];
    ScambioBtn.classList.remove("hidden");
    Like_Post.classList.add("hidden");
  }
}

function NonLikePost(event) {
  const NonLike_Post = event.currentTarget;

  const formdata = new FormData();

  formdata.append("NonLike_Post", NonLike_Post.id);

  fetch("http://localhost/HM1/like_post.php", {
    method: "post",
    body: formdata,
  })
    .then(onResponse)
    .then(NonLikePost);

  function onResponse(response) {
    return response.text();
  }

  function NonLikePost(text) {
    const ScambioBtn = document.getElementsByName(NonLike_Post.name)[0];
    ScambioBtn.classList.remove("hidden");
    NonLike_Post.classList.add("hidden");
  }
}

function TuttiLike(event) {
  const btnLikeId = event.currentTarget;

  const formdata = new FormData();

  formdata.append("tuttilike_post", btnLikeId.id);

  fetch("http://localhost/HM1/tuttilike_post.php", {
    method: "post",
    body: formdata,
  })
    .then(onResponse)
    .then(TuttiLikePost);

  function onResponse(response) {
    return response.json();
  }

  //visualizza tutte le person che hanno inserito il like a quel post
  function TuttiLikePost(json) {
    if (json == 0) {
      alert("Non ci sono like a questo post");
    } else {
      for (OgniUtente of json) {
        const boxTrovato = document.querySelector(".modale_tuttilike");
        boxTrovato.classList.remove("hidden");

        const box = document.createElement("div");
        box.classList.add("cont");

        boxTrovato.appendChild(box);

        boxTrovato.innerHTML = "";

        for (OgniUtente of json) {
          const boxProfili = document.createElement("div");
          boxProfili.classList.add("cont_profili");

          const imgProfili = document.createElement("img");
          imgProfili.classList.add("img_profilo");
          imgProfili.src = OgniUtente.immagine;

          const utenti = document.createElement("text");
          utenti.classList.add("username_like");
          utenti.textContent = OgniUtente.username;

          const btnEsc = document.createElement("button");
          btnEsc.classList.add("Esc_modal");
          btnEsc.addEventListener("click", EsciModale);
          btnEsc.textContent = "Esci";

          boxTrovato.appendChild(box);
          box.appendChild(boxProfili);
          boxProfili.appendChild(imgProfili);
          boxProfili.appendChild(utenti);
        }
        const btnEsc = document.createElement("button");
        btnEsc.classList.add("Esc_modal");
        btnEsc.addEventListener("click", EsciModale);
        btnEsc.textContent = "Esci";

        box.appendChild(btnEsc);
      }
    }
  }
}

//esce dalla modale di tuttilike
function EsciModale(event) {
  const Esc = document.querySelector(".modale_tuttilike");
  Esc.classList.add("hidden");
}
