export class QualityPercentageCircle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
    <style>
    :host {
        cursor: pointer;
        user-select: none;
        position: relative;
        display: inline-block;
        --progress: 0; /*Initial valuee*/
        --PI: 3.14159265358979;
        --length: 300px;
        --red: calc(256 - (var(--progress) * (256/100)));
        --green: calc(var(--progress) * (256/100));
        --blue: var(--progress);
      }
      div.number-wrapper {
        --progress-text: calc(var(--length) / 10);
        --top: calc( (var(--length) - var(--progress-text)) / 2);
        user-select: none;
        display: flex;
        width: calc(var(--length) / 2);
        justify-content: center;
        font-size: var(--progress-text);
        position: absolute;
        left: calc(var(--length) / 4);
        top: var(--top);
      }
      div.number-wrapper::before{
        counter-reset: progress var(--progress);
        content: counter(progress) "%";
      }
      .progress-circle {
        height: var(--length);
        width: var(--length);
        transform: rotate(-90deg);
      }
      .progress-circle-item {
        cx: calc(var(--length)/2);
        cy: calc(var(--length)/2);
        r: calc(var(--length)/4);
        fill: none;
        stroke-width: calc(var(--length)/20);
      }
      .progress-back {
        stroke: #d2d2d2;
      }
      
      .progress-front {
        stroke: rgb(var(--red), var(--green), var(--blue));
        stroke-dasharray: calc(var(--progress)*var(--PI) * (var(--length) /200)) 1000;
        stroke-dashoffset: 0px;
        transition: 1s ease;
        transition-property: stroke, stroke-dasharray;
      }
      
    </style>
    <svg class="progress-circle">
    <circle class="progress-circle-item progress-back"></circle>
    <circle class="progress-circle-item progress-front"></circle>
  </svg>
    <div class="number-wrapper">
    </div>
`;
  }

  private _percentage: number = 0;

  static get observedAttributes() {
    return ["percentage", "length"];
  }

  get percentage() {
    return this._percentage;
  }

  set percentage(val: number) {
    // reflect
    if (val > 100 || val < 0) return;

    this._percentage = Math.floor(val);
    this.setAttribute("percentage", String(this._percentage));
  }

  attributeChangedCallback(name: string, _: any, newValue: string) {
    console.log(name, newValue);
    if (name === "percentage") {
      this._percentage = Math.floor(Number(newValue));
      this?.style?.setProperty("--progress", newValue);
    }
    if (name === "length") {
      this?.style?.setProperty("--length", newValue + "px");
    }
  }
}

window.customElements.define(
  "quality-percentage-circle",
  QualityPercentageCircle
);
