'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
document.querySelector('.luckynumber').textContent = "?";
console.log(document.querySelector('.message').textContent);


document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (!guess) {
        document.querySelector('.message').textContent = 'No number';
    } else if (guess === secretNumber) {
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.luckynumber').style.width = '8em';
        document.querySelector('.guessnumber').style.backgroundColor = '#60b347';
        document.querySelector('.again').style.backgroundColor = '#60b347';
        document.querySelector('.check').style.backgroundColor = '#60b347';

        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
        document.querySelector('.luckynumber').textContent = secretNumber;
        document.querySelector('.message').textContent = ' You are winner 🏆';

    } else if (guess !== secretNumber) {
        if (score > 1) {
            score--;
            document.querySelector('.message').textContent = guess > secretNumber ? 'Too high' : 'Too low';
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'You are loser';
        }
    }

});
document.querySelector('.again').addEventListener('click', function() {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.message').textContent = 'Start guessing .........';
    document.querySelector('.score').textContent = score;
    document.querySelector('.highscore').textContent = highscore;
    document.querySelector('.luckynumber').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.luckynumber').style.width = '4em';
    document.querySelector('.guessnumber').style.backgroundColor = 'black';
    document.querySelector('.again').style.backgroundColor = 'black';
    document.querySelector('.check').style.backgroundColor = 'white';

})