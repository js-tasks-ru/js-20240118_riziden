class Tooltip {

  element;

  constructor() {
 

    this.instanse = Tooltip.instanse;
    if(this.instanse) return this.instanse
    Tooltip.instanse = this

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

  initialize () {
    
    document.body.append(this.element);
     //this.element.hidden
    document.addEventListener('pointerover', (e)=>{
      this.render(); 
      !this.element || document.body.append(this.element);
      if(e.target.dataset.tooltip){
        this.element.textContent = e.target.dataset.tooltip
      //this.element.hidden = !this.element.hidden;
      this.element.classList = 'tooltip'
      this.element.style.top = e.target.offsetHeight;
      this.element.style.left = e.target.offsetWidth;
console.log(this.element.style.top)
      }
    });

    
    document.addEventListener('pointerout', (e)=>{
      //this.render();
      if(e.target.dataset.tooltip && this.element){
        this.destroy()
      }
    });
  }

  destroy() {
   this.element.remove();
  }
}

export default Tooltip;
