document.addEventListener('DOMContentLoaded', () => {
    const revealBtn = document.getElementById('revealBtn');
    const landing = document.getElementById('landing');
    const mainContent = document.getElementById('main-content');
    const gallery = document.querySelector('.gallery');
    const bgMusic = document.getElementById('bgMusic');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');

    // Set your secret password here!
    const SECRET_PASSWORD = "cutiesupii"; 

    // Array of image paths based on the images folder
    const images = [
        'images/supii (1).webp',
        'images/supii (2).webp',
        'images/supii (3).webp',
        'images/supii (4).webp',
        'images/supii (5).webp',
        'images/supii (6).webp',
        'images/supii (7).webp',
        'images/supii (8).webp',
        'images/supii (9).webp',
        'images/supii (10).webp',
        'images/supii (11).webp'
    ];

    // Array of random compliments
    const compliments = [
        "Your smile lights up the room ✨",
        "You have the most beautiful eyes 💖",
        "Your kindness is your superpower 🌸",
        "You are absolutely stunning! 😍",
        "Your laugh is my favorite sound 🎶",
        "You make everything better 🌟",
        "You are a true masterpiece 🎨",
        "Your heart is as beautiful as you are ❤️",
        "You are effortlessly gorgeous ✨",
        "You bring so much joy to my life 🌻",
        "You are simply perfect 💫"
    ];

    // Reveal Surprise
    revealBtn.addEventListener('click', () => {
        const enteredPassword = passwordInput.value.trim().toLowerCase();

        if (enteredPassword === SECRET_PASSWORD) {
            // Hide error message if it was shown
            errorMessage.classList.add('hidden');

            // Play background music
            bgMusic.volume = 0.5; // Set volume to 50%
            bgMusic.play().catch(error => console.log("Audio play failed:", error));

            landing.style.opacity = '0';
            setTimeout(() => {
                landing.classList.add('hidden');
                mainContent.classList.remove('hidden');
                createHearts();
                loadGallery();
            }, 1000);
        } else {
            // Show error message and shake input
            errorMessage.classList.remove('hidden');
            passwordInput.style.transform = 'translateX(-10px)';
            setTimeout(() => passwordInput.style.transform = 'translateX(10px)', 100);
            setTimeout(() => passwordInput.style.transform = 'translateX(-10px)', 200);
            setTimeout(() => passwordInput.style.transform = 'translateX(0)', 300);
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    // Allow pressing "Enter" to submit password
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            revealBtn.click();
        }
    });

    // Load Gallery Images with a slight delay for each
    function loadGallery() {
        images.forEach((src, index) => {
            setTimeout(() => {
                // Create Card Container
                const card = document.createElement('div');
                card.classList.add('image-card');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                card.style.transition = 'all 0.8s ease';

                // Create Image
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Beautiful Photo';

                // Create Compliment Overlay
                const overlay = document.createElement('div');
                overlay.classList.add('compliment-overlay');
                
                const complimentText = document.createElement('div');
                complimentText.classList.add('compliment-text');
                // Pick a random compliment
                const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
                complimentText.innerText = randomCompliment;

                overlay.appendChild(complimentText);
                card.appendChild(img);
                card.appendChild(overlay);
                gallery.appendChild(card);

                // Trigger reflow
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            }, index * 200); // Staggered loading effect
        });
    }

    // Create floating hearts background
    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's'; // 3s to 6s
            heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
            
            document.body.appendChild(heart);

            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 300);
    }
});