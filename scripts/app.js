import { ProgressComponent } from '../components/progress.js';

const progressRoot = document.getElementById('progressRoot');
const valueInput = document.getElementById('valueInput');
const animateSwitch = document.getElementById('animateSwitch');
const hideSwitch = document.getElementById('hideSwitch');

const progressComponent = new ProgressComponent();

valueInput.addEventListener('change', e => {
    valueInput.value = progressComponent.setArcValue(e.target.value);
});
animateSwitch.addEventListener('change', e => {
    progressComponent.setAnimate(e.target.checked);
});
hideSwitch.addEventListener('change', e => {
    progressComponent.setHidden(e.target.checked);
});

progressComponent.mount(progressRoot);