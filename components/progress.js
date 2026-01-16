export class ProgressComponent {
    static #svgNamespace = 'http://www.w3.org/2000/svg';
    static #INVALID_CONTAINER_ERROR = 'Container must be an instance of HTMLElement';
    static #svgClassName = 'progress';
    static #trackClassName = 'progress__track';
    static #arcClassName = 'progress__arc';
    static #playAnimationClassName = 'progress_play';

    #svg;
    #track;
    #arc;
    #circumference;
    #value = 0;
    #isAnimated = false;
    #isHidden = false;
    #minValue;
    #maxValue;

    constructor({
            size = 160,
            stroke = 12,
            trackColor = '#EEF3F6',
            arcColor = '#015DFE',
            arcTransitionDelay = '1s',
            minValue = 0,
            maxValue = 100,
        } = {}
    ) {
        ProgressComponent.#validateNumberField('size', size);
        ProgressComponent.#validateNumberField('stroke', stroke);
        ProgressComponent.#validateNumberField('minValue', minValue);
        ProgressComponent.#validateNumberField('maxValue', maxValue);
        this.#minValue = minValue;
        this.#maxValue = maxValue;
        this.#svg = document.createElementNS(ProgressComponent.#svgNamespace, 'svg');
        this.#svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
        this.#svg.setAttribute('role', 'img');
        this.#svg.setAttribute('width', String(size));
        this.#svg.setAttribute('class', ProgressComponent.#svgClassName);
        const cx = size / 2;
        const cy = size / 2;
        const radius = (size - stroke) / 2;
        this.#circumference = 2 * Math.PI * radius;
        this.#track = ProgressComponent.#createSVGCircle({
            cx,
            cy,
            radius,
            stroke,
            strokeColor: String(trackColor)
        });
        this.#track.setAttribute('class', ProgressComponent.#trackClassName);
        this.#arc = ProgressComponent.#createSVGCircle({
            cx,
            cy,
            radius,
            stroke,
            strokeColor: String(arcColor)
        });
        this.#arc.setAttribute('class', ProgressComponent.#arcClassName);
        this.#arc.style.transition = String(arcTransitionDelay);
        this.#arc.style.strokeDasharray = `${this.#circumference}`;
        this.#arc.style.strokeDashoffset = `${this.#circumference}`;
        this.#svg.appendChild(this.#track);
        this.#svg.appendChild(this.#arc);
    }

    setArcValue(value) {
        this.#value = ProgressComponent.#clampValue(value, this.#minValue, this.#maxValue);
        this.#arc.style.strokeDashoffset = this.#circumference * (1 - this.#value / 100);
        return this.#value;
    }

    setAnimate(isAnimated) {
        this.#isAnimated = Boolean(isAnimated);
        this.#svg.classList.toggle(ProgressComponent.#playAnimationClassName, this.#isAnimated);
    }

    setHidden(isHidden) {
        this.#isHidden = Boolean(isHidden);
        this.#svg.style.display = this.#isHidden ? 'none' : '';
    }

    mount(container) {
        if (!(container instanceof HTMLElement)) {
            throw new TypeError(ProgressComponent.#INVALID_CONTAINER_ERROR);
        }
        container.appendChild(this.#svg);
        return this;
    }

    destroy() {
        this.#svg.remove();
    }

    get value() {
        return this.#value;
    }

    get isAnimated() {
        return this.#isAnimated;
    }

    get isHidden() {
        return this.#isHidden;
    }

    static #createSVGCircle({ cx, cy, radius, stroke, strokeColor }) {
        const circle = document.createElementNS(ProgressComponent.#svgNamespace, 'circle');
        circle.setAttribute('cx', String(cx));
        circle.setAttribute('cy', String(cy));
        circle.setAttribute('r', String(radius));
        circle.setAttribute('stroke-width', String(stroke));
        circle.setAttribute('fill', 'none');
        circle.style.stroke = strokeColor;
        return circle;
    }

    static #clampValue(value, min, max) {
        const num = Number(value);
        if (!ProgressComponent.#isNum(num)) return min;
        const roundedNum = Math.round(num);
        return Math.min(max, Math.max(min, roundedNum));
    }

    static #validateNumberField(fieldName, fieldValue) {
        if (!ProgressComponent.#isNum(fieldValue)) {
            throw new TypeError(`Provided ${fieldName} value is not valid number`);
        }
    }

    static #isNum(num) {
        return Number.isFinite(Number(num));
    }
}