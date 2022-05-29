<?php

             session_start();
             if(!isset($_SESSION['username']))
             {
               header("Location: index.php");
             }
             else{

             $username=$_SESSION['username'];

             }

       ?>
<!DOCTYPE html>
<head>
<meta charset="utf-8">

<link rel="stylesheet" href="css/search_people.css?ts=<?=time()?>&quot"/>

<script src="js/search_people.js" defer="true"></script>



</head>
<body>
<div class="container" id="container">

<header>
            <nav>
                <div id="s_nav">
                </div>
                <div class="l_nav">
                    <h1>The zone</h1>
                    <a href="home.php">Home</a>
                    <a href="search_people.php">Ricerca utenti</a>
                    <a href="logout.php">Logout</a><br><br>
                </div>
                <div class="r_nav">
                    <a href="create_post.php">Nuovo post</a>
                </div>
            </nav>
        </header>
     <img class="immagine_base" src="./img/cover.jpg"></img>


    <div class="search_people">
<label>Ricerca Utenti<input type="search" id="search_people"></label>
<div class="btnCerca">
<button  class="CercaUtente">Ricerca Utente</button> 
<button  class="TuttiUtenti">Visualizza tutti gli utenti</button>
            </div>   
            </div>




     <div class="utenti_trovati hidden">
 
  
     </div>
</div>


            





  <footer>
    <p>
    Developed by Marouane Raoudi 2022    </p>
  </footer>

</body>
</html>