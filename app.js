import { ProgressComponent } from "./progress.js";

const progressRoot = document.getElementById("progressRoot");
const valueInput = document.getElementById("valueInput");
const animateSwitch = document.getElementById("animateSwitch");
const hideSwitch = document.getElementById("hideSwitch");

const progressComponent = new ProgressComponent();
progressComponent.mount(progressRoot);