export default class SortableTable {
  constructor(headersConfig = [], {
    data = [],
    sorted = {}
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;
    this.subElements = {};
    this.element = this.createElement(this.createTemplate()); 
  }

  createElement(template) {
    
    const element = document.createElement('div');
    element.innerHTML = template;
    //return element.firstElementChild;
    return element.firstElementChild;
  }

  createTemplate() {
    return ` 
  <div  data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">

    <div data-element="header" class="sortable-table__header sortable-table__row">
    
    </div> 
    <div id = "glav" data-element="body" class="sortable-table__body">
        
      </div>
  </div>
  </div>
    `; 
  }

  destroy() {
    this.element.remove();
  }
}
