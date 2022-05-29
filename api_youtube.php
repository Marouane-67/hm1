<?php

             session_start();
             if(!isset($_SESSION['username']))
             {
               header("Location: index.php");
             }
             else{

             $username=$_SESSION['username'];

             }
      
              include "connessione.php";
             
            
            require_once __DIR__.'/vendor/autoload.php';
          
            
            $client = new Google_Client();
            $client->setAuthConfigFile('client_secret.json');
            $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/HM1/api_youtube.php');
            $client->addScope(Google_Service_Youtube:: YOUTUBE_FORCE_SSL);
            
            if (! isset($_GET['code'])) {
              $auth_url = $client->createAuthUrl();
              header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
            } else {
              $client->authenticate($_GET['code']);
              $_SESSION['access_token'] = $client->getAccessToken();
              $redirect_uri = 'http://' . $_SERVER['HTTP_HOST'] . '/HM1/create_post.php';
              header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
            }
        ?>