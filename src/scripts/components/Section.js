export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = selector;
    }
    renderItems() {
        this._items
            .then((items) => {
                items.forEach((item) => {
                    this._renderer(item);
                });
            })
    }

    addItem(element) {
        this._selector.prepend(element);
    }

}