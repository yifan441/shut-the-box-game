const again_btn = document.getElementById("againbtn");
const forceupdate_btn = document.getElementById("updatebtn");
const stop_btn = document.getElementById("stopbtn");
const scores = document.getElementById("scores");

again_btn.addEventListener("click", again_func);
forceupdate_btn.addEventListener("click", forceupdate_func);
stop_btn.addEventListener("click", stop_func);

let timeoutID = null;
window.onload = function () {
  print_scores();
};

function print_scores() {
  timeoutID = setTimeout(print_scores, 8000);

  const request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      scores.innerHTML = this.responseText.split("\n").join("<br>");
    }
  };

  request.open("GET", "scores.txt" + "?v=" + Math.random());
  request.send();
}

function again_func() {
  location.href = "welcome.php";
}

function stop_func() {
  clearTimeout(timeoutID);
}

function forceupdate_func() {
  stop_func();
  print_scores();
}
