var selectorList = [
    { key: "system_chat", selector: ".n-as-scroll.nimo-scrollbar>.n-as-mrgh,.n-as-scroll.nimo-scrollbar>.n-as-mrg-xs,.n-as-scroll.nimo-scrollbar>.chatroomShareComp-container.c3.n-fx-sc", name: "Thông báo hệ thống (chat)", status: false },
    //{ key: "sharing_chat", selector: ".n-as-scroll.nimo-scrollbar>.chatroomShareComp-container.c3.n-fx-sc", name: "Thông báo chia sẻ", status: false },
    { key: "gift_banner", selector: ".nimo-gift-banner", name: "Thông báo tặng quà(Nổi)", status: false },
    { key: "enter_banner", selector: ".chat-room__enter_banner", name: "Thông báo vào phòng", status: false },
    { key: "marquee_container", selector: ".n-as-w100.n-as-abs.marquee-container", name: "Thông báo chạy màn hình", status: false },
    { key: "event_banner", selector: ".nimo-room__activity", name: "Banner Sự kiện", status: false },
    //{ key: "leveup_chat", selector: ".n-as-scroll.nimo-scrollbar>.n-as-mrg-xs", name: "Thông báo thăng cấp", status: false },
];
var font_setting = {
    selector: '.n-as-scroll.nimo-scrollbar,.n-fx0>.n-as-fs12',
    size: 14
}
function insertRuleCSS(arraylist) {
    arraylist.forEach(e => {
        styleSheet.insertRule(`${e.selector}{display:${e.status === true ? "flex" : "none"};`);
    });
}
function insertSetting() {
    let a = document.querySelectorAll(".nimoE_test");
    if (a.length === 0) {
        let b = document.querySelector(".ClientChatSettingsPopover-items");
        if (b !== null) {
            b.innerHTML += `<div class="ClientChatSettingsPopover-title nimoE_test">NimoTV-E</div>`;
            selectorList.forEach((x) => {
                let wrap = document.createElement("div");
                wrap.classList.add("nimoE_test");
                wrap.classList.add("n-fx-sc");

                let div = document.createElement("div");
                div.classList.add("n-fx1");
                div.innerText = x.name;

                let switchBtn = document.createElement("input");
                switchBtn.setAttribute("type", "checkbox");
                switchBtn.setAttribute("role", "switch");
                switchBtn.checked = x.status;

                switchBtn.addEventListener("click", function () {
                    for (let i = 0; i < styleSheet.cssRules.length; i++) {
                        if (styleSheet.cssRules[i].selectorText.replace(/\s/g, '') === x.selector) {
                            styleSheet.deleteRule(i);
                        }
                    }
                    if (switchBtn.checked === false) {
                        styleSheet.insertRule(`${x.selector}{display:none;}`)
                    }
                    /*if (switchBtn.checked) {
                        for (let i = 0; i < styleSheet.cssRules.length; i++) {
                            if (styleSheet.cssRules[i].selectorText.replace(/\s/g, '') === x.selector) {
                                styleSheet.deleteRule(i);
                            }
                        }
                    }
                    else {
                        styleSheet.insertRule(`${x.selector}{display:none;}`)
                    }*/
                    x.status = !x.status;
                    chrome.storage.sync.set({ settings: selectorList });
                })

                switchBtn.classList.add("nimo-switch");
                switchBtn.classList.add("ClientChatSettingsSwitch");

                wrap.appendChild(div);
                wrap.appendChild(switchBtn);

                b.appendChild(wrap);
            })
            insertFontSetting(b);
        }
    }
}
function insertFontSetting(parent) {
    let save_font_setting = () => {
        font_setting.size = input.value;
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
            if (styleSheet.cssRules[i].selectorText.replace(/\s/g, '') === font_setting.selector) {
                styleSheet.deleteRule(i);
            }
        }
        styleSheet.insertRule(`${font_setting.selector}{font-size:${font_setting.size}px;}`);
        chrome.storage.sync.set({ f_setting: font_setting });
        inputWrap.style.borderColor = "#00ff33";
        setTimeout(function () {
            inputWrap.style.borderColor = "#ffffff";
        }, 3000)
    }
    let wrap = document.createElement("div");
    wrap.classList.add("nimoE_test");
    wrap.classList.add("n-fx-sc");


    let div = document.createElement("div");
    div.classList.add("n-fx1");
    div.innerText = "Cỡ chữ";

    let inputWrap = document.createElement("div");
    inputWrap.classList.add("input__wrap");
    inputWrap.classList.add("input_bg");

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.classList.add("text_input");
    input.classList.add("input_bg");
    input.value = font_setting.size;
    input.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            save_font_setting();
        }
    })

    let btnInput = document.createElement("div");
    btnInput.classList.add("input_button"); btnInput.classList.add("input_bg");
    btnInput.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
  </svg>`;
    btnInput.addEventListener("click", function () {
        save_font_setting();
    })

    inputWrap.appendChild(input);
    inputWrap.appendChild(btnInput);

    wrap.appendChild(div)
    wrap.appendChild(inputWrap);

    parent.appendChild(wrap);
}
function run() {
    setTimeout(function () {
        insertSetting();
        run();
    }, 1000)
}
var style_element = document.createElement("style");
document.head.appendChild(style_element);
var styleSheet = style_element.sheet;
chrome.storage.sync.get(['settings'], (data) => {
    if (data.settings !== undefined) {
        selectorList.forEach((x, i) => {
            x.status = data.settings[i].status
        })
    }
    insertRuleCSS(selectorList);
})
chrome.storage.sync.get(['f_setting'], (data) => {
    if (data.f_setting !== undefined) {
        font_setting.size = data.f_setting.size
    }
    styleSheet.insertRule(`${font_setting.selector}{font-size:${font_setting.size}px;}`);
})
run();