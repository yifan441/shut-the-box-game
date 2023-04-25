#!/usr/local/bin/php
<?php
  session_save_path(__DIR__ . '/sessions/');
  session_name('shutTheBox');
  session_start();

  // storing whether user is welcome or not
  $welcome = isset($_SESSION['loggedin']) && $_SESSION['loggedin'];

  if(!$welcome){
    header('Location: login.php');
  }
?>


<!DOCTYPE html>

<html lang = "en">
  <head>
    <meta charset = "UTF-8">
    <title>Shut the Box</title>
    <script src="username.js?version=2" defer></script>
    <script src="welcome.js?version=2" defer></script>
  </head>

  <body>
    <header><h1>Welcome! Ready to play "Shut The Box?"</h1></header>
    <main>
      <section>
        <h2>Choose a username</h2>
        <p>
        So that we can post your score(s), please choose a username.
        </p>
        <fieldset>
          <label>
            Username:
            <input id="username_input">
          </label>
          <input type="button" value="Submit" id="submit_btn">
        </fieldset>
      </section>
    </main>

    <footer>
      <hr>
      <small>&copy; Yifan Tang, 2022</small>
    </footer>
  </body>
</html>