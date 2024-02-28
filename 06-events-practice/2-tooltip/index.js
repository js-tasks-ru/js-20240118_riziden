class Tooltip {

  element;

  constructor() {
 
    if (Tooltip.instanse) {
      return Tooltip.instanse;
    }
    Tooltip.instanse = this;
  
    /* this.instanse = Tooltip.instanse;
    if (this.instanse) return this.instanse;
    Tooltip.instanse = this; */

    this.element = this.createElement();
    
    this.initialize();
  }
  //render() {}
  //initialize () {}


  createElement() {
    
    const element = document.createElement('div');
    //element.innerHTML = `<div>VLASOV${prop}</div>`;
    //element.hidden = !element.hidden;
    
    return element;
  }

  render(prop) {
    this.createElement();
  }

  createTamplateElement(e) {
    
  }

  onPointerOver = (e) => {
    this.render(); 
    !this.element || document.body.append(this.element);
    if (e.target.dataset.tooltip) {
      this.element.textContent = e.target.dataset.tooltip;
    //this.element.hidden = !this.element.hidden;
      this.element.classList = 'tooltip';
    
      this.element.style.left = e.clientX + 10 + 'px';
      this.element.style.top = e.clientY + 'px';

    }
  }

  onPointerOut = (e) => {
    if (e.target.dataset.tooltip && this.element) {
      this.element.remove();
    }
  }

  initialize () {
    
    document.body.append(this.element);
     
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  destroy() {
    this.element.remove();
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
  }
}

export default Tooltip;
