import { IComponent } from "../../src/interfaces";
import { Component } from "../../src/core";
import { Button } from "../../components/button/button";

import './question.css'

export class Question implements IComponent{
    private component: Component;
    private question: Component;
    private answerBtn: Button;
    private answers: [] = [];
    private nextBtn: Button;
    
    constructor(questionData: object, nextBtnEvent: {}, answerBtnEvent: {}, nextBtnTextContent: string){
        this.question = new Component({
            className: 'question',
            textContent: questionData.question
        })

        for(const answerTxt of questionData.answers){
            this.answerBtn = new Button({
                className: 'answer',
                textContent: answerTxt,
                events: answerBtnEvent
            })
            
            this.answers.push(this.answerBtn.getComponent());
        }

        this.nextBtn = new Button({
            className: 'next-button',
            textContent: nextBtnTextContent,
            events: nextBtnEvent
        })

        this.component = new Component({
            className: 'question-wrapper',
            children: [this.getQuestion(), ...this.getAnswers(), this.getNextBtn()]
        })
    }

    getQuestion(){
        return this.question.getComponent();
    }

    getAnswers(){
        return this.answers;
    }

    getNextBtn(){
        return this.nextBtn.getComponent();
    }
    
    getComponent(): HTMLElement {
        return this.component.getComponent();
    }
}