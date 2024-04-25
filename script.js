const EMENU = document.getElementById("menu");
const EQUIZ = document.getElementById("quiz");
const ELIFE = document.getElementById("lifes");
const ECHOI = document.getElementById("choices");
const EWORD = {
    'PT': document.getElementById("word-pt"),
    'JP': document.getElementById("word-jp")
}

const ETITLE = document.getElementById("title");

const ESCORE   = document.getElementById("score");
const EHSCORE  = document.getElementById("highscore");
const EQHSCORE = document.getElementById("qhighscore");
const EMSCORE  = document.getElementById("mscore");
const EBSTART  = document.getElementById("btn-start");

const WORDS = {
    "Karate (空⼿)": "Caminho das mãos vazias",
    "Sensei (先⽣)": "Professor",
    "Dojo (道場)": "Local de treinamento",
    "Karate Gi (着)": "Uniforme de karatê",
    "Obi (帯)": "Faixa",
    "Kihon (基本)": "Fundamentos básicos",
    "Kata (形)": "Sequência de movimentos",
    "Kumite (組⼿)": "Luta ou combate controlado",
    "Mae Geri (前蹴り)": "Chute frontal",
    "Ushiro Geri (後ろ蹴り)": "Chute para trás",
    "Oi Tsuki (追い突き)": "Soco avançado",
    "Guedan Barai (下段払い)": "Bloqueio para baixo",
    "Ashi Barai (⾜払い)": "Varredura de perna",
    "Seiken (正拳)": "Soco Mão fechada",
    "Empi (肘)": "Cotovelo",
    "Mawashi Geri (回し蹴り)": "Chute circular",
    "Yoi (⽤意)": "Posição de prontidão",
    "Zanshin (残⼼)": "Mentalidade de alerta",
    "Otoshi Empi (燕⾶び打ち)": "Cotovelo descendente",
    "Hiza Geri (膝蹴り)": "Chute com o joelho",
    "Maai (間合い)": "Distância entre os oponentes",
    "Tsuki (突き)": "Soco",
    "Yame (⽌め)": "Parar",
    "Kime (決め)": "Foco ou concentração",
    "Hajime (始め)": "Começar",
    "Shomen (正⾯)": "Frente",
    "Haito Uchi (廃⼑打ち)": "Golpe com parte de dentro da mão aberta",
    "Soto Uke (外受け)": "Bloqueio com parte externa braço",
    "Uchi Uke (内受け)": "Bloqueio com parte interna braço",
    "Gyaku Tsuki (逆突き)": "Soco invertido",
    "Kiai (気合)": "Grito de energia",
    "Tori (取り)": "Aquele que executa a técnica",
    "Uke (受け)": "Aquele que recebe a técnica",
    "Mokuso (黙想)": "Meditação",
    "Shihan (師範)": "Mestre ou professor sênior",
    "Waza (技)": "Técnica",
    "Gohon Kumite (五本組⼿)": "Combate de cinco movimentos",
    "Randori (乱取り)": "Luta livre ou combate não prédeterminado",
    "Shuto Uchi (⼿⼑打ち)": "Golpe de mão de faca",
    "Kiza Dachi (跪座)": "Posição de joelho",
    "Hantei (判定)": "Julgamento ou decisão",
    "Jodan (上段)": "Área superior ou alta do corpo",
    "Chudan (中段)": "Área média do corpo",
    "Guedan (下段)": "Área inferior ou baixa do corpo",
    "Rei (礼)": "Saudação",
    "Kokyu (呼吸)": "Respiração",
    "Kosa Dachi (交差⽴ち)": "Posição cruzada",
    "Sanbon Kumite (三本組⼿)": "Combate de três movimentos",
    "Encho Sen (遠跳戦)": "Estratégia de manter a distância",
    "Tenshin (転⾝)": "Movimento evasivo"
};

let answer = 0;
let lifes = 3;
let score = 0;
let highscore = 0;

function startGame() {
    score = 0;
    
    hideMenu();
    fillQuiz();
    fillLifes();
}

function hideQuiz() {
    EMENU.hidden = false;
    EQUIZ.hidden = true;
}

function hideMenu() {
    EMENU.hidden = true;
    EQUIZ.hidden = false;
}

function fillQuiz() {
    let rndWord = Object.keys(WORDS)[Math.floor(Math.random() * 50)];
    let rndAnswer = WORDS[rndWord];

    let choices = [rndAnswer];
    while(choices.length < 4) {
        let rndChoice = Object.values(WORDS)[Math.floor(Math.random() * 50)];
        if(!choices.includes(rndChoice)) {
            choices.push(rndChoice);
        }
    }
    
    let rndPos = Math.floor(Math.random() * 4);
    choices[0] = choices[rndPos];
    choices[rndPos] = rndAnswer;
    
    answer = rndPos;
    EWORD.PT.innerHTML = rndWord.substring(0, rndWord.indexOf('(')-1);
    EWORD.JP.innerHTML = rndWord.substring(rndWord.indexOf('(')+1, rndWord.length-1);
    let eChoices = ECHOI.getElementsByTagName("span");

    for(let c=0; c < eChoices.length; c++) {
        eChoices[c].innerHTML = choices[c];
        eChoices[c].dataset.state = "";
    }

    updateScore();
}

function guessChoice(choice) {
    if(choice == answer) {
        score++;
        if(score > highscore) {
            EQHSCORE.innerHTML = score;
        }
        fillQuiz();
    }
    else {
        ECHOI.getElementsByTagName('span')[choice].dataset.state = "wrong";
        deduceLife();
        if(lifes == 0) {
            gameOver();
        }
    }
}

function updateScore() {
    ESCORE.innerHTML = score;
}

function fillLifes() {
    let elifes = ELIFE.getElementsByTagName('img');
    elifes[0].dataset.state = "true";
    elifes[1].dataset.state = "true";
    elifes[2].dataset.state = "true";

    lifes = 3;
}

function deduceLife() {
    let elifes = ELIFE.getElementsByTagName('img');
    elifes[3-lifes].dataset.state = "false";
    lifes--;
}

function gameOver() {
    hideQuiz();
    EMSCORE.hidden = false;
    EMSCORE.innerHTML = `PONTOS: ${score}`;
    EBSTART.innerHTML = "TENTAR NOVAMENTE";
    ETITLE.innerHTML = "GAME OVER";
    
    if(score > highscore) {
        highscore = score;
        EHSCORE.innerHTML = highscore;
        localStorage.setItem("kquiz-highscore", highscore);
    }
}

function loadHighscore() {
    highscore = Number(localStorage.getItem("kquiz-highscore"));
    EHSCORE.innerHTML = highscore;
    EQHSCORE.innerHTML = highscore;

    EMSCORE.hidden = true;
}


hideQuiz();
loadHighscore();