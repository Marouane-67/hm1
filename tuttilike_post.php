<?php

             //Avvia la sessione username
             session_start();
             if(!isset($_SESSION['username']))
             {
               header("Location: index.php");
             }
             else{

                include "connessione.php";

             $username=$_SESSION['username'];

             $id_post=$_POST['tuttilike_post'];

           
               $array[]=NULL;
               $i=0;
             if(isset($_POST['tuttilike_post'])){
      
                $id_post=$_POST['tuttilike_post'];


                //selezione tutte le persone che hanno messo like a quel post
                $query="SELECT U.username, U.immagine, L.id_post FROM utente U  JOIN like_post L ON L.username_like=U.username WHERE L.id_post='$id_post' ";
        

             
             $result=mysqli_query($conn, $query);
            

               //itera i risultati trovati nella query e li trasforma in array 
               while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
       {
                $array[$i]=$row;
                $i++;
       }
              
             if($array==NULL){
                         
              echo 0;
             }
             else{

              echo json_encode($array);


             }


            }
             
             }
        


?>


