export const INPUT_TYPES = {
    THEME: 1,
    NUMBER: 2
}

export function Input(type, defaultValue, action=()=>{},txt="") {
    return { type, defaultValue, action, txt };
}

export const SettingsBox = {
    box: null,
    closeBtn: null,
    options: [],
    init: function (...options) {
        this.box = document.createElement("div");
        this.box.classList.add("settings-box");

        this.closeBtn = document.createElement("div");
        this.closeBtn.classList.add("settings-box-close-btn");
        this.closeBtn.textContent = "X";
        this.closeBtn.onclick = this.hide.bind(this);
        this.box.appendChild(this.closeBtn);

        options.forEach((val) => {
            if (val.type == INPUT_TYPES.THEME) {
                let elem = document.createElement("div");
                elem.classList.add("settings-box-theme-input");
                elem.classList.add("bx-t-"+val.defaultValue);

                elem.onclick = (e) => {
                    elem.classList.toggle("bx-t-dark");
                    elem.classList.toggle("bx-t-light");
                    val.action(e);
                }
                this.box.appendChild(elem);

            } else if (val.type == INPUT_TYPES.NUMBER) {
                let txtElem = document.createElement("div");
                txtElem.classList.add("settings-box-num-txt");
                txtElem.textContent = val.txt;

                let numInElem = document.createElement("input");
                numInElem.type = "number";
                numInElem.value = val.defaultValue;
                numInElem.oninput = val.action;
                numInElem.classList.add("settings-box-num-input");

                this.box.appendChild(txtElem);
                this.box.appendChild(numInElem);
            }
        });


    },
    display: function () {
        document.body.appendChild(this.box);
    },
    hide: function () {
        this.box.remove();
    }
}