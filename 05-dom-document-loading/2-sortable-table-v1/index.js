

export default class SortableTable {
  static lastTable;
  
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    //this.show()
    
    
    const element = document.createElement('div');
    element.innerHTML = template;
    //console.log(element)
    //document.body.appendChild(element)
    this.lastTable = element;
    return element;
  }

  createTemplate() {
    const head = ` 
  <div  data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">

    <div data-element="header" class="sortable-table__header sortable-table__row">
      <div class="sortable-table__cell" data-id="images" data-sortable="false" data-order="asc">
        <span>Image</span>
      </div>
      <div class="sortable-table__cell" data-id="title" data-sortable="true" data-order="asc">
        <span>Name</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>
      <div class="sortable-table__cell" data-id="quantity" data-sortable="true" data-order="asc" dataset = "order">
        <span>Quantity</span>
      </div>
      <div class="sortable-table__cell" data-id="price" data-sortable="true" data-order="asc">
        <span>Price</span>
      </div>
      <div class="sortable-table__cell" data-id="sales" data-sortable="true" data-order="asc">
        <span>Sales</span>
      </div>
    </div> 
    <div id = "glav" data-element="body" class="sortable-table__body">
        ${this.createTableBody()}
      </div>
  </div>
  </div>
    `;
    return head;   
  }

  createTableBody() {
    let tableRow = '';

    const tableBody = this.data.forEach((elem)=>{
      // sort

      tableRow += this.createTableRow(elem.title, elem.quantity, elem.price, elem.sales)

    });
    
    return tableRow;
  }

  createTableRow(title, quantity, price, sales) {

  
    return `
    
    <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/246743.jpg">
        </div>
        <div class="sortable-table__cell">${title}</div>

        <div class="sortable-table__cell">${quantity}</div>
        <div class="sortable-table__cell">${price}</div>
        <div class="sortable-table__cell">${sales}</div>
      </a>
      </div>
    `
  }

  sort(field, order) {
    
    // let dataCopy = [...this.data];
    if (order) {
      this.element.remove()
      this.data.sort((a, b)=>{
        return a[`${field}`] - b[`${field}`];
        //return a.price - b.price;
      });

      
    }
    console.log(this.data)
    this.element = this.createElement(this.createTemplate());
    let root = document.getElementById("root")
    root.append(this.element);

    //return this.data;
    
  }

  /* show() {
     if (SortableTable.lastTable) {
      SortableTable.lastTable.remove();
    //hide
    }
    //show
    let pro = document.getElementById("glav");
    let root = document.getElementById("root")
    root.append(this.element);
    SortableTable.lastTable = this.element; 
   
  } */


  destroy() {
    this.element.remove();
  }
}

