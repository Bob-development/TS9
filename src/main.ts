import './style.css'
import { QuizApp } from "../app/quizApp"
import { Button } from "../components/button/button";
import { append } from './core';
const app = document.querySelector("#app");
const a = new QuizApp();

append(app, a.getComponent())