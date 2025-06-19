// Voice input for "About You" field (only on apply.html)
document.addEventListener('DOMContentLoaded', function() {
    const voiceBtn = document.getElementById('voiceBtn');
    const aboutField = document.getElementById('about');
    if (voiceBtn && aboutField) {
        let recognition;
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.lang = 'en-GB';
            recognition.continuous = false;
            recognition.interimResults = false;

            voiceBtn.addEventListener('click', () => {
                voiceBtn.textContent = "🎤 Listening…";
                recognition.start();
            });
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                aboutField.value += (aboutField.value ? ' ' : '') + transcript;
                voiceBtn.textContent = "🎤 Speak";
            };
            recognition.onerror = function() {
                voiceBtn.textContent = "🎤 Speak";
                alert("Voice input failed. Please try again or enter text manually.");
            };
            recognition.onend = function() {
                voiceBtn.textContent = "🎤 Speak";
            };
        } else {
            voiceBtn.style.display = "none";
        }
    }

    // Form submission with feedback
    const form = document.getElementById('applicationForm');
    const formMessage = document.getElementById('formMessage');
    if (form && formMessage) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            formMessage.textContent = "Submitting application…";
            setTimeout(() => {
                form.reset();
                formMessage.textContent = "Thank you for applying! We’ll be in touch soon.";
                formMessage.style.color = "green";
            }, 1200);
        });
    }
});
