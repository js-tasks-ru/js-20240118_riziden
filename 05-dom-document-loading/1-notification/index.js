

export default class NotificationMessage {
    element;
    
    constructor(
      message = '',
      {
        duration = 0,
        type = ''
      } = {}) {
      this.message = message;
      this.duration = duration;
      this.type = type;
      
      this.element = this.createElement(this.createTemplate())
    }
  
    createElement(template) {
      const element = document.createElement('div');
      element.innerHTML = template;

      document.body.append(element.firstElementChild)
      //console.log(element.firstElementChild)
      return element.firstElementChild;
    }

    createTemplate() {
      return `  
      <div class="notification success" style="--value:20s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">success</div>
      <div class="notification-body">
        Hello world
      </div>
    </div>
  </div>
      `;   
    }
    show() {
      document.body.append(this.element.firstElementChild)
    }

}
