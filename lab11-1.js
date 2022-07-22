const btnRegis = document.querySelector('.btn');

const poll = {
    question: "What is your favourite programming language ? ",
    option: ['0 : JavaScript', '1 : Python', '2 : Rust', '3 : C++'],
    numberOfVotes: new Array(4).fill(0),
    registerNewAnswer() {
        const answer = Number(prompt(`${this.question}\n
         ${this.option.join('\n')} \n (Write option number)`));
        console.log(answer);

        answer === 'number' && answer < this.answer.length &&
            this.answer[answer]++;
        if (answer >= this.option.length) {
            alert('Your answer is wrong')
        };
        this.displayResults();
        this.displayResults('string');

    },
    displayResults(type = 'array') {
        if (type === 'array') {
            console.log(this.answer);
        } else if (type === ' string') {
            console.log(`Poll results are ${this.answer.join(', ')}`)
        }
    },
};
poll.registerNewAnswer();

btnRegis.addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answer: [5, 2, 3] });

// Data: [5, 2, 3]
// data: [1, 5, 3, 9, 6, 1]