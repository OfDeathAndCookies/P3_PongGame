import { SVG_NS } from '../settings';

export class Board {
    constructor(width, height){
        this.width = width;
        this.height = height;

    }
    render(svg) {
            // BOARD ITSELF -> width & height defined in settings.js
            let rect = document.createElementNS(SVG_NS, 'rect');
            rect.setAttributeNS(null, 'fill', '#353535');
            rect.setAttributeNS(null, 'width', this.width);
            rect.setAttributeNS(null, 'height', this.height);

            // CENTER DOTTED LINE
            let line = document.createElementNS(SVG_NS, 'line');
            line.setAttributeNS(null, 'x1', (this.width/2));
            line.setAttributeNS(null, 'y1', 0);
            line.setAttributeNS(null, 'x2', (this.width/2));
            line.setAttributeNS(null, 'y2', (this.height));
            line.setAttributeNS(null, 'stroke', 'white');
            line.setAttributeNS(null, 'stroke-dasharray', '20, 15');
            line.setAttributeNS(null, 'stoke-width', '4');
            
            
            svg.appendChild(rect);
            svg.appendChild(line);
    }
}