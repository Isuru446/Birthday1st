// Global variables
let currentStep = 0;
let nameAttempts = 0;
let ageEntered = false;
let birthdayEntered = false;
let confirmPassword = false;
let isPasswordPhase = false;
let birthdayMaskActive = false;
const correctName = "Dewni";
const correctAge = 24;
const correctBirthday = "2002.05.09"; // Accept dot format for birthday input

// DOM elements
const textDisplay = document.getElementById('text-display');
const buttonContainer = document.getElementById('button-container');
const inputContainer = document.getElementById('input-container');
const inputField = document.getElementById('input-field');
const submitBtn = document.getElementById('submit-btn');
const photoContainer = document.getElementById('photo-container');
const slideshow = document.getElementById('slideshow');
const bgMusic = document.getElementById('bg-music');

// Initialize particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = '❤️';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Typewriter effect
function typeWriter(text, element, callback) {
    element.textContent = '';
    element.classList.add('typewriter');
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            element.classList.remove('typewriter');
            if (callback) callback();
        }
    }, 50);
}

// Fade out and in
function fadeOut(element, callback) {
    element.classList.add('fade-out');
    setTimeout(() => {
        element.style.opacity = 0;
        if (callback) callback();
    }, 1000);
}

function fadeIn(element) {
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
}

// Show buttons
function showButtons(yesText, noText) {
    buttonContainer.innerHTML = `
        <button id="yes-btn">${yesText}</button>
        <button id="no-btn">${noText}</button>
    `;
    document.getElementById('yes-btn').addEventListener('click', handleYes);
    document.getElementById('no-btn').addEventListener('click', handleNo);
}

// Show input
function showInput(placeholder, maskType = '') {
    inputField.placeholder = placeholder;
    inputField.value = '';
    inputContainer.style.display = 'block';
    inputField.focus();

    if (maskType === 'birthday') {
        birthdayMaskActive = true;
        inputField.placeholder = 'YYYY.MM.DD';
    } else {
        birthdayMaskActive = false;
    }
}

function formatBirthdayValue(value) {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    let formatted = digits;
    if (digits.length > 4) {
        formatted = digits.slice(0, 4) + '.' + digits.slice(4);
    }
    if (digits.length > 6) {
        formatted = digits.slice(0, 4) + '.' + digits.slice(4, 6) + '.' + digits.slice(6);
    }
    return formatted;
}

// Hide input
function hideInput() {
    inputContainer.style.display = 'none';
    inputField.value = '';
    birthdayMaskActive = false;
}

inputField.addEventListener('input', () => {
    if (birthdayMaskActive) {
        const cursorPosition = inputField.selectionStart;
        const formatted = formatBirthdayValue(inputField.value);
        inputField.value = formatted;
        inputField.selectionStart = inputField.selectionEnd = formatted.length;
    }
});

// Start the journey
function startJourney() {
    createParticles();
    typeWriter("Hmm...\nSomeone is trying to enter my heart.", textDisplay, () => {
        setTimeout(() => {
            typeWriter("But only one person knows the password.", textDisplay, () => {
                setTimeout(() => {
                    typeWriter("Do you know it?", textDisplay, () => {
                        showButtons("Yes", "No");
                    });
                }, 2000);
            });
        }, 2000);
    });
}

// Handle Yes button
function handleYes() {
    if (confirmPassword) {
        // Confirm yes: try password again
        buttonContainer.innerHTML = '';
        typeWriter("Then enter password.", textDisplay, () => {
            showInput("Enter password...");
            confirmPassword = false;
        });
    } else {
        // Original yes
        buttonContainer.innerHTML = '';
        typeWriter("Confident, huh?", textDisplay, () => {
            setTimeout(() => {
                typeWriter("Okay then...\nEnter the password.", textDisplay, () => {
                    showInput("Enter password...");
                    currentStep = 2;
                    isPasswordPhase = true;
                });
            }, 2000);
        });
    }
}

// Handle No button
function handleNo() {
    if (confirmPassword) {
        // Confirm no: go to name path
        confirmPassword = false;
        handleNoOriginal();
    } else {
        // Original no
        handleNoOriginal();
    }
}

function handleNoOriginal() {
    // Reset to name entry stage when user chooses the "No" path
    currentStep = 0;
    confirmPassword = false;

    buttonContainer.innerHTML = '';
    typeWriter("Aww... that's disappointing.", textDisplay, () => {
        setTimeout(() => {
            typeWriter("Maybe start with something easy.", textDisplay, () => {
                setTimeout(() => {
                    typeWriter("Try entering your name ❤️", textDisplay, () => {
                        showInput("Enter your name...");
                    });
                }, 2000);
            });
        }, 2000);
    });
}

function setHackingMode(enable) {
    const particles = document.getElementById('particles');
    if (enable) {
        document.body.classList.add('hacking');
        if (particles) particles.style.display = 'none';
    } else {
        document.body.classList.remove('hacking');
        if (particles) particles.style.display = 'block';
    }
}

// Handle submit
submitBtn.addEventListener('click', () => {
    const value = inputField.value.trim();
    if (currentStep === 0) {
        // Name input
        if (value.toLowerCase() === correctName.toLowerCase()) {
            hideInput();
            typeWriter("Ah...\nThere you are, Dewni ❤️", textDisplay, () => {
                // Show photo placeholder
                photoContainer.innerHTML = '<img src="Beautiful Image.jpeg" alt="Beautiful photo">'; // Placeholder
                photoContainer.style.display = 'block';
                setTimeout(() => {
                    typeWriter("But that's not the password yet.", textDisplay, () => {
                        setTimeout(() => {
                            typeWriter("Maybe the password is your age.", textDisplay, () => {
                                setTimeout(() => {
                                    typeWriter("How old are you? 🎂", textDisplay, () => {
                                        photoContainer.style.display = 'none'; // Hide the beautiful image
                                        showInput("Enter your age...");
                                        currentStep = 1;
                                    });
                                }, 2000);
                            });
                        }, 2000);
                    });
                }, 2000);
            });
        } else {
            nameAttempts++;
            if (nameAttempts === 1) {
                typeWriter("Hmm...\nThat doesn't look right.", textDisplay, () => {
                    setTimeout(() => {
                        typeWriter("Are you sure that's your name?", textDisplay, () => {
                            inputField.value = '';
                            inputField.focus();
                        });
                    }, 2000);
                });
            } else if (nameAttempts === 2) {
                // Glitch effect (simple fade)
                document.body.style.animation = 'none';
                setTimeout(() => document.body.style.animation = '', 100);
                typeWriter("Suspicious activity detected.", textDisplay, () => {
                    setTimeout(() => {
                        typeWriter("Access denied.", textDisplay, () => {
                            setHackingMode(true);
                            textDisplay.textContent = '';
                            setTimeout(() => {
                                setHackingMode(false);
                                typeWriter("Just kidding 😌", textDisplay, () => {
                                    setTimeout(() => {
                                        typeWriter("Try properly this time.", textDisplay, () => {
                                            fadeIn(textDisplay);
                                            inputField.value = '';
                                            inputField.focus();
                                        });
                                    }, 2000);
                                });
                            }, 2000);
                        });
                    }, 2000);
                });
            }
        }
    } else if (currentStep === 1) {
        // Age input
        const age = parseInt(value);
        hideInput();
        if (age === 23) {
            typeWriter("23?", textDisplay, () => {
                setTimeout(() => {
                    typeWriter("I think someone forgot she's 24 now 😭", textDisplay, () => {
                        setTimeout(() => {
                            typeWriter("You're getting old, birthday girl.", textDisplay, () => {
                                setTimeout(() => {
                                    typeWriter("Maybe your birthday is the real password.", textDisplay, () => {
                                        showInput("YYYY.MM.DD", 'birthday');
                                        currentStep = 2;
                                        isPasswordPhase = false;
                                    });
                                }, 2000);
                            });
                        }, 2000);
                    });
                }, 2000);
            });
        } else if (age === 24) {
            typeWriter("24 already?", textDisplay, () => {
                setTimeout(() => {
                    typeWriter("Time is moving too fast.", textDisplay, () => {
                        setTimeout(() => {
                            typeWriter("But somehow...\nyou still look as cute as day one ❤️", textDisplay, () => {
                                setTimeout(() => {
                                    typeWriter("Maybe the password is your birthday.", textDisplay, () => {
                                        setTimeout(() => {
                                            typeWriter("Try entering your birthday.", textDisplay, () => {
                                                showInput("YYYY.MM.DD", 'birthday');
                                                currentStep = 2;
                                                isPasswordPhase = false;
                                            });
                                        }, 2000);
                                    });
                                }, 2000);
                            });
                        }, 2000);
                    });
                }, 2000);
            });
        } else {
            typeWriter("That's not right. Try again.", textDisplay, () => {
                showInput("Enter your age...");
            });
        }
    } else if (currentStep === 2) {
        // Birthday input
        if (value === correctBirthday) {
            hideInput();
            // Final unlock
            document.body.style.background = 'linear-gradient(135deg, #2c2c2c, #4a4a4a)'; // Brighten
            // Add confetti
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 3 + 's';
                document.body.appendChild(confetti);
            }
            // Play music
            bgMusic.play();
            typeWriter("Password accepted ❤️", textDisplay, () => {
                setTimeout(() => {
                    typeWriter("So today is the day the world got lucky.", textDisplay, () => {
                        setTimeout(() => {
                            typeWriter("Happy Birthday, My Love 🎂❤️", textDisplay, () => {
                                startSlideshow();
                            });
                        }, 2000);
                    });
                }, 2000);
            });
        } else if (isPasswordPhase) {
            // Wrong password flow
            hideInput();
            typeWriter("Are you sure you know the password.", textDisplay, () => {
                showButtons("Yes", "No");
                confirmPassword = true;
            });
        } else {
            // Wrong birthday flow
            hideInput();
            typeWriter("Looks like you don't remember your birthday.", textDisplay, () => {
                setTimeout(() => {
                    typeWriter("Try entering it again.", textDisplay, () => {
                        showInput("YYYY.MM.DD", 'birthday');
                    });
                }, 2000);
            });
        }
    }
});

function startSlideshow() {
    const images = ["Image 1.jpeg", "Image 2.jpeg", "Image 3.jpeg", "Image 4.jpeg", "Image 5.jpeg"];
    let index = 0;
    slideshow.innerHTML = `<img src="${images[index]}" alt="Memory" style="max-width: 300px; margin: 10px;">`;
    slideshow.style.display = 'block';

    setInterval(() => {
        index = (index + 1) % images.length;
        slideshow.innerHTML = `<img src="${images[index]}" alt="Memory" style="max-width: 300px; margin: 10px;">`;
    }, 3000); // Change every 3 seconds
}