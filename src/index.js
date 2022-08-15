import './style.css'
import Icon from './imgs/icon.png'
import logo from './imgs/todologo.png'
import home from "../src/imgs/home.png"
import today from "../src/imgs/today.png"
import week from "../src/imgs/week.png"
import add from "../src/imgs/add.png"
const homeImg = document.querySelector('.home');
const todayImg = document.querySelector('.today');
const weekImg = document.querySelector('.week');
const projectImg = document.querySelector('.project');
console.log(projectImg);

const linkIcon = document.querySelector('link[rel="icon"]')
linkIcon.href = Icon
const Logo = document.querySelector('div img.logo');
Logo.src = logo;
homeImg.src = home;
todayImg.src = today;
weekImg.src = week;
projectImg.src = add;

