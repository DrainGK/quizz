let quizData = [];
const card = document.getElementById("card");

async function fetchQuizData(){
    await fetch('data.json')
    .then((res) => res.json())
    .then((data) => (quizData = data))
    
    console.log(quizData.categories[0].questions[0]);
}

fetchQuizData();

function createQuizCard(questionData){
    const cardInfo = document.createElement("div");
    const question = document.createElement("p");
    const level = document.createElement("p");
    const nextButton = document.createElement("next");
    
    quizData.categories[0].question[0].answers.forEach(element => { 
        const answersButton = document.createElement("button");
    });

    cardInfo.innerText = questionData;

    card.appendChild(cardInfo);
    cardInfo.appendChild(question);
    cardInfo.appendChild(level);
    cardInfo.appendChild(answersButton);
    cardInfo.appendChild(answersButton);
}