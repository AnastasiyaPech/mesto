export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
    }
    getUserInfo() {
        return {
            name: this._nameSelector.textContent,
            description: this._descriptionSelector.textContent,
        };
    }


    setUserInfo({ name, description }) {
        this._nameSelector.textContent = name;
        this._descriptionSelector.textContent = description;
    }
}