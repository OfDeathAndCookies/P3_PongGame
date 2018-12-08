import { SVG_NS } from '../settings'; 

export class Winner{
    constructor(x, y, size, string){
        this.x = x;
        this.y = y;
        this.size = size;
        this.string = string;
    }

    render(svg){
        let text = document.createElementNS(SVG_NS, 'text')
        text.setAttributeNS(null, 'x', this.x);
        text.setAttributeNS(null, 'y', this.y);
        text.setAttributeNS(null, 'fill', 'yellow');
        text.setAttributeNS(null, 'font-size', this.size);
        text.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
        text.textContent = this.string;

        svg.appendChild(text);
    }
}