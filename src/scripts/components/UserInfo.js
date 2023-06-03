export default class UserInfo {
    constructor({ userName, description, avatar }) {
        this._userName = userName;
        this._description = description;
        this._btnAvatar = avatar;
    }
    getUserInfo() {
        return {
            name: this._userName.textContent,
            description: this._description.textContent,

        };
    }


    setUserInfo({ name, description, avatar, id }) {
        this._userName.textContent = name;
        this._description.textContent = description;
        this._id = id;
        this._btnAvatar.style.backgroundImage = "url(" + avatar + ")";
    }

}