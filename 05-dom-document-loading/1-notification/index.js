

export default class NotificationMessage {
    element;
    static lastNotificationMessage;
    
    constructor(
      message = '',
      {
        duration = 1000,
        type = 'success' || 'error',
      } = {}) {
      this.message = message;
      this.duration = duration;
      this.type = type;
      
      this.element = this.createElement(this.createTemplate())
    }
  
    createElement(template) {
      const element = document.createElement('div');
      element.innerHTML = template;

      //document.body.append(element.firstElementChild)
      //console.log(element.firstElementChild)
      return element.firstElementChild;
    }

    createTemplate() {
      return `  
      <div class="notification ${this.type}" style="--value:20s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>
      `;   
    }
    show(container = document.body) {
      if (NotificationMessage.lastNotificationMessage) {
        NotificationMessage.lastNotificationMessage.destroy();
      //hide
      }
      //show
      container.appendChild(this.element);
      NotificationMessage.lastNotificationMessage = this;
      this.timeoutID = setTimeout(()=>{this.remove()}, this.duration);

      
    }
    remove() {
      this.element.remove();
    }

    destroy() {
      this.remove();
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }
    }

}
