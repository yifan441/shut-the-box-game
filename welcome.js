const submit_btn = document.getElementById("submit_btn");
const textbox = document.getElementById("username_input");

window.onload = function () {
  if (get_username() !== "") {
    document.getElementById("username_input").value = get_username();
  }
};

submit_btn.addEventListener("click", check_username);
textbox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    check_username();
  }
});

function check_username() {
  let a = false; // NOT between 5 and 40 characters (inclusive)
  let b = false; // DOES include spaces, commas, semicolons, =, or &
  let c = false; // each character is NOT either an alphanumeric or contained in the following string: !@#$%^*()-_+[]{}:'|`~<.>/?

  let u = textbox.value;
  let alert_message = "";

  if (u === "") {
    window.alert("Please enter a username");
  }

  //------CHECK WHICH POINTS ARE VIOLATED-------//

  // check between 5 and 40 characters (inclusive)
  if (!(u.length >= 5) || !(u.length <= 40)) {
    a = true;
  }

  // check does not include spaces, commas, semicolons, =, or &
  if (
    u.includes(" ") ||
    u.includes(",") ||
    u.includes(";") ||
    u.includes("=") ||
    u.includes("&")
  ) {
    b = true;
  }

  // checks if each character is either an alphanumeric or contained in the following string: !@#$%^*()-_+[]{}:'|`~<.>/?
  let re = /^[A-z0-9!@#\$%\^\*\-_+\(\)\[\]\{\}:'\|`~<.>\/\?]+$/g;

  if (!u.match(re)) {
    c = true;
  }

  //------DECIDE WHICH MESSAGES TO ALERT-------//

  if (a || b) {
    // violates 1st or/and 2nd point
    if (!(u.length >= 5)) {
      alert_message += "Username must be 5 characters or longer.\n";
    }
    if (!(u.length <= 40)) {
      alert_message += "Username must be 40 characters or less.\n";
    }
    if (u.includes(" ")) {
      alert_message += "Username cannot contain spaces.\n";
    }
    if (u.includes(",")) {
      alert_message += "Username cannot contain commas.\n";
    }
    if (u.includes(";")) {
      alert_message += "Username cannot contain semicolons.\n";
    }
    if (u.includes("=")) {
      alert_message += "Username cannot contain =.\n";
    }
    if (u.includes("&")) {
      alert_message += "Username cannot contain &.\n";
    }

    alert(alert_message);
  } else if (c) {
    // violates 3rd point
    alert_message = `Username can only use characters from the following string:
    abcdefghijklmnopqrstuvwxyz
    ABCDEFGHIJKLMNOPQRSTUVWXYZ
    0123456789
    !@#$%^*()-_+[]{}:'|\`~<.>/?`;

    alert(alert_message);
  } else {
    // everything ok add to cookie
    document.cookie = `${"username=" + u}; expires=${hour_in_future()}`;

    // then redirect
    window.location.href = "shut_the_box.php";
  }
}

function hour_in_future() {
  let hour_in_future = new Date();
  hour_in_future.setHours(hour_in_future.getHours() + 1);
  return hour_in_future.toUTCString();
}
