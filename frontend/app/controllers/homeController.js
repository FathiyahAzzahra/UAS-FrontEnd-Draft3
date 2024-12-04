var app = angular.module('myApp', []);
app.controller('MainController', function ($scope) {
    $scope.features = [
        { title: "Self-Care", description: "Find peace with guided meditations and relaxation techniques.", link: "#!/meditation" },
        { title: "Daily Wellness", description: "Build healthy habits with our calendar and progress tools.", link: "#!/dailyWellness" },
        { title: "Community", description: "Connect with others on the same journey.", link: "#!/community" },
        { title: "Reflection", description: "Creativity through art serves as a path to healing and self-reflection in mental health.", link: "#!/resources" }
    ];

    $scope.faqs = [
        { question: "What is Peaceful Path?", answer: "Peaceful Path is a platform designed to help you find peace and balance through mental wellness tools, including meditation, relaxation, mood tracking, and more." },
        { question: "How do I start meditation sessions?", answer: "You can start meditation sessions by clicking on the 'Start Meditation' button on the homepage or navigating to the Meditation & Relaxation section." },
        { question: "What is Daily Wellness?", answer: "Daily Wellness provides you with simple tips and practices that you can incorporate into your routine to improve your mental well-being." },
        { question: "How can I track my mental progress?", answer: "You can track your mood and mental health by visiting the 'Mood & Mental Tracking' section and recording your emotions and thoughts." }
    ];
});

document.addEventListener('DOMContentLoaded', function () {
    const authSection = document.getElementById('auth-section');
    const username = localStorage.getItem('username');
    if (username) {
        // Jika sudah login, tampilkan username dan tombol logout
        authSection.innerHTML = `
                    <button class="btn btn-light me-3" onclick="logout()">Logout</button>    
                    <a href="./app/views/profile.html" class="text-white ms-2" style="text-decoration: none;">Hi, ${username}</a>
                    `;
    } else {
        // Jika belum login, tampilkan tombol login
        authSection.innerHTML = `
                        <a href="./app/views/login.html" class="btn btn-light ms-3">Login</a>
                    `;
    }
});

function logout() {
    localStorage.removeItem('token'); // Hapus token
    localStorage.removeItem('username'); // Hapus username
    location.reload(); // Refresh halaman
}

const carouselElement = document.querySelector('#carouselExample');
const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 3000, // 3 seconds
    pause: 'hover' // Pause when hovered
});
