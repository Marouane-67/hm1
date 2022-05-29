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

include "connessione.php";

     
        if(isset($_POST['ricerca_stringa']) && isset($_POST['ricerca_servizio'])){

             
            $string=mysqli_real_escape_string($conn, $_POST['ricerca_stringa']);
            $servizio=mysqli_real_escape_string($conn, $_POST['ricerca_servizio']);

            if($servizio=='giphy'){

            //inizializza la richiesta a giphy
            $curl= curl_init();

            //settiamo l'url dove fare la richiesta inserendo la stringa inserita dall'utente
            curl_setopt($curl, CURLOPT_URL, "https://api.giphy.com/v1/gifs/search?api_key=oiV402o1SVs2O7T9Zrjm5BJ6l2YFy8ye&q=".$string."&limit=25&offset=0&rating=G&lang=it");

            //setto gli header, informazioni che ci servono per restiturci i risultati in json 
             curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));

             //restituisce il risultato come stringa
             curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
             
             //gestione degli errori
             if(($result=curl_exec($curl))=== false){

                echo "Errore" .curl_error($curl); //aggiungeger curl errno.


    
             }
                   // se la chiamata va a buon fine
             else{


                echo $result;
             }
            
            // chiudi chiamata
            curl_close($curl);

        } 
        // chiamata verso 
        elseif($servizio=='YouTube'){

         

          $token= $_SESSION['access_token'] ['access_token'];


             //inizializza la richiesta a 
            $curl= curl_init();

            //settiamo l'url dove fare la richiesta inserendo la stringa inserita dall'utente
            curl_setopt($curl, CURLOPT_URL, "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=".$string."&key=AIzaSyDvI_vMceNgQ53kD0gFdfoRJ9ElcuZfaRE");

            //setto gli header, informazioni che ci servono per restiturci i risultati in json 
             curl_setopt($curl, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: Bearer '.$token.''));

             //restituisce il risultato come stringa
             curl_setopt($curl, CURLOPT_RETURNTRANSFER,1 );
             
             //gestione degli errori
             if(($result=curl_exec($curl))=== false){

                echo "Errore" .curl_error($curl); //aggiungeger curl errno.


    
             }
                   // se la chiamata va a buon fine
             else{


                echo $result;
                
             }
            
            // chiudi chiamata
            curl_close($curl);

        }
   }
        
            ?>



          


