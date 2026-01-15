export class ProgressComponent {
    static svgNamespace = 'http://www.w3.org/2000/svg';

    #svg;
    #track;
    #arc;
    #circumference;
    #value = 0;
    #animated = false;
    #hidden = false;

    constructor({
            size = 160,
            stroke = 12,
            trackColor = '#EEF3F6',
            arcColor = '#015DFE',
            arcTransitionDelay = '1s'
        } = {}
    ) {
        this.#svg = document.createElementNS(ProgressComponent.svgNamespace, 'svg');
        this.#svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
        this.#svg.setAttribute('role', 'img');
        this.#svg.setAttribute('width', String(size));
        this.#svg.setAttribute('class', 'progress');
        const cx = size / 2;
        const cy = size / 2;
        const radius = (size - stroke) / 2;
        this.#circumference = 2 * Math.PI * radius;
        this.#track = ProgressComponent.#createSVGCircle({
            cx,
            cy,
            radius,
            stroke,
            strokeColor: trackColor
        });
        this.#track.setAttribute('class', 'progress__track');
        this.#arc = ProgressComponent.#createSVGCircle({
            cx,
            cy,
            radius,
            stroke,
            strokeColor: arcColor
        });
        this.#arc.setAttribute('class', 'progress__arc');
        this.#arc.style.transition = arcTransitionDelay;
        this.#arc.style.strokeDasharray = `${this.#circumference}`;
        this.#arc.style.strokeDashoffset = `${this.#circumference}`;
        this.#svg.appendChild(this.#track);
        this.#svg.appendChild(this.#arc);
    }

    setArcValue(value) {
        this.#value = ProgressComponent.#clampValue(value);
        this.#arc.style.strokeDashoffset = this.#circumference * (1 - this.#value / 100);
        return this.#value;
    }

    setAnimate(isAnimated) {
        this.#animated = Boolean(isAnimated);
        this.#svg.classList.toggle('progress_play', this.#animated);
    }

    setHidden(isHidden) {
        this.#hidden = Boolean(isHidden);
        this.#svg.style.display = this.#hidden ? 'none' : '';
    }

    mount(container) {
        if (!(container instanceof HTMLElement)) {
            throw new TypeError('Контейнер должен быть экземпляром HTMLElement');
        }
        container.appendChild(this.#svg);
        return this;
    }

    destroy() {
        this.#svg.remove();
    }

    getState() {
        return {
            value: this.#value,
            animated: this.#animated,
            hidden: this.#hidden,
        };
    }

    static #createSVGCircle({ cx, cy, radius, stroke, strokeColor }) {
        const circle = document.createElementNS(ProgressComponent.svgNamespace, 'circle');
        circle.setAttribute('cx', String(cx));
        circle.setAttribute('cy', String(cy));
        circle.setAttribute('r', String(radius));
        circle.setAttribute('stroke-width', String(stroke));
        circle.setAttribute('fill', 'none');
        circle.style.stroke = strokeColor;
        return circle;
    }

    static #clampValue(value) {
        const num = Number(value);
        if (!Number.isFinite(num)) return 0;
        const roundedNum = Math.round(num);
        return Math.min(100, Math.max(0, roundedNum));
    }
}