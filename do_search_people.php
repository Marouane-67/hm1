<?php 

  session_start();
  if(!isset($_SESSION['username']))
  {
    header("Location: index.php");
  }
  
  $username_corrente=$_SESSION['username'];

   include "connessione.php";


     



   //se viene premuto il bottone ricerca utente
   if(isset($_POST['utente_cercato']))
        {
  $array[]=NULL;
  $i=0;


     
       $utente_cercato=$_POST['utente_cercato'];
       $query="SELECT nome, cognome, username, immagine from utente where username='$utente_cercato' and username<>'$username_corrente'";


        
    
       $result=mysqli_query($conn, $query);
       
       //itera i risultati trovati nella query e li trasforma in array 
       while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
       {
            
  
        $array[$i]=$row;
           
       
        $query2="SELECT utente1, utente2 from segui where utente1='$username_corrente' and utente2='$utente_cercato'";
        $result2=mysqli_query($conn, $query2);
        $row=mysqli_num_rows($result2);

        if($row>0){
       $array[$i]=array_merge($array[$i], array("seguito"=>"si"));

        }
        else{

          $array[$i]=array_merge($array[$i], array("seguito"=>"no"));
        }

         $i++;
        
           

       }
       
           //se è vuoto ritorna zero
       if($array==NULL)
       {
              echo 0;

       }
        //altrimenti mandami la risposta in json
       else{

         echo json_encode($array);
       }



       
       


   }

   //se invece viene premuto il bottone tutti utenti
   else{
     if(isset($_POST['utenti_cercati'])){

      $array[]=NULL;
      $i=0;
         
           $utenti_cercati=$_POST['utenti_cercati'];
           $query="SELECT nome, cognome, username, immagine from utente where username<>'$username_corrente'";
            
          
           $result=mysqli_query($conn, $query);

           while($row=mysqli_fetch_array($result, MYSQLI_ASSOC)){
             
           
            $utente2=$row['username'];
            $array[$i]=$row;
           
            $query2="SELECT utente1, utente2 from segui where utente1='$username_corrente' and utente2='$utente2'";
            $result2=mysqli_query($conn, $query2);
            $row=mysqli_num_rows($result2);

        if($row>0){
       $array[$i]=array_merge($array[$i], array("seguito"=>"si"));
       
       




        }
        else{

          $array[$i]=array_merge($array[$i], array("seguito"=>"no"));

        }


         
         $i++;
       }
      
       if($array==NULL)
       {
              echo 0;

       }
        //altrimenti mandami la risposta in json
       else{

         echo json_encode($array);
       }


     }
   }

if(isset($_POST['utenteseguito'])){

$utente2=$_POST['utenteseguito'];

  //inserisci i valori all'interno del database.
  $segui="INSERT into segui(utente1, utente2) VALUES ('$username_corrente', '$utente2')"; 
  $result_segui=mysqli_query($conn, $segui) or die("Errore ".mysqli_error($conn));

  if($result_segui==true){

   echo '1';


  }
  else{
         echo '0';
  }


}
//se viene premuto il bottone non segui formdata 
if(isset($_POST['utentenonseguito'])){

  $utente2=$_POST['utentenonseguito'];
  //togli i valori nel database.
  $nonsegui="DELETE from segui where utente1='$username_corrente' and utente2='$utente2'";
  //controllo la query
 $resultnonsegui=mysqli_query($conn, $nonsegui) or die("Errore ".mysqli_error($conn));
if($resultnonsegui==true){
  echo '1';

}
else{
  echo '0';

}
}


?>
