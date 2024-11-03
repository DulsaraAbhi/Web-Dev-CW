// questions for each part
let questions = [
    ["Enter your name", "Enter your surname","Enter your age" ,"Enter your gender" ,"Are you agree with privacy terms"],
    ["What is your highest level of education", "Enter your favorite subject", "Have you any specialized training", "How did education shape your career choices","Notable academic achievements"],
    ["Preferred learning environments", "Self-paced or structured learning", "Top learning interests", "Motivation strategies for learning","Preferred learning resources/tools"],
    ["What is your preferred method of contact", "Enter your Email", "Enter your Telephone Number", "Do you have a preferred time for contact","Any additional contact information you'd like to share"]
];

// labels for each part
let Labels = [
    ["Name", "Surname", "Age", "Gender","Agree with privacy terms"],
    ["Level of Education", "Favorite Subject", "Specialized Training", "Career Choices","Academic Achievements"],
    ["Learning Environment", "Self-paced or Structured", "Learning Interests", "Motivation Strategies","Learning resources/tools"],
    ["Method", "Email", "Telephone", "Time","Additional Contact"]
];

let Container = document.getElementById('container');
let progress = document.getElementById('progress');
let profileOutput = document.getElementById('output');
let progressPercent = document.getElementById('percentage');
let fielda = document.querySelector('.fielda');

let ongoingpart = 0;
let ongoingstep = 0;
let userinputs = {};
let alldetailsshowed = false; // to check if all details have been displayed

// Function to display questions for the current part
function showlabel() {
    let question = questions[ongoingpart][ongoingstep];
    let promptLabel = Labels[ongoingpart][ongoingstep];
    let Element = document.createElement('div');
    Element.classList.add('prompt');
    Element.innerHTML = `
        <br><label for="input-${ongoingstep}">${promptLabel}</label><br>
        <input type="text" id="input-${ongoingstep}" data-step="${ongoingstep}" class="input" placeholder="Enter Your details here"><br>
        <button onclick="next()" class="nextbu">Next</button>
        <button onclick="skip()" class="nextbu">Skip</button>
        <button onclick="back()"class="nextbu" id="backbu" >Back</button>  
    `;
    Container.appendChild(Element);
}

// Function to move to the next question
function next() {
    let input = document.getElementById(`input-${ongoingstep}`).value;
    if(!input){
        alert("Please enter a data.");
        return;//Exit the function 
    }

    userinputs[`${ongoingpart}-${ongoingstep}`] = input;
    ongoingstep++;

    // Calculate the progress 
    let percentage = ((ongoingpart * 25) + ((ongoingstep / questions[ongoingpart].length) * 25));

    progress.style.width = `${percentage}%`;
    progressPercent.innerText = `${Math.round(percentage)}%`;

    // Clear last details
    profileOutput.innerHTML = '';

    // Display profile for the current part if progress reaches 25%, 50%, 75%, and 100%
    if (percentage === 25 || percentage === 50 || percentage === 75 ) {
        showdetails(ongoingpart);
    }

    if(percentage===100 && !alldetailsshowed){ // Check if all profiles have not been displayed yet
        showAlldetails();
        alldetailsshowed = true; // Set to all details are displayed 
    }

    // Check if all questions in the current part are completed
    if (ongoingstep === questions[ongoingpart].length) {
        ongoingstep = 0; // Reset step for the next part
        ongoingpart++; // Move to the next part
        if (ongoingpart < questions.length) {
            Container.innerHTML = ''; // Clear container
            showlabel(); // Display questions for the next part
        } else {
            // All parts completed
            progress.style.width = '100%';
            progressPercent.innerText = '100%';
            fielda.classList.add('hidden'); // Hide fielda when progress is 100%
        }
    } else {
        Container.innerHTML = ''; // Clearcontainer for the next questiom
        showlabel(); // Display next question
    }
}

function skip(){
    userinputs[`${ongoingpart}-${ongoingstep}`] = '';
    ongoingstep++;

    // Calculate the progress based on the current question index
    let percentage = ((ongoingpart * 25) + ((ongoingstep / questions[ongoingpart].length) * 25));

    progress.style.width = `${percentage}%`;
    progressPercent.innerText = `${Math.round(percentage)}%`;

    // Clear last details
    profileOutput.innerHTML = '';

    // Display profile for the current part if progress reaches 25%, 50%, 75%, and 100%
    if (percentage === 25 || percentage === 50 || percentage === 75 ) {
        showdetails(ongoingpart);
    }

    if(percentage===100 && !alldetailsshowed){ 
        showAlldetails();
        alldetailsshowed = true; 
    }

    // Check if all questions in the current part are completed
    if (ongoingstep === questions[ongoingpart].length) {
        ongoingstep = 0;
        ongoingpart++; 
        if (ongoingpart < questions.length) {
            Container.innerHTML = ''; 
            showlabel();
        } else {
            // All parts completed
            progress.style.width = '100%';
            progressPercent.innerText = '100%';
            fielda.classList.add('hidden'); // Hide fielda when progress is 100%
        }
    } else {
        Container.innerHTML = ''; // Clear  container for the next prompt
        showlabel(); 
    }
}

// Function to move to the previous step
function back() {
    
    ongoingstep--;

    // Check if current step is less than zero, meaning it's the first step of the part
    if (ongoingstep < 0) {
        
        ongoingpart--;

        // Check if current part is less than zero, meaning it's the first part
        if (ongoingpart < 0) {
            
            ongoingpart = 0;
            ongoingstep = 0; 
            document.getElementById("backbu").disabled = true; // Ensure back button is disabled at the start
            // Update the progress to 0%
            progress.style.width = '0%';
            progressPercent.innerText = '0%';
            return; 
            // Set current step to the last step of the previous part
            ongoingstep = questions[ongoingpart].length - 1;
        }
    }

    // Calculate the progress based on the current prompt index
    let percentage = ((ongoingpart * 25) + ((ongoingstep / questions[ongoingpart].length) * 25));

    progress.style.width = `${percentage}%`;
    progressPercent.innerText = `${Math.round(percentage)}%`;


    
    Container.innerHTML = ''; // Always clear the container before displaying the new prompt
    showlabel(); 
}





// Function to display user profile for a specific part
function showdetails(partIndex) {
    // profileOutput.innerHTML += '<h2>User Details</h2>';
    if(partIndex===0){
        profileOutput.innerHTML += `<h3>Personal Information</h3>`;
    }
    else if(partIndex===1){
        profileOutput.innerHTML += `<h3>Educational Background</h3>`;
    }
    else if(partIndex===2){
        profileOutput.innerHTML += `<h3>Learning Preferences and Interests</h3>`;
    }
    else if(partIndex===3){
        profileOutput.innerHTML += `<h3>Contact details</h3>`;
    }
    for (let j = 0; j < questions[partIndex].length; j++) {
        let input = userinputs[`${partIndex}-${j}`] || ''; // If input for this step doesn't exist, use an empty string
        profileOutput.innerHTML += `
            
            <div class="profile-item">
                <strong>${Labels[partIndex][j]}:</strong> ${input}
            </div>
        `;
    }
}

// Function to display all profiles
function showAlldetails() {
    profileOutput.innerHTML += '<h2>All User Details</h2>';
    for (let i = 0; i < questions.length; i++) {
        profileOutput.innerHTML += `<p>***************************************************<p>`;
        showdetails(i);
    }
}
showlabel();