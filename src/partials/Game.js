
import { SVG_NS, KEYS, SCORESIZE, PADDLEHEIGHT, PADDLEWIDTH, BOARDGAP } from '../settings';
import { Ball } from './Ball';
import { Board } from './Board';
import { Paddle } from './Paddle';
import { Score } from './Score';
import { Winner } from './Winner';

export default class Game {
    constructor(element, width, height){
        this.funnyMusic = new Audio('public/sounds/SOAD8BIT.mp3');
        this.element = element;
        this.width = width;
        this.height = height;
        this.blink = true;
        
        this.ballRadius = 8;
        this.gameElement = document.getElementById(this.element);
        this.board = new Board(this.width, this.height);
        this.pause = false;
         
        this.player1 = new Paddle(
        this.height,
        PADDLEWIDTH,
        PADDLEHEIGHT,
        BOARDGAP,
        ((this.height - PADDLEHEIGHT) / 2),
        KEYS.p1Up,
        KEYS.p1Down
        )

        this.player2 = new Paddle(
           this.height,
           PADDLEWIDTH,
           PADDLEHEIGHT,
           (this.width - BOARDGAP - PADDLEWIDTH),
           ((this.height - PADDLEHEIGHT) / 2),
           KEYS.p2Up,
           KEYS.p2Down
        )

        this.ball = new Ball(this.ballRadius, this.width, this.height);
        this.score1 = new Score(this.width / 2 - 50, 40, SCORESIZE);
        this.score2 = new Score(this.width / 2 + 25, 40, SCORESIZE);
        document.addEventListener('keydown', event => {
           switch(event.key){
                case KEYS.spaceBar:
                    this.pause = !this.pause;
                    this.funnyMusic.pause();
                break;        
           }
        });  
    }
    
    render(){

        if(this.pause){
           return;
        }
        
        this.gameElement.innerHTML = '';
        let svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttributeNS(null, 'width', this.width);
        svg.setAttributeNS(null, 'height', this.height);
        svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
        this.gameElement.appendChild(svg);
        
        this.board.render(svg);        
        
        this.player1.render(svg);
        this.player2.render(svg);
        
        this.ball.render(svg, this.player1, this.player2);
        this.score1.render(svg, this.player1.getScore());
        this.score2.render(svg, this.player2.getScore());
        this.funnyMusic.play();

        // SHOW WINNER
        if (this.player1.score === 10){
            this.Winner = new Winner (this.width / 16, this.height / 2 + 15, 50, 'WINNER');
            this.Winner.render(svg);
            this.pause = true;  
            this.player1.score = 0;
            this.player2.score = 0; 
        }       
        else if (this.player2.score === 10){
            this.pause = true;
            this.Winner2 = new Winner (this.width - 232, this.height / 2 + 15, 50, 'WINNER');
            this.Winner2.render(svg);
            this.pause = true;    
            this.player1.score = 0;
            this.player2.score = 0; 
        }   
    }
}