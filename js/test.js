const questions = [
    {
        question: "Кто является главным героем сериала?",
        answers: ["Майкл Скотт", "Джим Халперт", "Пэм Бисли"],
        correct: 0
    },
    {
        question: "Как зовут секретаря в офисе?",
        answers: ["Пэм", "Джоанна", "Келли"],
        correct: 0
    },
    {
        question: "Какое имя у менеджера отдела продаж?",
        type: "input",
        correct: "Майкл Скотт"
    },
    {
        question: "Какой город является местом действия сериала?",
        type: "input",
        correct: "Скрэнтон"
    },
    {
        question: "Как зовут девушку Джима Халперта?",
        answers: ["Пэм", "Джоанна", "Рэндалл"],
        correct: 0
    },
    {
        question: "Как зовут босса компании Dunder Mifflin?",
        type: "input",
        correct: "Дэвид Уоллс"
    }
];

const testForm = document.getElementById('testForm');
const checkAnswersButton = document.getElementById('checkAnswers');
const restartTestButton = document.getElementById('restartTest');

// Генерация вопросов
function generateQuestions() {
    testForm.innerHTML = ''; // Очищаем форму перед генерацией
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        if (q.type === 'input') {
            questionDiv.innerHTML += `<input type="text" id="answer${index}">`;
        } else {
            q.answers.forEach((answer, i) => {
                questionDiv.innerHTML += `<label><input type="radio" name="q${index}" value="${i}"> ${answer}</label>`;
            });
        }
        testForm.appendChild(questionDiv);
    });
}

generateQuestions();

// Проверка ответов
checkAnswersButton.addEventListener('click', () => {
    let score = 0;
    questions.forEach((q, index) => {
        let userAnswer;
        if (q.type === 'input') {
            userAnswer = document.getElementById(`answer${index}`).value.trim();
        } else {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            userAnswer = selected ? selected.value : null;
        }

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        if (userAnswer === q.correct.toString() || userAnswer === q.correct) {
            resultDiv.textContent = "Правильно!";
            resultDiv.style.color = "green";
            score++;
        } else {
            resultDiv.textContent = `Неправильно. Правильный ответ: ${q.type === 'input' ? q.correct : q.answers[q.correct]}`;
            resultDiv.style.color = "red";
        }

        testForm.children[index].appendChild(resultDiv);
    });

    document.getElementById('result').textContent = `Ваш результат: ${score} из ${questions.length}`;

    // Сохраняем результат теста в localStorage
    localStorage.setItem('testScore', score);

    // Делаем кнопку "Проверить ответы" неактивной
    checkAnswersButton.disabled = true;
    checkAnswersButton.style.backgroundColor = "#777";
    checkAnswersButton.style.cursor = "not-allowed";

    // Показываем кнопку для перезапуска теста
    restartTestButton.style.display = 'block';
});

// Перезапуск теста
restartTestButton.addEventListener('click', () => {
    generateQuestions();
    document.getElementById('result').textContent = '';
    restartTestButton.style.display = 'none';

    // Делаем кнопку "Проверить ответы" активной
    checkAnswersButton.disabled = false;
    checkAnswersButton.style.backgroundColor = "#333";
    checkAnswersButton.style.cursor = "pointer";
});