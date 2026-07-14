/* ==========================================================================
   ANSHU'S ETERNAL STORY - INTERACTIVE CAROUSEL ENGINE (app.js)
   ========================================================================== */

// --- 37 IMAGES FILE LIST (Copied from Pictures folder) ---
const anshuImages = [
    "IMG-20251002-WA0018.jpg",
    "IMG-20251002-WA0019.jpg",
    "IMG-20251010-WA0013.jpg",
    "IMG-20251010-WA0015.jpg",
    "IMG-20251015-WA0126.jpg",
    "IMG-20251019-WA0028.jpg",
    "IMG-20251022-WA0003.jpg",
    "IMG-20251023-WA0018.jpg",
    "IMG-20251026-WA0010.jpg",
    "IMG-20251027-WA0012.jpg",
    "IMG-20251028-WA0003.jpg",
    "IMG-20251107-WA0010.jpg",
    "IMG-20251116-WA0218.jpg",
    "IMG-20251116-WA0223.jpg",
    "IMG-20251116-WA0224.jpg",
    "IMG-20251117-WA0068.jpg",
    "IMG-20251117-WA0070.jpg",
    "IMG-20251125-WA0023.jpg",
    "IMG-20251126-WA0246.jpg",
    "IMG-20251126-WA0255.jpg",
    "IMG-20251126-WA0258.jpg",
    "IMG-20251126-WA0259.jpg",
    "IMG-20251127-WA0076.jpg",
    "IMG-20260502-WA0008.jpg",
    "Screenshot_2025-11-15-22-39-39-09_a63b0f8076346d26cbdc1b971a1da2a7(1).jpeg",
    "Snapchat-1133054668.jpeg",
    "Snapchat-1336326912(1).jpeg",
    "Snapchat-1405654458(1).jpeg",
    "Snapchat-1611755875.jpeg",
    "Snapchat-16537978.jpeg",
    "Snapchat-1786191817(1).jpeg",
    "Snapchat-1797713403.jpeg",
    "Snapchat-252126244.jpeg",
    "Snapchat-289105765.jpeg",
    "Snapchat-541859146.jpeg",
    "Snapchat-634399156.jpeg",
    "Snapchat-740235956.jpeg"
];

// --- 37 CUTE, FUNNY, AND ROMANTIC NICKNAMES ---
const anshuNicknames = [
    "cutuu",
    "anshuu",
    "meri wifey",
    "mera ladaku vimaan",
    "mera support system",
    "my life",
    "my heart",
    "my world",
    "sweetie",
    "prettiest",
    "param sundari",
    "meri baccho ki mummy",
    "meri mummy ki bahu",
    "gundi no. 1",
    "my sunshine",
    "queen of my heart",
    "chota packet",
    "my beautiful headache",
    "pyaari sherni",
    "partner in crime",
    "soulmate",
    "dramebaaz",
    "my forever",
    "meri jaan",
    "nautanki",
    "my safe place",
    "love of my life",
    "my cupcake",
    "shona",
    "babuu",
    "my favorite notification",
    "sweet jalebi",
    "miss fighter",
    "my home",
    "meri sukoon",
    "heartbeat",
    "my ultimate blessing"
];

// --- STATE MANAGEMENT ---
let romanticAudio = null; // navbar audio (chumma chumma)
let homepageAudio = null; // homepage background song (Khoobsurat)
let proposalAudio = null; // proposal screen song
let celebrationAudio = null; // celebration screen song
let isAudioPlaying = false;
let lastInteractionTime = Date.now();

// --- ROMANTIC QUOTES DATA ---
const romanticQuotes = [
    { text: "In the arithmetic of love, one plus one equals everything, and two minus one equals nothing.", author: "Albert Einstein" },
    { text: "Whatever our souls are made of, Anshu's and mine are the same.", author: "Emily Brontë" },
    { text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.", author: "Leo Christopher" },
    { text: "If I know what love is, it is because of you, my Anshu.", author: "Hermann Hesse" },
    { text: "You are my heart, my life, my one and only thought.", author: "Arthur Conan Doyle" },
    { text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect, and I loved you even more.", author: "Angelita Lim" },
    { text: "My ambition is fueled by one thing: building a castle worthy of my queen, Anshu.", author: "Your Ambitious Partner" }
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    // Show Nav and Content immediately (no portal overlay)
    document.getElementById("main-nav").classList.remove("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    
    // Initialize components on load
    createRosePetals();
    init3DCarousel();
    initHeartExplosion();
    initLightbox();

    // Music Toggle Button
    document.getElementById("toggle-music-btn").addEventListener("click", toggleMusic);

    // Initialize Secret Button & Love Letter Navigation
    initSecretButton();

    // Initialize Milestones Timeline
    initMilestonesPageEngine();

    // Initialize Destiny Counter & Dreams Page
    initDestinyPageEngine();

    // Initialize proposal page & final promise click handler
    initJumpscarePrank();

    // Auto-play homepage background song on first user interaction
    const startMusicOnInteraction = () => {
        playHomepageMusic();
        document.removeEventListener("click", startMusicOnInteraction);
        document.removeEventListener("touchstart", startMusicOnInteraction);
    };
    document.addEventListener("click", startMusicOnInteraction);
    document.addEventListener("touchstart", startMusicOnInteraction);
    
    // Also try playing immediately in case browser autoplay is allowed
    playHomepageMusic();
});

// --- ROMANTIC AUDIO PLAYER ---
function initAudio() {
    if (!romanticAudio) {
        romanticAudio = new Audio("assets/audio/romantic_theme.mp3");
        romanticAudio.volume = 0.5; // Premium clear volume level
        
        // When audio finishes playing:
        romanticAudio.addEventListener("ended", () => {
            isAudioPlaying = false;
            document.querySelector(".sound-icon-on").classList.add("hidden");
            document.querySelector(".sound-icon-off").classList.remove("hidden");
            
            // Make the button pulse again to invite another play
            const btn = document.getElementById("toggle-music-btn");
            btn.classList.add("pulse-button");
            btn.style.cursor = "pointer";
        });
    }
}

function playHomepageMusic() {
    if (!homepageAudio) {
        homepageAudio = new Audio("assets/audio/homepage_theme.mp3");
        homepageAudio.volume = 0.5;
        homepageAudio.loop = true;
    }
    
    // Only play if home page (eternal-loop) is active and navbar audio is not currently playing
    const homeSection = document.getElementById("eternal-loop");
    if (homeSection && homeSection.classList.contains("active") && !isAudioPlaying) {
        homepageAudio.play().catch(err => console.warn("Homepage background audio play blocked:", err));
    }
}

function toggleMusic() {
    initAudio();

    // If it's already playing, it cannot be turned off (disabled while playing)
    if (isAudioPlaying) {
        return;
    }

    // Stop homepage audio when toggling main navbar audio
    if (homepageAudio) {
        homepageAudio.pause();
    }

    // Play the audio
    isAudioPlaying = true;
    
    // UI state change to indicate playing
    document.querySelector(".sound-icon-on").classList.remove("hidden");
    document.querySelector(".sound-icon-off").classList.add("hidden");
    
    const btn = document.getElementById("toggle-music-btn");
    btn.classList.remove("pulse-button"); // Stop pulsing glow
    btn.style.cursor = "default"; // Indicate locked state

    romanticAudio.play().catch(err => {
        console.error("Audio playback failed:", err);
        // Reset state if blocked by browser autoplay policy
        isAudioPlaying = false;
        document.querySelector(".sound-icon-on").classList.add("hidden");
        document.querySelector(".sound-icon-off").classList.remove("hidden");
        btn.classList.add("pulse-button");
        btn.style.cursor = "pointer";
    });
}

// --- HIGH-FIDELITY TILTED 3D RING CAROUSEL (37 Images & Auto-Revolve) ---
function init3DCarousel() {
    const stage = document.getElementById("carousel-stage");
    const featuredCard = document.getElementById("featured-card");
    const TOTAL_CARDS = anshuImages.length;
    const theta = 360 / TOTAL_CARDS;
    const radius = 390;

    let targetRotY = 0;
    let currentRotY = 0;
    let isDragging = false;
    let startX = 0;
    let dragRotY = 0;
    let lastSnapIdx = -1;

    // Generate 37 vertical photo cards dynamically
    anshuImages.forEach((imgFile, idx) => {
        const card = document.createElement("div");
        card.className = "carousel-card";
        
        const angle = idx * theta;
        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        
        card.innerHTML = `<img src="assets/images/${imgFile}" alt="Anshu Preview">`;
        
        // Click card to spin ring and select it
        card.addEventListener("click", (e) => {
            e.stopPropagation();
            lastInteractionTime = Date.now(); // Register interaction
            if (!isDragging) {
                rotateToCard(idx);
            }
        });

        stage.appendChild(card);
    });

    // Update central featured card details with images
    function updateFeaturedCard(index) {
        const imgFile = anshuImages[index];
        const displayIndex = index + 1;
        
        document.getElementById("featured-img").src = `assets/images/${imgFile}`;
        document.getElementById("featured-img-blur").src = `assets/images/${imgFile}`;
        document.getElementById("featured-title").textContent = anshuNicknames[index];
        document.getElementById("featured-location").textContent = `Girlfriend #${displayIndex} of 37 ❤️`;

        // Highlight focused card in the ring
        const cards = stage.querySelectorAll(".carousel-card");
        cards.forEach((card, idx) => {
            if (idx === index) {
                card.classList.add("active-ring-card");
            } else {
                card.classList.remove("active-ring-card");
            }
        });

        // Quote element update removed as it is replaced by a static gift message box.
    }

    function rotateToCard(index) {
        const currentSnapIndex = Math.round(-targetRotY / theta);
        const diffIdx = index - ((currentSnapIndex % TOTAL_CARDS + TOTAL_CARDS) % TOTAL_CARDS);
        
        let adjustedDiff = diffIdx;
        if (diffIdx > TOTAL_CARDS / 2) adjustedDiff -= TOTAL_CARDS;
        if (diffIdx < -TOTAL_CARDS / 2) adjustedDiff += TOTAL_CARDS;

        targetRotY -= adjustedDiff * theta;
    }

    // Animation Loop with Linear Interpolation (Inertia & Auto-Revolve)
    function updatePhysicsLoop() {
        // Auto-rotation physics when idle (3 seconds of no interaction)
        if (!isDragging && (Date.now() - lastInteractionTime > 3000)) {
            targetRotY -= 0.05; // Continuous slow spin angle
        }

        const diff = targetRotY - currentRotY;
        currentRotY += diff * 0.08;

        stage.style.transform = `rotateX(-12deg) rotateY(${currentRotY}deg)`;

        const snapIndex = Math.round(-currentRotY / theta);
        const activeIdx = ((snapIndex % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS;

        // Fade featured preview card out during fast user drag rotations
        // Since diff is small (0.05) during auto-spin, it will remain fully visible!
        if (Math.abs(diff) > 0.8) {
            featuredCard.classList.add("drag-fade");
        } else {
            featuredCard.classList.remove("drag-fade");
            if (activeIdx !== lastSnapIdx) {
                lastSnapIdx = activeIdx;
                updateFeaturedCard(activeIdx);
            }
        }

        requestAnimationFrame(updatePhysicsLoop);
    }

    // Begin physics loop
    updatePhysicsLoop();

    // Mouse Drag Hooks
    stage.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        dragRotY = targetRotY;
        lastInteractionTime = Date.now();
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        targetRotY = dragRotY + (deltaX * 0.15); // Sensitivity
        lastInteractionTime = Date.now();
    });

    document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        lastInteractionTime = Date.now();

        // Snap target rotation to nearest card angle
        const snapIndex = Math.round(-targetRotY / theta);
        targetRotY = -snapIndex * theta;
    });

    // Touch Swipe Hooks
    stage.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        dragRotY = targetRotY;
        lastInteractionTime = Date.now();
    });

    stage.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startX;
        targetRotY = dragRotY + (deltaX * 0.15);
        lastInteractionTime = Date.now();
    });

    stage.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;
        lastInteractionTime = Date.now();
        
        const snapIndex = Math.round(-targetRotY / theta);
        targetRotY = -snapIndex * theta;
    });

    // Load initial item
    updateFeaturedCard(0);
}

// --- LIGHTBOX IMAGE ZOOM SYSTEM ---
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const featuredCard = document.getElementById("featured-card");
    const closeBtn = document.getElementById("lightbox-close");

    featuredCard.addEventListener("click", () => {
        const currentImgSrc = document.getElementById("featured-img").src;
        lightboxImg.src = currentImgSrc;
        lightbox.classList.add("active");
        lastInteractionTime = Date.now();
    });

    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active");
        lastInteractionTime = Date.now();
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
        lastInteractionTime = Date.now();
    });
}

// --- FLOATING ROSE PETALS GENERATOR ---
function createRosePetals() {
    const container = document.getElementById("petal-container");
    const totalPetals = 25;

    for (let i = 0; i < totalPetals; i++) {
        spawnPetal(container);
    }
}

function spawnPetal(container) {
    const petal = document.createElement("div");
    petal.className = "petal";

    const size = Math.random() * 15 + 10;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 10;
    const angleOffset = Math.random() * 40 - 20;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 0.9}px`;
    petal.style.left = `${startX}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    
    petal.style.setProperty("--drift", `${angleOffset}px`);

    petal.addEventListener("animationiteration", () => {
        petal.style.left = `${Math.random() * window.innerWidth}px`;
    });

    container.appendChild(petal);
}

// --- GLOBAL CLICK HEART SHOWER ---
function initHeartExplosion() {
    window.addEventListener("click", (e) => {
        if (document.getElementById("lightbox").classList.contains("active")) return;
        triggerLoveExplosionShower(e.clientX, e.clientY);
    });
}

function triggerLoveExplosionShower(x, y) {
    const totalHearts = 8;
    const heartEmojis = ["❤️", "💖", "💝", "💕", "🌸", "💋"];

    for (let i = 0; i < totalHearts; i++) {
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        const scatterX = Math.random() * 160 - 80;
        const scatterY = Math.random() * -160 - 40;
        const rot = Math.random() * 720 - 360;

        heart.style.setProperty("--x", `${scatterX}px`);
        heart.style.setProperty("--y", `${scatterY}px`);
        heart.style.setProperty("--rot", `${rot}deg`);

        heart.style.transition = "transform 1.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.6s ease";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = `translate(${scatterX}px, ${scatterY}px) scale(1.6) rotate(${rot}deg)`;
            heart.style.opacity = 0;
        }, 10);

        setTimeout(() => {
            heart.remove();
        }, 1600);
    }
}

// --- PLAYFUL SECRET BUTTON & LOVE LETTER / LYRICS ENGINE ---
let lyricsAudio = null;
let currentActiveLineIdx = -1;
let rainInterval = null;

function initSecretButton() {
    const secretBtn = document.getElementById("secret-btn");
    const loopSection = document.getElementById("eternal-loop");
    const letterSection = document.getElementById("love-letter");

    let clickState = 0;
    let onceMoreAudio = null;

    secretBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        lastInteractionTime = Date.now(); // Reset carousel auto-spin timer

        if (clickState === 0) {
            // First Click: Dodge to the side
            secretBtn.style.transform = "translate(160px, -20px)";
            secretBtn.textContent = "Itna easily nahi, click one more time!";
            clickState = 1;
        } else if (clickState === 1) {
            // Second Click: Move back, play Jethalal audio, tease for third click
            secretBtn.style.transform = "translate(0, 0)";
            secretBtn.textContent = "Once more? 😉";
            
            // Play Jethalal once more audio
            if (!onceMoreAudio) {
                onceMoreAudio = new Audio("assets/audio/once_more.mp3");
            }
            onceMoreAudio.currentTime = 0;
            onceMoreAudio.play().catch(err => console.warn("Failed to play meme audio:", err));

            clickState = 2;
        } else if (clickState === 2) {
            // Third Click: Transition to Lyrics page and Autoplay song!
            loopSection.classList.remove("active");
            letterSection.classList.add("active");
            
            // Stop homepage background audio
            if (homepageAudio) {
                homepageAudio.pause();
            }
            
            // Scroll to letter top smoothly
            window.scrollTo({ top: 0, behavior: "smooth" });
            
            // Play lyrics song
            if (!lyricsAudio) {
                lyricsAudio = new Audio("assets/audio/lyrics_song.mp3");
                lyricsAudio.volume = 0.65;
                
                // Time update synchronization
                lyricsAudio.addEventListener("timeupdate", syncLyrics);
                lyricsAudio.addEventListener("ended", resetLyricsPlaybackState);
            }
            
            // Pause default background theme if unmuted
            if (romanticAudio && !romanticAudio.paused) {
                romanticAudio.pause();
            }
            
            lyricsAudio.currentTime = 0;
            currentActiveLineIdx = -1;
            document.getElementById("dancing-word-stage").innerHTML = "";
            
            // Clear highlights
            const lines = document.querySelectorAll(".lyric-line");
            lines.forEach(line => line.classList.remove("active-line"));
            
            lyricsAudio.play().catch(err => console.error("Lyrics song autoplay blocked:", err));
            
            // Start falling raindrops overlay
            startRainEffect();

            // Reset button state for next time
            clickState = 0;
            secretBtn.textContent = "Click to Read a military secret";
        }
    });
}

function syncLyrics() {
    if (!lyricsAudio) return;
    const time = lyricsAudio.currentTime;
    const lines = document.querySelectorAll(".lyric-line");
    let activeIdx = -1;

    lines.forEach((line, idx) => {
        const start = parseFloat(line.getAttribute("data-start"));
        const end = parseFloat(line.getAttribute("data-end"));
        
        if (time >= start && time < end) {
            activeIdx = idx;
        }
    });

    if (activeIdx !== -1 && activeIdx !== currentActiveLineIdx) {
        currentActiveLineIdx = activeIdx;
        
        // Highlight active line in Spotify scrolling list
        lines.forEach((line, idx) => {
            if (idx === activeIdx) {
                line.classList.add("active-line");
                
                // Smooth scroll lyrics list to center active line
                const sheet = document.getElementById("lyrics-scroll-sheet");
                const lineOffset = line.offsetTop - (sheet.clientHeight / 2) + (line.clientHeight / 2);
                sheet.scrollTo({ top: lineOffset, behavior: "smooth" });

                // Render dynamic bouncing words
                updateDancingWords(line.textContent);
            } else {
                line.classList.remove("active-line");
            }
        });
    }
}

function updateDancingWords(text) {
    const stage = document.getElementById("dancing-word-stage");
    stage.innerHTML = "";
    
    const words = text.split(" ");
    words.forEach((word, idx) => {
        const span = document.createElement("span");
        span.className = "dancing-word";
        span.textContent = word;
        span.style.animationDelay = `${idx * 0.1}s`;
        stage.appendChild(span);
    });
}

let loveAudio = null;
let loveInterval = null;

function resetLyricsPlaybackState() {
    currentActiveLineIdx = -1;
    document.getElementById("dancing-word-stage").innerHTML = "";
    const lines = document.querySelectorAll(".lyric-line");
    lines.forEach(line => line.classList.remove("active-line"));
    const sheet = document.getElementById("lyrics-scroll-sheet");
    sheet.scrollTo({ top: 0, behavior: "smooth" });

    // Trigger full screen I Love You screen
    triggerLoveExplosion();
}

function triggerLoveExplosion() {
    const overlay = document.getElementById("love-explosion-overlay");
    overlay.classList.remove("hidden");
    
    setTimeout(() => {
        overlay.classList.add("active");
    }, 50);

    // Play "I Love You" custom voice clip
    if (!loveAudio) {
        loveAudio = new Audio("assets/audio/i_love_you.mp3");
        loveAudio.volume = 0.8;
    }
    loveAudio.currentTime = 0;
    loveAudio.play().catch(err => console.error("I Love You voice autoplay blocked:", err));

    // Spawn falling kiss/hug emojis
    startLoveShower();

    // Auto dismiss after 8.5 seconds
    const dismissTimeout = setTimeout(dismissLoveExplosion, 8500);

    // Dismiss instantly on click
    const clickHandler = () => {
        clearTimeout(dismissTimeout);
        dismissLoveExplosion();
        overlay.removeEventListener("click", clickHandler);
    };
    overlay.addEventListener("click", clickHandler);
}

function startLoveShower() {
    const overlay = document.getElementById("love-explosion-overlay");
    const emojis = ["😘", "💋", "👄", "🤗", "🫂", "💖", "💝"];
    
    if (loveInterval) clearInterval(loveInterval);

    loveInterval = setInterval(() => {
        const span = document.createElement("span");
        span.className = "love-shower-emoji";
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        span.style.left = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 2 + 2; 
        span.style.animationDuration = `${duration}s`;
        
        const scale = Math.random() * 0.6 + 0.7; 
        span.style.transform = `scale(${scale})`;

        overlay.appendChild(span);

        setTimeout(() => {
            span.remove();
        }, duration * 1000);
    }, 120);
}

function dismissLoveExplosion() {
    const overlay = document.getElementById("love-explosion-overlay");
    if (!overlay.classList.contains("active")) return;
    
    overlay.classList.remove("active");
    
    if (loveInterval) {
        clearInterval(loveInterval);
        loveInterval = null;
    }
    
    if (loveAudio) {
        loveAudio.pause();
    }

    setTimeout(() => {
        overlay.classList.add("hidden");
        const elements = overlay.querySelectorAll(".love-shower-emoji");
        elements.forEach(el => el.remove());
        
        // Show proceed to milestones button
        const proceedBtn = document.getElementById("proceed-milestones-btn");
        if (proceedBtn) proceedBtn.classList.remove("hidden");
    }, 800);
}

// Falling Raindrops overlays inside container
function startRainEffect() {
    const container = document.getElementById("lyrics-rain-overlay");
    if (!container) return;
    container.innerHTML = "";
    
    rainInterval = setInterval(() => {
        const drop = document.createElement("div");
        drop.className = "raindrop";
        drop.style.left = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 1.5 + 1.2;
        drop.style.animationDuration = `${duration}s`;
        
        container.appendChild(drop);
        
        setTimeout(() => {
            drop.remove();
        }, duration * 1000);
    }, 90);
}

function stopRainEffect() {
    if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
    }
    const container = document.getElementById("lyrics-rain-overlay");
    if (container) container.innerHTML = "";
}

// --- HEARTBEAT TIMELINE / MILESTONES ENGINE ---
let milestone1Audio = null;
let milestone2Audio = null;
let milestone3Audio = null;
let milestone4Audio = null;
let activeScrollRegion = 0; // 0 = start, 1 = milestone 1, 2 = milestone 2, 3 = milestone 3, 4 = milestone 4

function initMilestonesPageEngine() {
    const proceedBtn = document.getElementById("proceed-milestones-btn");
    const lyricsSection = document.getElementById("love-letter");
    const milestonesSection = document.getElementById("milestones-page");
    const loopSection = document.getElementById("eternal-loop");

    // Proceed to milestones page on click
    proceedBtn.addEventListener("click", () => {
        // Stop lyrics song
        if (lyricsAudio) {
            lyricsAudio.pause();
        }
        stopRainEffect();

        // Reset milestone audio state
        activeScrollRegion = 0;
        if (milestone1Audio) {
            milestone1Audio.pause();
            milestone1Audio.currentTime = 0;
        }
        if (milestone2Audio) {
            milestone2Audio.pause();
            milestone2Audio.currentTime = 0;
        }
        if (milestone3Audio) {
            milestone3Audio.pause();
            milestone3Audio.currentTime = 0;
        }
        if (milestone4Audio) {
            milestone4Audio.pause();
            milestone4Audio.currentTime = 0;
        }

        // Switch pages
        lyricsSection.classList.remove("active");
        milestonesSection.classList.add("active");

        // Scroll to top of timeline
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Initialize ECG Path length
        setTimeout(initECGPath, 150);
    });

    // Wire up locked milestones click-to-unlock behavior
    const nodes = document.querySelectorAll(".milestone-node");
    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const index = node.getAttribute("data-index");
            const card = document.getElementById(`card-${index}`);
            
            if (card.classList.contains("locked")) {
                // Play bass double-heartbeat thump
                playHeartbeatSound();
                
                // Add random rotation variable to polaroid
                const rot = Math.random() * 8 - 4;
                card.style.setProperty("--rot", rot);

                // Unhide the polaroid & diary notes
                card.classList.remove("locked");
            }
        });
    });

    // Wire up clicking card lock overlay directly
    const cards = document.querySelectorAll(".milestone-card");
    cards.forEach((card, idx) => {
        card.addEventListener("click", () => {
            if (card.classList.contains("locked")) {
                playHeartbeatSound();
                const rot = Math.random() * 8 - 4;
                card.style.setProperty("--rot", rot);
                card.classList.remove("locked");
            }
        });
    });
}

// ECG path scroll-drawing logic
let ecgPathLength = 0;
function initECGPath() {
    const glowPath = document.getElementById("ecg-glow-path");
    if (!glowPath) return;

    ecgPathLength = glowPath.getTotalLength();
    glowPath.style.strokeDasharray = ecgPathLength;
    glowPath.style.strokeDashoffset = ecgPathLength;

    // Trigger initial calculations
    handleECGScrollDraw();
}

function handleECGScrollDraw() {
    if (!document.getElementById("milestones-page").classList.contains("active")) return;
    
    const glowPath = document.getElementById("ecg-glow-path");
    const container = document.querySelector(".timeline-container");
    if (!glowPath || !container) return;

    // Calculate how much timeline is in viewport
    const containerTop = container.offsetTop;
    const containerHeight = container.clientHeight;
    
    // Offset scroll by middle of viewport
    const scrollY = window.scrollY - containerTop + (window.innerHeight * 0.5);
    const scrollPercent = Math.max(0, Math.min(1, scrollY / containerHeight));

    // Update SVG stroke-dashoffset
    const drawLength = ecgPathLength * scrollPercent;
    glowPath.style.strokeDashoffset = ecgPathLength - drawLength;

    // Determine current active scroll region
    let currentRegion = 0;
    if (scrollY >= 120 && scrollY < 420) {
        currentRegion = 1;
    } else if (scrollY >= 420 && scrollY < 720) {
        currentRegion = 2;
    } else if (scrollY >= 720 && scrollY < 1020) {
        currentRegion = 3;
    } else if (scrollY >= 1020) {
        currentRegion = 4;
    }

    // Trigger region transitions
    if (currentRegion !== activeScrollRegion) {
        // Pause currently playing milestone tracks
        if (milestone1Audio) milestone1Audio.pause();
        if (milestone2Audio) milestone2Audio.pause();
        if (milestone3Audio) milestone3Audio.pause();
        if (milestone4Audio) milestone4Audio.pause();

        activeScrollRegion = currentRegion;

        if (activeScrollRegion === 1) {
            // Play Milestone 1 audio
            if (!milestone1Audio) {
                milestone1Audio = new Audio("assets/audio/milestone_reach_1.mp3");
                milestone1Audio.volume = 0.7;
            }
            milestone1Audio.currentTime = 0;
            milestone1Audio.play().catch(err => console.warn("Milestone 1 audio failed to play:", err));
        } else if (activeScrollRegion === 2) {
            // Play Milestone 2 audio
            if (!milestone2Audio) {
                milestone2Audio = new Audio("assets/audio/milestone_reach_2.mp3");
                milestone2Audio.volume = 0.7;
            }
            milestone2Audio.currentTime = 0;
            milestone2Audio.play().catch(err => console.warn("Milestone 2 audio failed to play:", err));
        } else if (activeScrollRegion === 3) {
            // Play Milestone 3 audio
            if (!milestone3Audio) {
                milestone3Audio = new Audio("assets/audio/milestone_reach_3.mp3");
                milestone3Audio.volume = 0.7;
            }
            milestone3Audio.currentTime = 0;
            milestone3Audio.play().catch(err => console.warn("Milestone 3 audio failed to play:", err));
        } else if (activeScrollRegion === 4) {
            // Play Milestone 4 audio
            if (!milestone4Audio) {
                milestone4Audio = new Audio("assets/audio/milestone_reach_4.mp3");
                milestone4Audio.volume = 0.7;
            }
            milestone4Audio.currentTime = 0;
            milestone4Audio.play().catch(err => console.warn("Milestone 4 audio failed to play:", err));
        }
    }

    // Trigger active states for entries
    const entries = document.querySelectorAll(".milestone-entry");
    entries.forEach(entry => {
        const entryTop = parseInt(entry.style.top);
        if (scrollY >= entryTop - 120) {
            entry.classList.add("scrolled-active");
        } else {
            entry.classList.remove("scrolled-active");
        }
    });

    // Reveal destiny button when scrolled near bottom (scrollY >= 1150) or reached page bottom
    const destinyBtn = document.getElementById("destiny-btn");
    const reachedBottom = (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100);
    if (scrollY >= 1150 || reachedBottom) {
        if (destinyBtn) destinyBtn.classList.add("visible");
    } else {
        if (destinyBtn) destinyBtn.classList.remove("visible");
    }
}

// Attach scroll drawer
window.addEventListener("scroll", handleECGScrollDraw);

// Web Audio heartbeat synthesiser (double thump bass pulse)
function playHeartbeatSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        
        // 1st pulse: LUB
        playThumpPulse(ctx, ctx.currentTime, 55, 0.55, 0.16);
        // 2nd pulse: DUB (higher pitch, slightly softer, short delay)
        playThumpPulse(ctx, ctx.currentTime + 0.22, 50, 0.40, 0.22);
    } catch(e) {
        console.warn("Heartbeat Web Audio failed to start:", e.message);
    }
}

function playThumpPulse(ctx, startTime, freq, volume, duration) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(10, startTime + duration); // Sweep down

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.03); // Quick rise
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Exponential decay

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
}

// --- DESTINY COUNTER & DREAMS PAGE ENGINE ---
let destinyInterval = null;

function initDestinyPageEngine() {
    const destinyBtn = document.getElementById("destiny-btn");
    const milestonesSection = document.getElementById("milestones-page");
    const destinySection = document.getElementById("destiny-counter-page");

    if (!destinyBtn) return;

    destinyBtn.addEventListener("click", () => {
        // Pause milestone audios if playing
        if (milestone1Audio) milestone1Audio.pause();
        if (milestone2Audio) milestone2Audio.pause();
        if (milestone3Audio) milestone3Audio.pause();
        if (milestone4Audio) milestone4Audio.pause();

        // Switch page sections
        milestonesSection.classList.remove("active");
        destinySection.classList.add("active");

        // Scroll to top of destiny page smoothly
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Start real-time digital ticker calculations
        if (destinyInterval) clearInterval(destinyInterval);
        destinyInterval = setInterval(updateDestinyCounter, 40);

        // Generate cosmic space background stars
        startCosmosBackground();
    });
}

function updateDestinyCounter() {
    const now = new Date();
    const start = new Date("2025-09-21T00:00:00");
    
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonth;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();
    
    const container = document.getElementById("destiny-ticker");
    if (!container) return;
    
    container.innerHTML = `
        <div class="ticker-unit"><span class="ticker-num">${years}</span><span class="ticker-name">Years</span></div>
        <div class="ticker-unit"><span class="ticker-num">${months}</span><span class="ticker-name">Months</span></div>
        <div class="ticker-unit"><span class="ticker-num">${days}</span><span class="ticker-name">Days</span></div>
        <div class="ticker-unit"><span class="ticker-num">${String(hours).padStart(2, '0')}</span><span class="ticker-name">Hours</span></div>
        <div class="ticker-unit"><span class="ticker-num">${String(minutes).padStart(2, '0')}</span><span class="ticker-name">Minutes</span></div>
        <div class="ticker-unit"><span class="ticker-num">${String(seconds).padStart(2, '0')}</span><span class="ticker-name">Seconds</span></div>
        <div class="ticker-unit"><span class="ticker-num">${String(ms).padStart(3, '0')}</span><span class="ticker-name">Ms</span></div>
    `;
}

function startCosmosBackground() {
    const bg = document.getElementById("cosmos-bg");
    if (!bg) return;
    bg.innerHTML = "";
    
    const numStars = 120;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "cosmos-star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        star.style.animationDelay = `${delay}s`;
        star.style.setProperty("--duration", `${duration}s`);
        
        bg.appendChild(star);
    }
}

function initJumpscarePrank() {
    const finalBtn = document.getElementById("final-promise-btn");
    const overlay = document.getElementById("jumpscare-overlay");
    const proposalScreen = document.getElementById("proposal-screen");
    const celebrationScreen = document.getElementById("celebration-screen");

    if (!finalBtn) return;

    finalBtn.addEventListener("click", () => {
        // Pause all other possible playing sounds
        if (romanticAudio) romanticAudio.pause();
        if (lyricsAudio) lyricsAudio.pause();
        if (milestone1Audio) milestone1Audio.pause();
        if (milestone2Audio) milestone2Audio.pause();
        if (milestone3Audio) milestone3Audio.pause();
        if (milestone4Audio) milestone4Audio.pause();
        if (destinyInterval) clearInterval(destinyInterval);
        if (homepageAudio) homepageAudio.pause();

        // 1. Show main overlay and proposal screen directly
        overlay.classList.remove("hidden");
        proposalScreen.classList.remove("hidden");
        setTimeout(() => {
            proposalScreen.classList.add("fade-in");
        }, 50);

        // 2. Play proposal music at clear volume level
        if (!proposalAudio) {
            proposalAudio = new Audio("assets/audio/proposal_music.mp3");
            proposalAudio.volume = 0.8;
            proposalAudio.loop = true;
        }
        proposalAudio.currentTime = 0;
        proposalAudio.play().catch(err => console.warn("Proposal audio failed to play:", err));

        // 3. Wire up proposal YES button actions
        const yes1 = document.getElementById("proposal-yes-1");
        const yes2 = document.getElementById("proposal-yes-2");

        const triggerCelebration = () => {
            // Stop proposal song
            if (proposalAudio) proposalAudio.pause();

            // Switch to celebration view
            proposalScreen.classList.add("hidden");
            celebrationScreen.classList.remove("hidden");
            setTimeout(() => {
                celebrationScreen.classList.add("fade-in");
            }, 50);

            // Play celebration song
            if (!celebrationAudio) {
                celebrationAudio = new Audio("assets/audio/celebration_music.mp3");
                celebrationAudio.volume = 0.8;
                celebrationAudio.loop = true;
            }
            celebrationAudio.currentTime = 0;
            celebrationAudio.play().catch(err => console.warn("Celebration audio failed to play:", err));

            // Start falling celebration icons shower
            startCelebrationParticles();
        };

        // Reset click event listeners to prevent duplicate triggers
        yes1.replaceWith(yes1.cloneNode(true));
        yes2.replaceWith(yes2.cloneNode(true));

        document.getElementById("proposal-yes-1").addEventListener("click", triggerCelebration);
        document.getElementById("proposal-yes-2").addEventListener("click", triggerCelebration);
    });
}

function startCelebrationParticles() {
    const overlay = document.getElementById("jumpscare-overlay");
    if (!overlay) return;

    const emojis = ["❤️", "💖", "💕", "💍", "✨", "😘", "🥂", "🫂"];
    const interval = setInterval(() => {
        // If celebration screen is hidden (e.g. page refreshed), stop generating
        const celebration = document.getElementById("celebration-screen");
        if (!celebration || celebration.classList.contains("hidden")) {
            clearInterval(interval);
            return;
        }

        const particle = document.createElement("div");
        particle.className = "celebration-particle";
        particle.style.position = "absolute";
        particle.style.top = "-50px";
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`;
        particle.style.zIndex = "120";
        particle.style.pointerEvents = "none";
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        // Random animation properties
        const duration = Math.random() * 3 + 2; // 2s - 5s
        particle.style.animation = `fallLoveEmoji ${duration}s linear forwards`;

        overlay.appendChild(particle);

        // Remove after animation completes
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);

    }, 150); // generate every 150ms
}
