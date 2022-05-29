<?php
        
        session_start();
                
        if(!isset($_SESSION['username'])){

               header("Location: index.php");
        }
        else{
            
              $username=$_SESSION['username'];         
             
        }
             include "connessione.php";

             if(isset($_POST['titolo']) && isset($_POST['img_condivisione'])){

                $titolo=mysqli_real_escape_string($conn, $_POST['titolo']);
                $img_condivisa=mysqli_real_escape_string($conn, $_POST['img_condivisione']);
                $data=date('Y-m-d H:i:s');

            $query="INSERT into post(username, titolo, data, img, n_like) VALUES ('$username', '$titolo', '$data', '$img_condivisa', '0') ";
            $result=mysqli_query($conn, $query) or die("Errore ".mysqli_error($conn));
             
            if($result==true){
                echo 1;
            }
            else
            {
                echo 0;
            }
             }

       ?>