<?php
    //connessione databaese
    $conn=mysqli_connect("localhost","root", "") or die (mysqli_connect_error());

    //controlla connessione database
    if(!$conn){
      die ('Non riesco a connettermi: ' . mysqli_connect_error());
    }
    else
    //selezione database

    $db_selected=mysqli_select_db($conn,"thezone") or die (mysqli_connect_error());
    
  //controllo selezione dabatabese
    if(!$db_selected)
    {
      die("Errore nella selezione del database: " . mysqli_connect_error());
    }


?>