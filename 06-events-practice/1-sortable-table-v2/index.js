import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";


export default class SortableTable extends SortableTableV1 {

  element;
  subElements = {};

  constructor(headersConfig = [], {
    data = [],
    sorted = {}
  } = {}) {
    super(headersConfig, data);
    
    this.headersConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;
    this.element = this.createElement(super.createTemplate()); 
    this.selectSubElements();
    this.sort(this.sorted.id, this.sorted.order);
    
  }

  


  createElement(template) {
   
    const element = document.createElement('div');
    element.innerHTML = template;

    element.firstElementChild.addEventListener('pointerdown', this.onDivClick);
    
    return element.firstElementChild;
  }

  onDivClick = (e)=> {
    if (e.target.closest('[data-id]')) {
      let el = e.target.closest('[data-id]');
      this.sort(el.dataset.id, el.dataset.order);

      console.log(el.dataset.id, el.dataset.order);

      if (el.dataset.order == "desc") {el.dataset.order = "asc";
      } else {
        el.dataset.order = "desc";}
    }
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
      //this.createElementsHandler(element);
    });
   
  }
  
  /* createElementsHandler(element) {
    element.querySelectorAll('[data-sortable]').forEach(elem => {

      elem.addEventListener('pointerdown', ()=>{this.sort(elem.dataset.id, elem.dataset.order);
        (elem.dataset.order == "desc") ? elem.dataset.order = "asc" : elem.dataset.order = "desc";
      });
      
    });
  }  */



  
  /* createTemplate() {
    return ` 
  <div  data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">

    <div data-element="header" class="sortable-table__header sortable-table__row">
    ${super.createHeaderTemplate()}
    </div> 
    <div data-element="body" class="sortable-table__body">
    ${super.createBodyTemplate()}
      </div>
  </div>
  </div>
    `; 
  } */

  /* createHeaderTemplate() { 
    return this.headersConfig.map((element)=>{         
      return `
      <div  class="sortable-table__cell" data-id=${element.id} data-sortable=${element.sortable} data-order = "asc">
        <span>${element.title}</span>
      </div>
    `
    }).join('') ;
  } */

  /* createBodyTemplate() {
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
  
      return `<div class="sortable-table__cell" data-id=${fieldName}>
      ${fieldValue}
      <span data-element="arrow" class="sortable-table__sort-arrow">
      </div>`;
    }).join('') ;
  }
 */
  sort(field = 'title', order = 'desc') {
    //this.proba()
    const orders = {
      'desc': -1,
      'asc': 1,
    };

    const sortedData = [...this.data].sort((itemA, itemB) => {
      const k = orders[order];
      const valueA = itemA[field];
      const valueB = itemB[field];

      if (typeof valueA == 'string') { 
        
        return k * valueB.localeCompare(valueA, 'ru-en', {caseFirst: 'upper'});
      } else {
        return k * (valueB - valueA);
      }   
      
    });  

    this.data = sortedData;
    this.subElements.body.innerHTML = this.createBodyTemplate(sortedData);
  }

  destroy() {
    this.element.removeEventListener('pointerdown', this.onDivClick);
    this.element.remove();
  }
}
