
const buttonClickSound = new Audio('click.mp3'); 
buttonClickSound.volume = 1;


document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        buttonClickSound.currentTime = 0; 
        buttonClickSound.play(); 
    
    });
});

const gif = document.querySelector('.maw');
const sound = document.getElementById('click-sound');
sound.volume = 0.1;
gif.addEventListener('click', function() {
    sound.play();
});