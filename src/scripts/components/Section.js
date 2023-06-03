export default class Section {
    constructor(renderer, dataList) {
        this._renderer = renderer;
        this._dataList = dataList;
    }
 
    renderItems(items) {
        items.forEach((item) => {
          const renderedItem = this._renderer(item);
          this._dataList.append(renderedItem);
        });
       
      }

    addItem(element) {
        this._dataList.prepend(element);
    }

}
