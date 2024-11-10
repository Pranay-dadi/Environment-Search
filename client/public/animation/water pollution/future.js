let bottleCount = 0;
const fishLifeThresholds = [5, 10, 15]; // Thresholds for fish dying
const fishImages = ['fish1.png', 'fish2.png', 'fish3.png']; // Original fish images
const deadFishImages = ['deadFish1.png', 'deadFish2.png', 'deadFish3.png']; // Dead fish images
const maxBottles = 20; // Trigger for showing multiple images

document.getElementById("pourButton").addEventListener("click", function() {
    const sea = document.getElementById('sea');
    const wasteArea = document.getElementById('wasteArea');

    // Create a new waste element
    const waste = document.createElement('div');
    waste.classList.add('waste');
    waste.innerHTML = '<img src="plasticwaste.png" alt="Plastic Water Bottle" style="width: 80px; height: auto;" />'; // Larger waste size

    // Set a random position for the waste
    const randomX = Math.floor(Math.random() * (sea.clientWidth - 80)); // 80 is the width of the larger waste element
    waste.style.left = `${randomX}px`;
    wasteArea.appendChild(waste);
    
    // Add the 'polluted' class to change sea color
    sea.classList.add('polluted');

    // Make the waste fall
    setTimeout(() => {
        waste.style.top = '550px'; // The bottom of the sea
    }, 100); // Start falling after a short delay

    // Increment bottle count
    bottleCount++;

    // Check if any fish should die and replace their images
    fishLifeThresholds.forEach((threshold, index) => {
        if (bottleCount >= threshold) {
            const fish = document.querySelector(`.fish-${index + 1}`);
            fish.src = deadFishImages[index]; // Change to dead fish image
            fish.style.animation = 'drown 3s forwards'; // Start drowning animation
        }
    });

    // Incrementally change the sea color
    let pollutionLevel = 1;
    const maxPollution = 10;

    const pollutionInterval = setInterval(() => {
        pollutionLevel += 0.1;
        if (pollutionLevel >= maxPollution) {
            clearInterval(pollutionInterval); // Stop when max pollution level is reached
        } else {
            const greenColorValue = Math.floor(255 - (pollutionLevel * 25));
            sea.style.backgroundColor = `rgb(1, 50, ${greenColorValue})`;
        }
    }, 200);

    // Trigger image.png appearance after 20 bottles
    if (bottleCount >= 20) {
        for (let i = 0; i < 5; i++) { // Show 5 images
            setTimeout(() => {
                const randomWaste = document.createElement('img');
                randomWaste.src = 'moss.png';
                randomWaste.style.position = 'absolute';
                randomWaste.style.width = '100px'; // Adjust size of the image
                randomWaste.style.left = `${Math.random() * (sea.clientWidth - 80)}px`;
                randomWaste.style.top = `${sea.clientHeight / 2 + Math.random() * (sea.clientHeight / 2 - 80)}px`; // Below the middle part of the sea
                wasteArea.appendChild(randomWaste);
            }, i * 500); // Delay the appearance slightly for each image
        }
    }

    // Trigger odur.png appearance after 25 bottles
    // Trigger odur.png appearance after 25 bottles
if (bottleCount === 25) {
    const odurImage = document.createElement('img');
    odurImage.src = 'odour.png';
    odurImage.style.position = 'absolute';
    odurImage.style.width = '150%'; // Make it cover the entire width
    odurImage.style.height = '60%'; // Make it cover the lower half of the sea
    odurImage.style.left = '0'; // Align to the left edge
    odurImage.style.top = '50%'; // Position it to cover the bottom half
    odurImage.style.opacity = '0.5'; // Set transparency to 50%
    odurImage.style.pointerEvents = 'none'; // Allow clicks to pass through it, if necessary
    wasteArea.appendChild(odurImage);
}

});
