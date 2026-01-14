export class ProgressComponent {
    static svgNamespace = "http://www.w3.org/2000/svg";

    #svg;
    #track;
    #arc;
    #value = 0;
    #circumference;

    constructor({size = 160, stroke = 12} = {}) {
        const svg = document.createElementNS(ProgressComponent.svgNamespace, "svg");
        svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
        svg.setAttribute('role', 'img');
        const cx = size / 2;
        const cy = size / 2;
        const radius = (size - stroke) / 2;
        const trackCircle = ProgressComponent.#createSVGCircle({cx, cy, radius, stroke});
        trackCircle.setAttribute('class', 'progress__track');
        svg.appendChild(trackCircle);
        const arc = ProgressComponent.#createSVGCircle({cx, cy, radius, stroke});
        arc.setAttribute('class', 'progress__arc');
        svg.appendChild(arc);
        const circumference = 2 * Math.PI * radius;
        this.#circumference = circumference;
        arc.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
        arc.style.strokeDasharray = `${circumference}`;
        arc.style.strokeDashoffset = `${circumference}`;
        this.#arc = arc;
        this.#track = trackCircle;
        this.#svg = svg;
    }

    setArcValue(value) {
        this.#value = value;
        const clampedValue = ProgressComponent.#clampValue(value);
        const offset = this.#circumference * (1 - clampedValue / 100);
        this.#arc.style.strokeDashoffset = offset;
        return this;
    }

    mount(container) {
        if (!(container instanceof HTMLElement)) {
            throw new TypeError('Контейнер должен быть экземпляром HTMLElement');
        }
        container.appendChild(this.#svg);
        return this;
    }

    static #createSVGCircle({ cx, cy, radius, stroke }) {
        const circle = document.createElementNS(ProgressComponent.svgNamespace, 'circle');
        circle.setAttribute('cx', String(cx));
        circle.setAttribute('cy', String(cy));
        circle.setAttribute('r', String(radius));
        circle.setAttribute('stroke-width', String(stroke));
        circle.setAttribute('fill', 'none');
        return circle;
    }

    static #clampValue(value) {
        const num = Number(value);
        if (!Number.isFinite(num)) return 0;
        const roundedNum = Math.round(num);
        return Math.min(100, Math.max(0, roundedNum));
    }
}