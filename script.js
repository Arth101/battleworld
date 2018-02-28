console.log('WOW');

var attackBtn = document.querySelector('[data-attack-btn]');
var fleeBtn = document.querySelector('[data-flee-btn]');
var hpField = document.querySelector('[data-hp]');
var combatLog = document.querySelector('[data-combat-log]');
var opponentImage = document.querySelector('[data-opponent-image]');
console.log(attackBtn);

attackBtn.addEventListener('click', function(){
  console.warn('attacking!');
  var dmg = getRandomDamage(15);
  var actualHp = hpField.value;
  var newHp = actualHp - dmg;
  combatLog.innerHTML = 'You hit Turalyon for ' + dmg + ' damage. Ouch!'
  hpField.value = newHp;
  checkOpponentStatus(newHp);
});

fleeBtn.addEventListener('click', function(){
  console.warn('Fleeing!');
  combatLog.innerHTML = 'You try to run away. Turalyon laughs at you!'
  opponentImage.src = 'billeder/turalyon-happy.png';
});

function getRandomDamage(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function checkOpponentStatus(hp) {
  if(hp < 100) {
    opponentImage.src = 'billeder/turalyon-angry.png';
  }
  if (hp <= 50) {
    opponentImage.src = 'billeder/turalyon-scared.png';
  }
  if (hp <= 25) {
    opponentImage.src = 'billeder/turalyon-sad.png';
  }
  if (hp <= 0) {
    opponentImage.src = 'billeder/victory.png';
  }
}