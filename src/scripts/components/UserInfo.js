export default class UserInfo {
    constructor({ userName, description }) {
        this._userName = userName;
        this._description = description;
       
    }
    getUserInfo() {
        return {
            name: this._userName.textContent,
            description: this._description.textContent,
            
        };
    }


    setUserInfo({ name, description, id }) {
        this._userName.textContent = name;
        this._description.textContent = description;
        this._id = id;
    }
}