let headr = document.getElementById("header"); // заголовок
let light = document.querySelectorAll(".light"); // лампочки
let check = document.getElementById("check"); // кнопка проверки
let bPass = [0,0,0,0]; // заданный пароль
let pPass = [0,0,0,0]; // введённый пароль
let guess = false; // нужно, чтобы при повторном нажатии на кнопку проверки, выключались лампочки и т. п.

// прослушивание нажатия на лампочки и кнопку проверки
light.forEach(clicked => {clicked.addEventListener("click",click)});
check.addEventListener("click",checkFunc);

// генерация рандомного числа в заданном диапазоне
function random(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// присваивание рандомного числа в каждый элемент массива
function generate(){
	for(let i = 0; i < bPass.length; i++){
		bPass[i] = random(0,1);
	};
};
generate();

// включение и выключение нажатой лампочки
function click(clicked){
	if(guess === false){
		if(pPass[clicked.target.id] === 0){
			pPass[clicked.target.id] = 1;
			clicked.target.style.backgroundColor = "#0000ff";
			clicked.target.style.boxShadow = "0 0 16px 0 rgba(0, 0, 255, 0.5)";
		}
		else if(pPass[clicked.target.id] === 1){
			pPass[clicked.target.id] = 0;
			clicked.target.style.backgroundColor = "";
			clicked.target.style.boxShadow = "";
		};
	};
};

// проверка угадывания
function checkFunc(){
	if(guess === false){
		guess = true;
		if(bPass.toString() === pPass.toString()){
			document.getElementById("check").innerHTML = "| NEXT> |";
			headr.style.color = "#00ff00";
			check.style.borderColor = "#00ff00";
			check.style.color = "#00ff00";
			console.log("U GUESSED");
			for(let i = 0; i < bPass.length; i++){
				if(bPass[i] === 1){
					light[i].style.backgroundColor = "#00ff00";
					light[i].style.boxShadow = "0 0 16px 0 rgba(0, 255, 0, 0.5)";
				};
			}
		}
		else{
			document.getElementById("check").innerHTML = "| AGAIN |";
			headr.style.color = "#ff0000";
			check.style.borderColor = "#ff0000";
			check.style.color = "#ff0000";
			console.log("U DID NOT GUESS");
			for(let i = 0; i < pPass.length; i++){
				if(pPass[i] === 1){
					light[i].style.backgroundColor = "#ff0000";
					light[i].style.boxShadow = "0 0 16px 0 rgba(255, 0, 0, 0.5)";
				};
			}
		};
	}
	else if(guess === true){
		guess = false;
		document.getElementById("check").innerHTML = "| CHECK |";
		headr.style.color = "#00ff00";
		check.style.borderColor = "#00ff00";
		check.style.color = "#00ff00";
		if(bPass.toString() === pPass.toString()){
			generate()
		};
		pPass = [0,0,0,0];
		headr.style.color = "";
		check.style.borderColor = "";
		check.style.color = "";
		light.forEach(clicked => clicked.style.backgroundColor = "");
		light.forEach(clicked => clicked.style.boxShadow = "");
	};
};