<?php

             
             session_start();
             if(!isset($_SESSION['username']))
             {
               header("Location: index.php");
             }
             else{

             $username_corrente=$_SESSION['username'];

             

            
             include ("connessione.php");

             if(isset($_POST['like_post'])){

                     $id_post=$_POST['like_post'];

               
                 $like="INSERT into like_post(username_like, id_post) VALUES ('$username_corrente', '$id_post')";
                 
                 $n_like="UPDATE post set n_like=n_like+1 where id_post='$id_post'";

                $result_like=mysqli_query($conn, $like) or die("Errore ".mysqli_error($conn));

                 


                $result_n_like=mysqli_query($conn, $n_like) or die("Errore ".mysqli_error($conn));
                 if($result_like==true){
    
                echo '1'; 
      }
               else{

              echo '0';
      }
    
    
 }
   
   else if(isset($_POST['NonLike_Post'])){
    
      $id_post=$_POST['NonLike_Post'];

      
      $nonlike="DELETE from like_post where username_like='$username_corrente' and id_post='$id_post'";
   
      $non_like="UPDATE post set n_like=n_like-1 where id_post='$id_post'";

      $result_non_like=mysqli_query($conn, $non_like) or die("Errore ".mysqli_error($conn));

     $resultnonlike=mysqli_query($conn, $nonlike) or die("Errore ".mysqli_error($conn));

    if($resultnonlike==true){

      echo '1';
    
    }
    else{
      echo '0';
    
    }
}
}

    ?>

           
