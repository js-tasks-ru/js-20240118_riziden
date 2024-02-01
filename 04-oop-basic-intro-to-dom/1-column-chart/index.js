export default class ColumnChart {

  constructor({data, label, value, link}) {
    this.data = data;
    this.label = label;

    this.value = value;
    this.link = link;
    this.element = this.element();

  }
  element() {
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
  }

}
