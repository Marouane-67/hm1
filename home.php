<?php


             //Avvia la sessione username
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

<link rel="stylesheet" href="css/home_style.css?ts=<?=time()?>&quot"/>
<script src="js/home_script.js" defer="true"></script>
 

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


<div class="container_post_utenti hidden">

</div>



      </div>

<div class="modale_tuttilike hidden">

</div>


  <footer>
    <p>
      Developed by Marouane Raoudi 2022
    </p>
  </footer>

</body>
</html>