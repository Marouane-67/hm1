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

<link rel="stylesheet" href="css/create_post.css?ts=<?=time()?>&quot"/>

<script src="js/create_post.js" defer="true"></script>



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

<div class="container_form_post">

<label><input type="search" id="search_post" placeholder="Cerca Post"><button class="btn">Cerca</button><button class='btnAutentificazione'>Autentificazione</button></label>
<select id="api">

         <option value=""> </option>
         <option value="giphy"> Giphy </option>
         <option  value="YouTube">Youtube</option>

       </select>
</div>





<div class="container_giphy">


</div>
</div>





<footer>
    <p>
      Developed by Marouane Raoudi 2022
    </p>
  </footer>





  <div class="modale hidden">
  

 
  </div>



</body>
</html>