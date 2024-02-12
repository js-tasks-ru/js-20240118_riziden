
export default class SortableTable {
  static lastTable;
  
  
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.subElements = {};
    this.element = this.createElement(this.createTemplate()); 
  }

  createElement(template) {
    
    const element = document.createElement('div');
    element.innerHTML = template;
    this.lastTable = element;
    return element.firstElementChild;
  }

  createTemplate() {
    return ` 
  <div  data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">

    <div data-element="header" class="sortable-table__header sortable-table__row">
    ${this.createTemplateHeader()}
    </div> 
    <div id = "glav" data-element="body" class="sortable-table__body">
        ${this.createTableBody()}
      </div>
  </div>
  </div>
    `; 
  }

  createTemplateHeader() {
    return this.headerConfig.map((i)=>{         
      return `
      <div class="sortable-table__cell" data-id=${i.id} data-sortable="false">
        <span>${i.title}</span>
      </div>
    `
    
    }).join('') ;
  }

  createTableBody() {
    let tableRow = '';

    const tableBody = this.data.forEach((elem)=>{
      
      tableRow += this.createTableRow(elem);
      
    });
    
    return tableRow;
  }

  createTableRow(elem) {
    return `
    <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        ${this.createPartRow(elem)}
      </a>
    `
  }

  createPartRow(elem) {
    return this.headerConfig.map((i)=>{ 
      if (i.id == 'images') {
        return `
      <div class="sortable-table__cell"></div>
    `
      }      
      return `
      <div class="sortable-table__cell">${elem[i.id]}</div>
    `
   }).join('') ;
  }

  sort(field, order) {
    let sortType = 'string';
    let copyData;
    this.headerConfig.map((i)=>{
      if(i.id == field) sortType = i.sortType;
    });

    this.element.remove();

    if (order == 'asc') {
      copyData = this.data.sort((a, b)=>{
        if (sortType == 'string') {  
         
          return a[field].localeCompare(b[field], 'ru', { caseFirst: 'upper' });
        }
        return a[field] - b[field];
      }); 
    } else {
      copyData = this.data.sort((a, b)=>{
        if (sortType == 'string') {  
          return b[`${field}`].localeCompare(a[`${field}`], 'ru', { caseFirst: 'upper' });
        }
        return b[`${field}`] - a[`${field}`];
      }); 
    }

    
    this.element = this.createElement(this.createTemplate(copyData));
    document.body.append(this.element)
   
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element; 
    });
      
    this.subElements.body.innerHTML = this.createTableBody();
  }

  destroy() {
    this.element.remove();
  }
}

