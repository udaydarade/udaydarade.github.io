// Function to play click sound
// function playClickSound() {
//     const clickSound = new Audio('./images/clicked.mp3');
//     clickSound.play();
// }

// Function to redirect to scroll or swipe page
function redirectscrollorswipe() {
    window.location.href = 'scroll_or_swipe.html';
}

// Function to redirect to login page
function redirecttologin() {
    window.location.href = 'login.html'; // Redirect to the login page
}

// Function to find percentage match for all students
function findpercentageall() {
    window.location.href = 'percentageall.html';
}

// Fetch the data from students.json
fetch('students.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const form = document.getElementById('match-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(form);
            const user = Object.fromEntries(formData.entries());

            // Convert interests and hobbies from string to array
            user.Interests = formData.getAll('interests');
            user.Hobbies = formData.getAll('hobbies');

            // Filter data based on user's gender preference
            if (user.gender === 'male') {
                data = data.filter(student => student.Gender === 'Female');
            } else if (user.gender === 'female') {
                data = data.filter(student => student.Gender === 'Male');
            }

            let bestMatch = null;
            let bestScore = 0;
            let percentagematch = 0;

            // Iterate through each student to find the best match
            for (const student of data) {
                let interestscore = 0;
                let hobbiescore = 0;

                // Skip current user from potential matches
                if (student['IITB Roll Number'] === user['roll-number']) {
                    continue;
                }

                // Calculate the score for interests
                for (const interest of user.Interests) {
                    if (student.Interests.includes(interest)) {
                        interestscore++;
                    }
                }

                // Calculate the score for hobbies
                for (const hobby of user.Hobbies) {
                    if (student.Hobbies.includes(hobby)) {
                        hobbiescore++;
                    }
                }

                // Calculate overall score for the student
                userinterests = user.Interests.length
                userhobbies = user.Hobbies.length
                interestscore = Math.max(0.5, 2 * interestscore);
                hobbiescore = Math.max(0.5, 2 * hobbiescore);
                const studentYearOfStudy = parseInt(student['Year of Study'].slice(0, -1), 10) || 0;
                score = interestscore * interestscore * hobbiescore;
                const yearDiff = Math.abs(user['year-of-study'] - studentYearOfStudy);
                const ageDiff = Math.abs(user['age'] - student['Age']);
                const adjustment = Math.max(0.5, 4 - (yearDiff) - (ageDiff / 4));
                score = score * adjustment;

                // Update best match if current student has higher score
                if (score > bestScore) {
                    bestMatch = student;
                    bestmatchinterest = bestMatch.Interests.length;
                    bestmatchhobbies = bestMatch.Hobbies.length
                    percentagematch = Math.max(10, (100 - (yearDiff) - (ageDiff / 2) - 2 * (userinterests - (interestscore / 2)) - 3 * (bestmatchinterest - (interestscore / 2)) - 2* (bestmatchhobbies - (hobbiescore / 2)) - (userhobbies - (hobbiescore / 2))))
                    bestScore = score;
                }
            }

            // If a best match is found, save it to local storage and open match.html in a new window
            if (bestMatch) {
                bestMatch.percentageMatch = percentagematch;
                localStorage.setItem('match', JSON.stringify(bestMatch));
                window.open('match.html', '_blank');
            } else {
                console.log('No match found.');
            }
        });
    });
