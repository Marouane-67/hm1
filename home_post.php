<?php

             session_start();
             if(!isset($_SESSION['username']))
             {
               header("Location: index.php");
             }
             else{

             $username=$_SESSION['username'];

             
             include "connessione.php";
              
          

             //seleziono tutti i post pubblicati dalle persone che seguo
             $array[]=NULL;
             $i=0;

              $query="SELECT distinct post.id_post,post.username,post.titolo,post.img,post.n_like,post.data,utente.nome,utente.cognome,utente.immagine
              FROM post join utente on post.username=utente.username where utente.username in(select utente2 from segui where utente1='$username')
              union (SELECT distinct post.id_post,post.username,post.titolo,post.img,post.n_like,post.data,utente.nome,utente.cognome,utente.immagine 
              from post join utente on post.username=utente.username where utente.username='$username') order by data DESC ";


            
             $result=mysqli_query($conn, $query);
            
        
               //itera i risultati trovati nella query e li trasforma in array 
               while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
       {
            
        
             
            $id_post=$row['id_post'];
            
            $array[$i]=$row;

            $query2="SELECT * from like_post where id_post='$id_post' and username_like='$username'";
            
            $result2=mysqli_query($conn, $query2);
            $row=mysqli_num_rows($result2);


            if($row>0){

          $array[$i]=array_merge($array[$i], array("mipiace"=>"si"));
            
           }
           else{
   
             $array[$i]=array_merge($array[$i], array("mipiace"=>"no"));
   
           }
     
            $i++;
              
       }
              
             if($array==NULL){
                         
              echo 0;
             }
             else{

              echo json_encode($array);


             }


       }
      
    
 

?>