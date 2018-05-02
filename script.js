console.log('WOW');

var attackBtn = document.querySelector('[data-attack-btn]');
var fleeBtn = document.querySelector('[data-flee-btn]');
var leaveBtn = document.querySelector('[data-leave-btn]');
var hpField = document.querySelector('[data-hp]');
var combatLog = document.querySelector('[data-combat-log]');
var opponentNametag = document.querySelector('[data-opponent-nametag]');
var opponentImage = document.querySelector('[data-opponent-image]');
var fightInterface = document.querySelector('[data-fight-interface]');
var movementSpeed = 20;

var opponents = ['turalyon', 'garrosh', 'illidan'];
var opponent;

// Generate Random Encounter

function generateRandomEncounter() {
    var randomOpponent = opponents[Math.floor(Math.random() * (opponents.length))];
    opponent = randomOpponent;
    console.log(randomOpponent);
    fightInterface.style.display = 'block';
    leaveBtn.style.display = 'none';
    opponentNametag.innerHTML = opponent;
    opponentImage.src = 'billeder/' + opponent + '.jpg';
};

// Fighting

attackBtn.addEventListener('click', function () {
    console.warn('attacking!');
    var dmg = getRandomDamage(15);
    var actualHp = hpField.value;
    var newHp = actualHp - dmg;
    combatLog.innerHTML = 'You hit ' + opponent + ' for ' + dmg + ' damage. Ouch!';
    
    if(newHp <= 0) {
      hpField.value = 0;
      attackBtn.style.display = 'none';
      fleeBtn.style.display = 'none';
      leaveBtn.style.display = 'block';
      combatLog.innerHTML = 'You have defeated ' + opponent + '!';
      hasLeaved = true;
    } else {
      hpField.value = newHp;
    }
    checkOpponentStatus(newHp);
});

fleeBtn.addEventListener('click', function () {
    console.warn('Fleeing!');
    combatLog.innerHTML = 'You try to run away. ' + opponent + ' laughs at you!'
    opponentImage.src = 'billeder/' + opponent + '-happy.png';
    hasLeaved = true;
});

leaveBtn.addEventListener('click', function () {
  fightInterface.style.display = 'none';
});

function getRandomDamage(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function checkOpponentStatus(hp) {
    if (hp < 100) {
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

// Movement

var body = document.querySelector('body');
var player = document.querySelector("[data-player]");
var foe = document.querySelector('[data-foe]');
var map = document.querySelector('[data-map]');
hasLeaved = true;

body.addEventListener("keydown", (event) => {


    var pos = player.getBoundingClientRect();

    switch (event.keyCode) {
        case 37:
            move(player, 'left')
            break;
        case 39:
            move(player, 'right')
            break;
        case 40:
            move(player, 'down')
            break;
        case 38:
            move(player, 'up')
            break;
        default:
            console.log('Unknown key:', event.keyCode);
            break;
    }
});

function move(element, direction) {
    var pos = element.getBoundingClientRect();
    var max = map.getBoundingClientRect();

    if(!hasLeaved) return;

    if (direction == 'left') {
        var newLeft = calculateOldPosition('left', element);

        if (newLeft < 0) {
            element.style.left = 0;
        }

        else {
            element.style.left = newLeft + 'px';
        }
    }

    if (direction == 'right') {
        var newRight = calculateOldPosition('right', element);

        if (newRight > (max.width - pos.width)) {
            element.style.left = (max.width - pos.width) + 'px'
        }

        else {
            element.style.left = newRight + 'px';
        }
    }

    if (direction == 'up') {
        var newTop = calculateOldPosition('up', element);

        if (newTop < 0) {
            element.style.top = 0;
        }

        else {
            element.style.top = newTop + 'px';
        }
    }

    if (direction == 'down') {
        var newDown = calculateOldPosition('down', element);

        if ((newDown + pos.height) > map.clientHeight) {
            element.style.top = (map.clientHeight - pos.height) + 'px';
        } else {
            element.style.top = newDown + 'px';
        }
    }


    if (isCollide(player, foe)) {
        if (hasLeaved) {
            generateRandomEncounter();
            console.log(foe.dataset.foename);
        }
        hasLeaved = false;
        player.style.border = "2px solid tomato";
        foe.style.border = "2px solid tomato";
    } else {
        hasLeaved = true;
        player.style.border = "";
        foe.style.border = "";
    };
}

function isCollide(player, foe) {
    var playerArea = player.getBoundingClientRect();
    var foeArea = foe.getBoundingClientRect();

    return (
        ((playerArea.top + playerArea.height) > (foeArea.top)) &&
        (playerArea.top < (foeArea.top + foeArea.height)) &&
        ((playerArea.left + playerArea.width) > foeArea.left) &&
        (playerArea.left < (foeArea.left + foeArea.width))
    );
}

function calculateOldPosition(direction, element) {
    if(direction == 'up' || direction == 'down') {
        var styleDirection = 'top';
    } else {
        var styleDirection = 'left';
    }
    var oldDirection = window.getComputedStyle(element, null).getPropertyValue(styleDirection);
    oldDirection = oldDirection.replace('px', '');
    oldDirection = parseInt(oldDirection, 10);

    if(direction == 'up' || direction == 'left') {
        var newDirection = (oldDirection - movementSpeed);
    } else {
        var newDirection = (oldDirection + movementSpeed);
    }

    return newDirection;
}