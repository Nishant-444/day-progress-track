// Select the DOM elements
const starfield = document.getElementById('starfield');
const percentageText = document.getElementById('percentage-text');
const timeLeftText = document.getElementById('time-left-text');
const progressGrid = document.getElementById('progress-grid');

// Starfield background generation
for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    const brightness = Math.random();
    if (brightness < .2) {
        star.className = 'star big-star';
        star.style.opacity = Math.random() * .3 + .7;
    } else if (brightness < .6) {
        star.className = 'star';
        star.style.opacity = Math.random() * .4 + .4;
    } else {
        star.className = 'star small-star';
        star.style.opacity = Math.random() * .3 + .2;
    }
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDelay = Math.random() * 4 + 's';
    starfield.appendChild(star);
}

// Progress grid generation
for (let i = 0; i < 100; i++) {
    const block = document.createElement('div');
    block.className = 'progress-block';
    progressGrid.appendChild(block);
}

// Update function for time and progress
function updateTime() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msElapsed = now - startOfDay;
    const dayProgress = msElapsed / 86400000 * 100; // 86,400,000 ms in a day

    percentageText.textContent = `Today is ${dayProgress.toFixed(1)}% complete`;

    const secondsLeft = Math.floor((86400000 - msElapsed) / 1000);
    let hours = Math.floor(secondsLeft / 3600);
    let minutes = Math.floor((secondsLeft % 3600) / 60);
    let seconds = secondsLeft % 60;

    timeLeftText.textContent = `${hours} hours, ${minutes} minutes, and ${seconds} seconds left today`;

    const filledBlocks = Math.round(dayProgress);
    for (let i = 0; i < 100; i++) {
        progressGrid.children[i].classList.toggle('filled', i < filledBlocks);
    }
}

// Run the function once on load and then every second
updateTime();
setInterval(updateTime, 1000);