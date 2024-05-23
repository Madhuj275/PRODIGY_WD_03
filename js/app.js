//xWin denotes no of times X wins
var xWin = 0;
//oWin denotes no of times O wins
var oWin = 0;
//cnt is for denoting whether its X's or O's turn
var cnt = 0;
//lst is for tracking the game
//-1 ->empty, 0-> x , 1-> o
var lst = [-1,-1,-1,-1,-1,-1,-1,-1,-1]
//mode denotes whether its Play X, Play O, MultiPlayer
var mode = "multi";

var btn = document.getElementsByClassName('btn');
var b = document.getElementsByClassName('menu')
var img = document.getElementsByTagName('img');

//Initially it denotes Multiplayer mode
b[2].style.border = "4px solid white";

function ifClicked(id) {
  if(cnt%2 == 0){
    img[id].src = "assets/x.png";
  }
  else{
    img[id].src = "assets/o.png";
  }
  btn[id].disabled = true;
  img[id].style.zIndex = "1";
  lst[id] = cnt%2;

  cnt++;

  //Each count we check whether match is over or not
  if(isOver(0) && cnt%2 == 1){
    console.log("X wins");
    xWin++;
    document.getElementById('span1').innerHTML = xWin;
    for (var i = 0; i < 9; i++) {
      if (img[i].style.zIndex == "") {
        btn[i].disabled = true;
        img[i].style.visibility = "hidden";
      }
    }
  }
  else if(isOver(1) && cnt%2 == 0){
    console.log("O wins");
    oWin++;
    document.getElementById('span2').innerHTML = oWin;
    for (var i = 0; i < 9; i++) {
      if (img[i].style.zIndex == "") {
        btn[i].disabled = true;
        img[i].style.visibility = "hidden";
      }
    }
  }
  else if(!isOver(0) && !isOver(1) && cnt == 9){
    console.log("Draw");
  }

  if (cnt <= 8) {
    if ((cnt%2 == 0) && mode == "auto_X") {
        //Auto play for X
        computer();
    }
    else if ((cnt%2 != 0) && mode == "auto_O") {
        //Auto play for O
        computer();
    }
  }
}

function computer() {
  var i = 0;
  do {
    var num = Math.floor(Math.random() * 9);
    i++;
  } while (img[num].style.zIndex == "1");
  ifClicked(num);
}

function play(n) {
  b[0].style.border = "4px solid #89ECDA";
  b[1].style.border = "4px solid #89ECDA";
  b[2].style.border = "4px solid #89ECDA";
  mode = n;

  if (mode == "auto_X") {
    b[1].style.border = "4px solid white";
    // b[0].classList.add("menu-hover");
    // b[2].classList.add("menu-hover");
  }
  else if (mode == "auto_O") {
    b[0].style.border = "4px solid white";
    // b[1].classList.add("menu-hover");
    // b[2].classList.add("menu-hover");
  }
  else if (mode == "multi") {
    b[2].style.border = "4px solid white";
    // b[0].classList.add("menu-hover");
    // b[1].classList.add("menu-hover");
  }

  // this restart() is called for ,when we click those three button it should start from new game
  // parameter "fromPlay" prevents calling the ifClicked for second time
  restart("fromPlay");
  if (mode == "auto_X") {
    ifClicked(Math.floor(Math.random() * 9));
  }
}

function restart(text) {
  cnt = 0;
  for (var i = 0; i < 9; i++) {
    btn[i].disabled = false;
    img[i].style.zIndex = "";
    img[i].style.visibility = "visible";
    lst[i] = -1;
  }

  //only fun ifClicked() called when we click the button "Restart"(parameter ->"fromRestart") and its "Play O" mode
  if (mode == "auto_X" && text == "fromRestart") {
    ifClicked(Math.floor(Math.random() * 9));
  }
}

function isOver(x) {
  if( lst[0] == x && lst[1] == x && lst[2] == x ||
      lst[3] == x && lst[4] == x && lst[5] == x ||
      lst[6] == x && lst[7] == x && lst[8] == x ||
      lst[0] == x && lst[3] == x && lst[6] == x ||
      lst[1] == x && lst[4] == x && lst[7] == x ||
      lst[2] == x && lst[5] == x && lst[8] == x ||
      lst[0] == x && lst[4] == x && lst[8] == x ||
      lst[2] == x && lst[4] == x && lst[6] == x ){
        return true;
      }
  else{
    return false;
  }
}
