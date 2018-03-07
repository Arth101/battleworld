console.log('WOW');

var attackBtn = document.querySelector('[data-attack-btn]');
var fleeBtn = document.querySelector('[data-flee-btn]');
var hpField = document.querySelector('[data-hp]');
var combatLog = document.querySelector('[data-combat-log]');
var opponentNametag = document.querySelector('[data-opponent-nametag]');
var opponentImage = document.querySelector('[data-opponent-image]');
var fightInterface = document.querySelector('[data-fight-interface]');
console.log(attackBtn);

var opponents = ['turalyon', 'garrosh', 'illidan'];
var opponent = '';

// Random Encounters
var findEncounterBtn = document.querySelector('[data-find-encounter]');
findEncounterBtn.addEventListener('click', function() {
  var randomOpponent = opponents[Math.floor(Math.random()*opponents.length)];
  opponent = randomOpponent;
  console.log(randomOpponent);
  fightInterface.style.display = 'block';
  findEncounterBtn.style.display = 'none';
  opponentNametag.innerHTML = opponent;
  opponentImage.src = 'billeder/' + opponent + '.jpg';
});

// Fighting

attackBtn.addEventListener('click', function(){
  console.warn('attacking!');
  var dmg = getRandomDamage(15);
  var actualHp = hpField.value;
  var newHp = actualHp - dmg;
  combatLog.innerHTML = 'You hit ' + opponent + ' for ' + dmg + ' damage. Ouch!'
  hpField.value = newHp;
  checkOpponentStatus(newHp);
});

fleeBtn.addEventListener('click', function(){
  console.warn('Fleeing!');
  combatLog.innerHTML = 'You try to run away. ' + opponent + ' laughs at you!'
  opponentImage.src = 'billeder/' + opponent + '-happy.png';
});

function getRandomDamage(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function checkOpponentStatus(hp) {
  if(hp < 100) {
    opponentImage.src = 'billeder/' + opponent + '-angry.jpg';
  }
  if (hp <= 50) {
    opponentImage.src = 'billeder/' + opponent + '-scared.jpg';
  }
  if (hp <= 25) {
    opponentImage.src = 'billeder/' + opponent + '-sad.jpg';
  }
  if (hp <= 0) {
    opponentImage.src = 'billeder/victory.png';
  }
}