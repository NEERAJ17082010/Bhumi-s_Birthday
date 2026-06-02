/* ==========================================================================
   Bhumi's Birthday Website - Interactive JavaScript Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. STARRY BACKGROUND CANVAS GENERATOR
       ========================================== */
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');

    let stars = [];
    const numStars = 80;

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    // Initialize stars
    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                color: `rgba(236, 211, 182, ${Math.random() * 0.7 + 0.3})`, // Warm champagne glow
                speed: Math.random() * 0.15 + 0.05,
                angle: Math.random() * Math.PI * 2
            });
        }
    }

    // Draw & update stars
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();

            // Update position (soft floating upward movement)
            star.y -= star.speed;
            star.x += Math.sin(star.angle) * 0.05;

            // Reset when leaving screen
            if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animateStars);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateStars();


    /* ==========================================
       2. WAX-SEALED ENVELOPE INTERACTION
       ========================================== */
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const waxSealBtn = document.getElementById('wax-seal-btn');
    const envelopeFlap = document.querySelector('.envelope-flap');
    const letter = document.querySelector('.letter');
    const mainContent = document.getElementById('main-content');

    let isEnvelopeOpened = false;

    function openEnvelope() {
        if (isEnvelopeOpened) return;
        isEnvelopeOpened = true;

        // 1. Rotate the flap open
        envelopeFlap.classList.add('open-flap');

        // 2. Play subtle pop confetti burst at the seal
        const rect = waxSealBtn.getBoundingClientRect();
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { x: rect.left / window.innerWidth, y: rect.top / window.innerHeight },
            colors: ['#e2a5a5', '#ecd3b6', '#e94b62']
        });

        // 3. Lift the letter
        setTimeout(() => {
            letter.classList.add('lift-letter');
        }, 600);

        // 4. Fade out envelope overlay
        setTimeout(() => {
            envelopeOverlay.classList.add('fade-envelope');
            mainContent.classList.remove('hidden');
            setTimeout(() => {
                mainContent.classList.add('revealed');
            }, 50);
        }, 1300);

        // 5. Remove envelope DOM overlay entirely to allow interaction underneath
        setTimeout(() => {
            envelopeOverlay.style.display = 'none';
            // Start background music automatically if possible
            playMusic();
        }, 2200);
    }

    // Bind triggers to open envelope
    waxSealBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEnvelope();
    });

    document.querySelector('.envelope-wrapper').addEventListener('click', openEnvelope);


    /* ==========================================
       3. RETRO FLOATING MUSIC PLAYER
       ========================================== */
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const bgAudio = document.getElementById('bg-audio');
    const vinylDisk = document.getElementById('vinyl-disk');
    const tonearm = document.getElementById('tonearm');

    let isPlaying = false;

    function playMusic() {
        bgAudio.play().then(() => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            vinylDisk.classList.add('spinning');
            tonearm.classList.add('arm-on');
        }).catch(err => {
            console.log("Auto-play blocked by browser. User interaction needed.");
        });
    }

    function pauseMusic() {
        bgAudio.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        vinylDisk.classList.remove('spinning');
        tonearm.classList.remove('arm-on');
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        bgAudio.volume = e.target.value;
    });


    /* ==========================================
       4. POLAROID LIGHTBOX (ZOOM GALLERY)
       ========================================== */
    const polaroidCards = document.querySelectorAll('.polaroid-card');
    const lightboxModal = document.getElementById('polaroid-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxText = document.getElementById('lightbox-text');
    const lightboxClose = document.getElementById('lightbox-close');

    polaroidCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const title = card.querySelector('.polaroid-caption h4').textContent;
            const text = card.querySelector('.polaroid-caption p').textContent;

            lightboxImg.src = img.src;
            lightboxTitle.textContent = title;
            lightboxText.textContent = text;

            lightboxModal.classList.add('active');
        });
    });

    function closeLightbox() {
        lightboxModal.classList.remove('active');
    }

    lightboxClose.addEventListener('click', closeLightbox);

    // Close lightbox on outer background click
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });


    /* ==========================================
       5. INTERACTIVE GLOWING WISH JAR
       ========================================== */
    const floatingStars = document.querySelectorAll('.floating-jar-star');
    const wishDisplayCard = document.getElementById('wish-display-card');
    const wishDefault = document.querySelector('.wish-card-default');
    const wishCardContent = document.getElementById('wish-card-content');
    const wishCardTitle = document.getElementById('wish-card-title');
    const wishCardText = document.getElementById('wish-card-text');

    // Sweet, personalized elegant wishes
    const birthdayWishes = [
        {
            title: "🌟 A Wish of Joy",
            text: "I wish you days filled with raw, uncontrollable laughter, the kind that warms your soul and makes all your worries melt away. May you always find simple, beautiful reasons to smile. Also may u stay away from 'snakes' "
        },
        {
            title: "🌸 A Wish of Peace",
            text: " In the busiest of storms, I wish you silent clarity, peaceful nights, and the quiet comfort of knowing how deeply valued you are."
        },
        {
            title: "✨ A Wish of Wonder",
            text: "I wish you endless curiosity and the courage to follow your dreams wherever they lead. May the universe constantly surprise you with its secret magic and breathtaking beauty."
        },
        {
            title: "💪 A Wish of Strength",
            text: "May you always remember how resilient, brilliant, and uniquely powerful you are. I wish you the unwavering confidence to stand tall, trust your journey, and shine your bright light."
        },
        {
            title: "💛 A Wish of Connection",
            text: "I wish you beautiful, warm relationships that spark happiness and offer comfort. May you always feel supported by genuine souls who appreciate you exactly as you are.Also hope tht u get 'him' "
        }
    ];

    floatingStars.forEach(star => {
        star.addEventListener('click', (e) => {
            const index = parseInt(star.getAttribute('data-wish'), 10);
            const wish = birthdayWishes[index];

            // 1. Gold Sparkles on click
            const rect = star.getBoundingClientRect();
            confetti({
                particleCount: 15,
                spread: 30,
                origin: { x: rect.left / window.innerWidth, y: rect.top / window.innerHeight },
                colors: ['#ffd700', '#ecd3b6']
            });

            // 2. Animate out default card state
            wishDefault.classList.add('hidden');
            wishCardContent.classList.add('hidden');

            // 3. Populate new content
            setTimeout(() => {
                wishCardTitle.textContent = wish.title;
                wishCardText.textContent = wish.text;

                // 4. Reveal content smoothly
                wishCardContent.classList.remove('hidden');
            }, 100);
        });
    });


    /* ==========================================
       6. DUAL CANDLE-BLOWING INTERACTION (MIC & CLICK)
       ========================================== */
    const candles = document.querySelectorAll('.candle');
    const flames = document.querySelectorAll('.flame');
    const micEnableBtn = document.getElementById('mic-enable-btn');
    const micStatusMsg = document.getElementById('mic-status-msg');
    const celebrationBox = document.getElementById('celebration-box');
    const cakeVisual = document.querySelector('.cake-visual');

    let candlesBlown = false;
    let micStream = null;
    let audioContext = null;
    let analyser = null;

    // Blow out a single candle
    function blowOutCandle(candle, index) {
        const flame = candle.querySelector('.flame');
        if (flame.classList.contains('extinguished')) return;

        flame.classList.add('extinguished');

        // Spawn rising smoke cloud
        const smoke = document.createElement('div');
        smoke.className = 'smoke-puff';
        smoke.style.left = '50%';
        smoke.style.top = '-10px';
        candle.appendChild(smoke);

        // Remove smoke node after animation completes
        setTimeout(() => {
            smoke.remove();
        }, 1500);

        checkAllCandlesBlown();
    }

    // Validate if cake is cleared
    function checkAllCandlesBlown() {
        const remainingFlames = document.querySelectorAll('.flame:not(.extinguished)');
        if (remainingFlames.length === 0 && !candlesBlown) {
            candlesBlown = true;
            triggerCelebration();
        }
    }

    // Triggers grand confetti celebration
    function triggerCelebration() {
        // 1. Status Update
        micStatusMsg.innerHTML = '<p style="color: #ecd3b6;"><i class="fas fa-check-circle"></i> Wishes are flying high! Candles successfully blown!</p>';
        micEnableBtn.style.display = 'none';

        // 2. Reveal card description
        celebrationBox.classList.remove('hidden');

        // 3. Infinite grand canvas-confetti sequence
        const duration = 4 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // Confetti from left and right corners
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // A. Manual Click Fallback (clicking directly on candles or cake)
    candles.forEach((candle, index) => {
        candle.addEventListener('click', () => {
            blowOutCandle(candle, index);
        });
    });

    // B. Advanced Microphone Audio Analyser
    async function startMicrophoneListener() {
        try {
            // Request user microphone
            micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Standardize audio contexts
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();

            const source = audioContext.createMediaStreamSource(micStream);
            source.connect(analyser);

            // Fast Fourier Transform setting for frequency range
            analyser.fftSize = 512;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            micStatusMsg.innerHTML = '<p style="color: #e2a5a5;"><i class="fas fa-microphone"></i> Microphone active. Make a wish and blow hard into your mic!</p>';
            micEnableBtn.innerHTML = '<i class="fas fa-microphone-lines-slash"></i> Stop Listening';

            // Loop analyzer check
            function checkSoundLevel() {
                if (candlesBlown) {
                    stopMicrophoneListener();
                    return;
                }

                analyser.getByteFrequencyData(dataArray);

                // Wind blow / blowing sounds reside heavily in mid-to-high frequencies (2000Hz - 8000Hz)
                // We check the energy level in the middle/upper bins
                let highFreqSum = 0;
                let highFreqCount = 0;

                // FFT divides 0 to 22000Hz (at 44.1kHz sample rate) into bufferLength bins.
                // Bins between 40 and 100 roughly represent high speech/air blowing frequencies (e.g. 3000Hz - 8000Hz)
                const startBin = Math.floor(bufferLength * 0.15);
                const endBin = Math.floor(bufferLength * 0.7);

                for (let i = startBin; i < endBin; i++) {
                    highFreqSum += dataArray[i];
                    highFreqCount++;
                }

                const averageVolume = highFreqSum / highFreqCount;

                // Threshold: If sound levels spike above 65, blow out candles one by one or altogether
                if (averageVolume > 65) {
                    const remainingFlames = document.querySelectorAll('.flame:not(.extinguished)');
                    if (remainingFlames.length > 0) {
                        // Extinguish first remaining candle
                        const candleToBlow = remainingFlames[0].parentElement;
                        const index = Array.from(candles).indexOf(candleToBlow);
                        blowOutCandle(candleToBlow, index);
                    }
                }

                // Loop if microphone listener is still active
                if (micStream && micStream.active) {
                    requestAnimationFrame(checkSoundLevel);
                }
            }

            checkSoundLevel();

        } catch (error) {
            console.error("Microphone access denied or error: ", error);
            micStatusMsg.innerHTML = '<p style="color: #ff6eb4;"><i class="fas fa-exclamation-triangle"></i> Microphone access denied or unsupported. Please click on the candles to blow them out!</p>';
        }
    }

    function stopMicrophoneListener() {
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
            micStream = null;
        }
        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
        micEnableBtn.innerHTML = '<i class="fas fa-microphone"></i> Enable Mic to Blow out Candles';
    }

    // Toggle listener on button click
    micEnableBtn.addEventListener('click', () => {
        if (!micStream) {
            startMicrophoneListener();
        } else {
            stopMicrophoneListener();
            micStatusMsg.innerHTML = '<p><i class="fas fa-microphone-slash"></i> Microphone is off. Click the candles to blow them out, or enable microphone access below!</p>';
        }
    });

});
