class Tooltip {

  element;
  container;

  constructor() {
 
    if (Tooltip.instanse) {
      return Tooltip.instanse;
    }
    Tooltip.instanse = this;

    this.element = this.createElement();
    
    this.initialize();
  }

  createElement() {
    
    const element = document.createElement('div');
    
    return element;
  }

  render(container) {


   if(container) container.appendChild(this.element);
    
  }

  onPointerOver = (event) => {
    let container = event.target.closest('[data-tooltip]')
    
    this.render(container); 
    
    if (event.target.dataset.tooltip) {
      this.element.textContent = event.target.dataset.tooltip;
    
      this.element.classList = 'tooltip';
    
      this.element.style.left = event.clientX + 10 + 'px';
      this.element.style.top = event.clientY + 'px';

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
