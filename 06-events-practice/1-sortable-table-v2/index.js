export default class SortableTable {

  element;
  subElements = {};

  constructor(headersConfig = [], {
    data = [],
    sorted = {}
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;
    this.element = this.createElement(this.createTemplate()); 
    this.selectSubElements();
  }

  createElement(template) {
    
    const element = document.createElement('div');
    element.innerHTML = template;
    console.log(element);
    return element.firstElementChild;
  }

  createElementsHandler(element) {
    element.querySelectorAll('[data-sortable]').forEach(elem => {

      elem.addEventListener('pointerdown', ()=>{this.sort(elem.dataset.id, elem.dataset.order);
        (elem.dataset.order == "desc") ? elem.dataset.order = "asc" : elem.dataset.order = "desc";
      });
      
    });
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
      this.createElementsHandler(element)
    });
   
  }

  createTemplate() {
    return ` 
  <div  data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">

    <div data-element="header" class="sortable-table__header sortable-table__row">
    ${this.createHeaderTemplate()}
    </div> 
    <div data-element="body" class="sortable-table__body">
    ${this.createBodyTemplate()}
      </div>
  </div>
  </div>
    `; 
  }

  createHeaderTemplate() { 
    return this.headersConfig.map((element)=>{         
      return `
      <div  class="sortable-table__cell" data-id=${element.id} data-sortable=${element.sortable} data-order = "asc">
        <span>${element.title}</span>
      </div>
    `
    }).join('') ;
  }

  createBodyTemplate() {
    return this.data.map(this.createRowTemplate).join('');
  }

  createRowTemplate = (data) => {
    return `
      <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        ${this.createRowContentTemplate(data)}
      </a>
    `;
  }

  createRowContentTemplate = (data) => {
    return this.headersConfig.map((columnConfig)=>{ 
      if (columnConfig.template) {
        return columnConfig.template(data);
      }

      const fieldName = columnConfig.id;
      const fieldValue = data[fieldName];
  
      return `<div class="sortable-table__cell" data-id="title">
      ${fieldValue}
      <span data-element="arrow" class="sortable-table__sort-arrow">
      </div>`;
    }).join('') ;
  }

  sort(field = 'title', order = 'desc') {
    const orders = {
      'desc': -1,
      'asc': 1,
    };

    console.log("PUSK________________")
    const sortedData = [...this.data].sort((itemA, itemB) => {
      const k = orders[order];
      const valueA = itemA[field];
      const valueB = itemB[field];

      if (typeof valueA === 'string') { 
        return k * valueB.localeCompare(valueA, 'ru-en', {caseFirst: 'upper'});
      }
      return k * (valueB - valueA);
    });  

    this.data = sortedData;
    this.subElements.body.innerHTML = this.createBodyTemplate(sortedData);
  }

  destroy() {
    this.element.remove();
  }
}
