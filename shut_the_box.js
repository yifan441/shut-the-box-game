let dice_roll = null;
const dice_result = document.getElementsByTagName('span')[0];
const roll_dice_btn = document.getElementsByTagName('input')[0];
const submit_btn = document.getElementsByTagName('input')[10];
const finish_btn = document.getElementsByTagName('input')[11];
const boxes = document.getElementsByTagName('td'); // weird
const checkboxes = document.getElementsByTagName('input'); // weird

// Add 12 event listeners.
roll_dice_btn.addEventListener('click', roll_dice);
submit_btn.addEventListener('click', submit);
finish_btn.addEventListener('click', finish);

// adding event listeners to boxes (numbers)
// idk it works rn but it's weird 
for (let i = 0; i < 9; ++i) {
  boxes[i].addEventListener('click', function check_num() {
    if (checkboxes[i + 1].checked) {
      checkboxes[i + 1].click();
    } else {

      checkboxes[i + 1].click();
    }
  });
}

// disable submit button when page loads
window.onload = function() {
  submit_btn.disabled = !submit_btn.disabled;
}


function roll_dice() {
  // Roll dice, inject text, disable / enable buttons.
  let dice1 = Math.floor(1 + 6 * Math.random());
  let dice2 = Math.floor(1 + 6 * Math.random());
  dice_roll = dice1 + dice2;

  let result = `${dice1} + ${dice2} = ${dice_roll}`;

  dice_result.innerHTML = result;

  // disable ROLL DICE button 
  roll_dice_btn.disabled = !roll_dice_btn.disabled;
  // enable SUBMIT button 
  submit_btn.disabled = !submit_btn.disabled;
}


function roll_die() {  
  // Roll single die, inject text, disable / enable buttons.
  let die = Math.floor(1 + 6 * Math.random());
  dice_roll = die;
  let result = `${die}`;

  dice_result.innerHTML = result;

  // disable ROLL DICE button 
  roll_dice_btn.disabled = true;
  // enable SUBMIT button 
  submit_btn.disabled = false;
}


function sum_checked_values() {
  let sum = 0;
  for (let i = 1; i < 10; ++i) {
    if (checkboxes[i].checked) {
      sum += i;
    }
  }
  return sum;
}


// my own added function 
function sum_remaining() {
  let sum = 0;
  for (let i = 1; i < 10; ++i) {
    if (!checkboxes[i].disabled) {
      sum += i;
    }
  }
  return sum; 
}


function submit() {
  // INVALID MOVE
  if (sum_checked_values() !== dice_roll) {
    alert('The total of the boxes you selected does not match the dice roll.\nPlease make another selection and try again.');
  }
  // VALID MOVE
  else {
    // uncheck + disable used checkboxes 
    for (let i = 1; i < 10; ++i) {
      if (checkboxes[i].checked) {
        checkboxes[i].click();
        checkboxes[i].disabled = !checkboxes[i].disabled;
      }
    }
    // check if remaining boxes <= 6
    if (sum_remaining() <= 6) {
      roll_dice_btn.addEventListener('click', roll_die);
    }
    // clear last dice roll 
    dice_result.innerHTML = ''; 
    // disable SUBMIT 
    submit_btn.disabled = !submit_btn.disabled;
    // enable ROLL DICE 
    roll_dice_btn.disabled = !roll_dice_btn.disabled;
  }

}

function get_username() {
  const cookies = document.cookie.split('; ');
  
  for (const cookie of cookies) {
    if (cookie.startsWith('username=')){
      return cookie.substring('username='.length);
    }
  }
  return '';
}

function finish() {
  // alert user to score 
  alert(`Your score is ${sum_remaining()}`);
  

  // disable all buttons 
  if (sum_remaining()===45){
    if (!roll_dice_btn.disabled){
      roll_dice_btn.disabled = !roll_dice_btn.disabled;
    }
    if (!submit_btn.disabled){
      submit_btn.disabled = !submit_btn.disabled;    
    }
    finish_btn.disabled = !finish_btn.disabled; 
  } else{
    finish_btn.disabled = !finish_btn.disabled; 
    submit_btn.disabled = !submit_btn.disabled;      
  }

  // MAKE AJAX POST REQUEST --> score.php
  const request = new XMLHttpRequest(); 

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200){
      location.href = 'scores.php';      
    }
  };

  request.open('POST','score.php');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  let username = get_username()
  //let userscore = `username=${$_COOKIE['username']}&score=${sum_remaining()}`;
  let userscore = `username=${username}&score=${sum_remaining()}`;

  request.send(userscore);  

}

