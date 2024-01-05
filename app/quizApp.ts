import { Component, append, render } from "../src/core";
import { Button } from "../components/button/button";
import { questionsData } from "../utils/questionsData";
import { Question } from "../schemas/question/question";

import { IComponent } from "../src/interfaces";

import './quizApp.css';

export class QuizApp implements IComponent{
    private app: HTMLElement;
    private component: Component;
    private question: Question;
    private questionCounter: number = 0;
    private result: Component;
    private correctAnswers: number = 0;

    constructor(){
        this.app = document.querySelector("#app");

        this.result = new Component({
            tagName: 'div',
            className: 'result-of-testing',
            textContent: `Correct answers: ${this.correctAnswers} of ${questionsData.length}`
        })
        
        this.component = new Component({
            className: 'quiz-app-wrapper',
            children: [this.getQuestion('Next')]
        })
        
    }

    getQuestion(sendBtnTxt: string){
        this.question = new Question(questionsData[this.questionCounter], this.getNextBtnEvent(), this.getAnswerBtnEvent(), sendBtnTxt);
        return this.question.getComponent();
    }

    getResult(){
        return this.result.getComponent();
    }

    getCorrectAnswers(){
        return console.log(this.correctAnswers);
    }

    getAnswerBtnEvent(){
        return {
            click: (e) => {
                e.target.textContent === questionsData[this.questionCounter].true? e.target.classList += ' true' : e.target.classList += ' false';
                
                const targetParentChildren = [...e.target.parentNode.children];                
                
                targetParentChildren.forEach(el => {                                        
                    if(el.className === 'button answer'){
                        el.disabled = true;
                    } else if(el.className === 'button answer false'){                        
                        el.disabled = true;
                    } else if (el.className === 'button answer true'){
                        this.correctAnswers += 1;

                        console.log(this.correctAnswers);
                        
                        
                        el.disabled = true;
                    }
                });
                
            }
        }
    }

    getNextBtnEvent(){
        return {
            click: (e) => {
                this.questionCounter += 1;
                
                if(this.questionCounter < questionsData.length){
                    if(this.questionCounter === questionsData.length - 1){                        
                        return render(this.component.getComponent(), this.getQuestion('Finish'));    
                    }

                    render(this.component.getComponent(), this.getQuestion('Next'));
                }

                if(this.questionCounter === questionsData.length){
                    render(this.component.getComponent(), this.getResult())
                }                
            }
        }
    }
    
    getComponent(): HTMLElement {
        return this.component.getComponent();
    }
}