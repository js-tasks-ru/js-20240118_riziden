export default class ColumnChart {
  element;
  chartHeight = 50;
  

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = value => value
  } = {}) {
    this.data = data;
    this.label = label;

    this.value = value;
    this.link = link;
    this.formatHeading = ()=>{};

    this.element = this.createElement(this.createTemplate);

  }

  createElement(template) {
    const element = document.createElement('div')
    element.innerHTML = template
    return element.firstElementChild
  }

  createLinkTemplate() {
    if (this.link) {  
      return `<a href="${this.link}" class="column-chart__link">View all</a>`;
    }
    return '';
  }

  createTemplate() {
    return (` 
    
    <div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">
        ${this.label}
        ${this.createLinkTemplate()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">344</div>
        <div data-element="body" class="column-chart__chart">
          <div style="--value: 2" data-tooltip="6%"></div>
          <div style="--value: 22" data-tooltip="44%"></div>
          <div style="--value: 5" data-tooltip="11%"></div>
          <div style="--value: 50" data-tooltip="100%"></div>
          <div style="--value: 12" data-tooltip="25%"></div>
          <div style="--value: 4" data-tooltip="8%"></div>
          <div style="--value: 13" data-tooltip="28%"></div>
          <div style="--value: 5" data-tooltip="11%"></div>
          <div style="--value: 23" data-tooltip="47%"></div>
          <div style="--value: 12" data-tooltip="25%"></div>
          <div style="--value: 34" data-tooltip="69%"></div>
          <div style="--value: 1" data-tooltip="3%"></div>
          <div style="--value: 23" data-tooltip="47%"></div>
          <div style="--value: 27" data-tooltip="56%"></div>
          <div style="--value: 2" data-tooltip="6%"></div>
          <div style="--value: 1" data-tooltip="3%"></div>
        </div>
        </div>
      </div>
    `);
  }

  destroy() {} 
  /* element() {
  //создаем блоки
 
    let columnChart = document.createElement('div');
    let nameChart = document.createElement('div');
    let columnAmount = document.createElement('div');
    //присваиваем классы
    columnChart.className = "column-chart__chart";
    nameChart.className = 'column-chart__title';
    columnAmount.className = 'column-chart__header';

    //добавляем данные
    nameChart.innerHTML += `${this.label}`;
    columnAmount.innerHTML += `${this.value}`;


    columnChart.append(nameChart);
    columnChart.append(columnAmount);
  
    //console.log(columnChart);
    
  

    return columnChart;
  } */

}
