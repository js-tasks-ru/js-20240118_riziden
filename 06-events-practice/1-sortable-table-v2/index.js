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
    this.selectSubElements = super.selectSubElements();
    this.sort(this.sorted.id, this.sorted.order);
    this.element.addEventListener('pointerdown', this.onDivClick);
  }


  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  onDivClick = (e)=> {
    if (e.target.closest('[data-id]')) {
      let el = e.target.closest('[data-id]');
      this.sort(el.dataset.id, el.dataset.order);

      if (el.dataset.order == "desc") {el.dataset.order = "asc";
      } else {
        el.dataset.order = "desc";}
    }
  }
 
  sort(field = 'title', order = 'desc') {
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
