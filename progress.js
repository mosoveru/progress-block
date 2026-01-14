export class ProgressComponent {
    #svg;
    constructor({ size = 160, stroke = 12 } = {}) {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
        svg.setAttribute('role', 'img');

        this.#svg = svg;

        const cx = size / 2;
        const cy = size / 2;
        const radius = (size - stroke) /2;
        const circle = document.createElementNS(svgNamespace, 'circle');
        circle.setAttribute('cx', String(cx));
        circle.setAttribute('cy', String(cy));
        circle.setAttribute('r', String(radius));
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke-width', String(stroke));
        circle.setAttribute('class', 'progress__circle');
        svg.appendChild(circle);
    }

    mount(container) {
        if (!(container instanceof HTMLElement)) {
            throw new TypeError('Контейнер должен быть HTMLElement');
        }
        container.appendChild(this.#svg);
        return this;
    }
}