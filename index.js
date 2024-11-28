const buttonStart = document.getElementById("start-button");
const menuStart = document.getElementById("start-quiz");

buttonStart.addEventListener("click", ()=>{
    menuStart.style.display = "none";
    quizManager.fetchQuizData();
})

const quizManager = {
    currentQuestionIndex: 0,
    quizData: [],
    quizScore: 0,
    currentQuiz: [],
    cardElement: document.getElementById("card"),

    async fetchQuizData(){
        const response = await fetch('data.json');
        this.quizData = await response.json();
        this.selectQuiz(this.quizData);
    },

    selectQuiz(data){
        this.cardElement.style.display = "block";
        this.cardElement.innerHTML = "";
        const selectQuizMenu = document.createElement("div");
        
        data.categories.forEach((quiz) => {
            const categoryQuiz = document.createElement("button");
            categoryQuiz.innerText = quiz.name;

            categoryQuiz.addEventListener("click", ()=>{
                this.currentQuiz = quiz;
                this.currentQuestionIndex = 0;
                this.quizScore = 0;
                this.createQuizCard(quiz.questions[this.currentQuestionIndex]);
            
            });

            selectQuizMenu.appendChild(categoryQuiz);
            this.cardElement.appendChild(selectQuizMenu);
        })
    },

    nextQuestion(data){
        console.log(data);
        
        this.currentQuestionIndex++;
        if(this.currentQuestionIndex < 10){
            this.createQuizCard(data.questions[this.currentQuestionIndex]);
        } else {
            this.cardElement.innerHTML = "Quiz Completed!";
            this.displayScore();
        }
    },

    createQuizCard(questionData){
        this.cardElement.innerHTML = ""; //to clean the card each time is called
        const question = document.createElement("p");
        question.innerText = questionData.question;

        const feedback = document.createElement("p");

        const answersContainer = document.createElement("div");
        const buttons = [];

        questionData.answers.forEach((answer) => {
            const answerButton = document.createElement("button");
            answerButton.innerText = answer.text;
            buttons.push(answerButton);

            answerButton.addEventListener("click", ()=> {
                buttons.forEach((btn) => btn.setAttribute("disabled", true));

                if(answer.isCorrect){
                    feedback.innerText = ` Correct! ${answer.text}`
                    answerButton.style.backgroundColor = "green";
                    this.quizScore ++;
                } else {
                    feedback.innerText = ` Incorrect! The correct answer is: ${questionData.answers.find(a => a.isCorrect).text}.`

                    answerButton.style.backgroundColor = "red";
                }

                this.cardElement.appendChild(feedback);

                setTimeout(() => this.nextQuestion(this.currentQuiz), 2000);
            }
        );
            answersContainer.appendChild(answerButton);
        });

        this.cardElement.appendChild(question);
        this.cardElement.appendChild(answersContainer);
    },

    displayScore() {
        const finalScore = document.createElement("p");
        finalScore.classList.add("score");
        finalScore.style.color = this.getScoreColor(this.quizScore);
        finalScore.innerText = `${this.quizScore}/10`;
    
        this.cardElement.appendChild(finalScore);
        this.finishMenu();
    },

    finishMenu(){
        const continueButton = document.createElement("button");
        continueButton.innerText = "continue?";
        continueButton.addEventListener("click", () => this.selectQuiz(this.quizData));
        this.cardElement.appendChild(continueButton);
    },
    
    // Helper Function to Determine the Color
    getScoreColor(score) {
        if (score < 4) return "red";
        if (score >= 4 && score < 6) return "orange";
        if (score >= 6 && score < 8) return "yellow";
        return "green";
    }
};