#!/usr/local/bin/php
<?php
  session_save_path(__DIR__ . '/sessions/');
  session_name('shutTheBox');
  session_start();

  // at the beginning there are no incorrect submissions
  $wrong_pass = false; 

  if (isset($_POST['passwordSubmitted'])) {
    validate($_POST['passwordSubmitted'], $wrong_pass);
  }
  
  function validate($submiss, &$wrong_pass){
    // reading the h_password.txt file to get password
    $file = fopen('h_password.txt', 'r') or die('Unable to find the hashed password');

    $hashed_password = fgets($file);
    $hashed_password = trim($hashed_password);

    fclose($file);

    // hash and check user submitted password matches 
    $hashed_submiss = hash('md2', $submiss);

    if ($hashed_submiss !== $hashed_password) {
      $_SESSION['loggedin'] = false;
      $wrong_pass = true;
    } else {
      $_SESSION['loggedin'] = true;
      header('Location: welcome.php');
      exit;
    }
  }
?>



<!DOCTYPE html>

<html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>Shut the Box</title>
  </head>

  <body>
    <header>
      <h1>Welcome! Ready to play "Shut The Box"?</h1>
    </header>
    <main>
      <section>
        <h2>Login</h2>
        <p>In order to play you need the password.</p>
        <p>If you know it, please enter it below and login.</p>
      </section>
      <fieldset>
          <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <label for="passwordEntry">Password: </label>
            <input id="passwordEntry" type="password" name="passwordSubmitted">
            <input type="submit" value="Login">
          </form>
        </fieldset>

      <?php
        if($wrong_pass){
          echo '<p>Invalid password!</p>';
        }
      ?>
    </main>

    <footer>
      <hr>
      <small>&copy; Yifan Tang, 2022</small>
    </footer>
  </body>

</html>
