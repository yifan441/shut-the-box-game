#!/usr/local/bin/php
<?php
  session_save_path(__DIR__ . '/sessions/');
  session_name('shutTheBox');
  session_start();

  // storing whether user is welcome or not
  $welcome = isset($_SESSION['loggedin']) && $_SESSION['loggedin'];

  // check if logged in (if not redirect --> login.php)
  if(!$welcome){
    header('Location: login.php');
  }
?>

<!DOCTYPE html>

<html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>Shut The Box</title>
    <script src="scores.js?version=4" defer></script>
  </head>

  <body>
    <header>
      <h1>Shut The Box</h1>
    </header>

    <main>
      <section>
        <h2>
          Scores 
        </h2>
        <p>
        Well done! Here are the scores so far...
        </p>
        <p id="scores">
        
        </p>
        <fieldset>
          <input type="button" value="PLAY AGAIN!!" id="againbtn">
        </fieldset>
        <fieldset>
           <input type="button" value="Force update/ start updating" id="updatebtn">
           <input type="button" value="Stop updating" id="stopbtn">
        </fieldset>
      </section>

    </main>

    <footer>
      <hr>
      <small>&copy; Yifan Tang, 2022</small>
    </footer>
  </body>




</html>
