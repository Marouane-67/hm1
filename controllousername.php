<?php


//includi connessione Database
include ("connessione.php");
session_start();

if(isset($_POST['validation'])){

    $username=$_POST['validation'];

    $query="SELECT username from utente where username='$username'";
 
   $ris=mysqli_query($conn, $query);
   $row=mysqli_num_rows($ris);
   
   //username vuoto
   if($row==0){
       echo 0;
   }
     //username già usato
   else{
       echo 1;
   }

}

?>