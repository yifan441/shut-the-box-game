#!/usr/local/bin/php
<?php 

  if (isset($_POST['username'])){
    $file = fopen('scores.txt', 'a');
    fwrite($file, "{$_POST['username']} {$_POST['score']}\n");
    fclose($file); 
  }
  else {
    echo 'username and score has not been posted yet'; 
  }
?>
