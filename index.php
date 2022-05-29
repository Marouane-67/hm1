<?php

include ("connessione.php");
session_start();

if(isset($_POST['btnRegister'])) {

                
                  $nome=mysqli_real_escape_string($conn,$_POST['nome']);
                  $cognome=mysqli_real_escape_string($conn,$_POST['cognome']);
                  $data= mysqli_real_escape_string($conn,$_POST['data']);
                  $email= mysqli_real_escape_string($conn,$_POST['email']);
                  $username=mysqli_real_escape_string($conn,$_POST['username']);
                  $password=mysqli_real_escape_string($conn,$_POST['password']); 
                  $pass2=mysqli_real_escape_string($conn,$_POST['pass2']);  


                 //controlla che i campi sono stati inseriti
                 if(empty($nome) || empty($cognome) || empty($data) || empty($email) || empty($username) || empty($password) || empty($pass2)) {

                    


                    echo "Inserire tutti i campi";

                 }
               



                 else{
                     


                 //Invio i dati al DB
                 $query="INSERT into utente(nome, cognome, data, email, username,password, immagine) VALUES ('$nome', '$cognome', '$data', '$email', '$username', '$password', '$immagine')";

                 //Controlla se la query è andata a buon fine
                    $ris=mysqli_query($conn, $query) or die("Errore ".mysqli_error($conn));
                    $_SESSION['username']=$username;
         
                       header('Location: home.php');
         
                  
          
    
                 }

           
          
           
        }
?>

<?php
//Fase di login

if (isset($_SESSION['session_id'])) {
    header('Location: home.php');
    exit;
}

else{
include('connessione.php');


if (isset($_POST['btnAccedi'])) {



          //recupero dati utente
          $username=$_POST['username'];
         $password=$_POST['password'];
         
         //eventuale sql injection
         
         $username=mysqli_real_escape_string($conn,$username);
         $password=mysqli_real_escape_string($conn,$password);

        
     //Fai la query al DB per l'utente
     $query= "SELECT * from utente  where username='$username' and password='$password'";
      $result=mysqli_query($conn, $query);
      $row=mysqli_num_rows($result);

      if($row==0)
      {

       
        echo "Errore, credenziali non valide";


      }

    
      else
           
      
        {

          session_start();
          $_SESSION['username']=$username;


          header('Location: home.php');
        }
    }
  }
?>









<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">

  <link rel="stylesheet" href="css/style.css?ts=<?=time()?>&quot"/>
  <script src="js/muovi_container.js" defer="true"></script>
  <script src="js/validazione.js" defer="true"></script>
  
  <title>The zone - Iscriviti</title>
</head>

<body>

  <h1>Benvenuto su The zone</h1>

  <div class="container" id="container">
    <div class="form-container sign-up-container">

      <form name="form_registrazione" method="post" action="index.php" enctype="multipart/form-data">

        <p>Create Account</p>
        <input type="text" name="nome" placeholder="Nome"/>
        <input type="text" name="cognome" placeholder="Cognome"/>
        <input type="date" name="data" placeholder="Data Nascita"/>
        <input type="email" name="email" placeholder="Email"/>
        <input type="text"  name="username" class="username" placeholder="Username"/>
        <input type="password" name="password" placeholder="Password"/>
        <input type="password" name="pass2" placeholder="Conferma Password"/>
        <input type="file" name="file"/>
        <button type="submit" name="btnRegister">Registrati</button>
      </form>
</div>

    <div class="form-container sign-in-container">
      <form name="form_accedi" method="post" action="index.php">
        <h1>Accedi al tuo account</h1> 
        <input type="text" name="username" placeholder="Username"/>
        <input type="password" name="password" placeholder="Password"/>
        <a href="recovery_password.php">Non ricordi la password?Clicca qui</a>
        <button type="submit" name="btnAccedi">Sign In</button>
      </form>
    </div>

  
    

  



    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Bentornato</h1>
          <p>Connettiti accedendo al tuo profilo</p>
          <button class="ghost" id="signIn">Sign In</button>
        </div>

        <div class="overlay-panel overlay-right">
          <h1>Ciao, Homie!</h1>
          <p>Inserisci i tuoi dati e accedi alla community</p>
          <button class="ghost" id="signUp">Sign Up</button>
        </div>
      </div>
    </div>
  </div>

  
  
  <footer>
    <p>
    Developed by Marouane Raoudi 2022    </p>
  </footer>


</body>

</html>