function insertRuleCSS(arraylist) {
    arraylist.forEach(e => {
        styleSheet.insertRule(`${e.selector}{display:${e.status === true ? "flex" : "none"};`);
    });
}
var selectorList = [
    { key: "system_chat", selector: ".n-as-scroll.nimo-scrollbar>.n-as-mrgh,.n-as-scroll.nimo-scrollbar>.n-as-mrg-xs,.n-as-scroll.nimo-scrollbar>.chatroomShareComp-container.c3.n-fx-sc", name: "Thông báo hệ thống (chat)", status: false },
    //{ key: "sharing_chat", selector: ".n-as-scroll.nimo-scrollbar>.chatroomShareComp-container.c3.n-fx-sc", name: "Thông báo chia sẻ", status: false },
    { key: "gift_banner", selector: ".nimo-gift-banner", name: "Thông báo tặng quà(Nổi)", status: false },
    { key: "enter_banner", selector: ".chat-room__enter_banner", name: "Thông báo vào phòng", status: false },
    { key: "marquee_container", selector: ".n-as-w100.n-as-abs.marquee-container", name: "Thông báo chạy màn hình", status: false },
    { key: "event_banner", selector: ".nimo-room__activity", name: "Banner Sự kiện", status: false },
    //{ key: "leveup_chat", selector: ".n-as-scroll.nimo-scrollbar>.n-as-mrg-xs", name: "Thông báo thăng cấp", status: false },
];
function insertSetting() {
    setTimeout(function () {
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
                        /*
                        if (switchBtn.checked) {
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
            }
        }
        insertSetting();
    }, 1000);
}
var style_element = document.createElement("style");
document.head.appendChild(style_element);
var styleSheet = style_element.sheet;
styleSheet.insertRule(`.n-as-scroll.nimo-scrollbar, .n-fx0>.n-as-fs12{font-size:23px;}`);
chrome.storage.sync.get(['settings'], (data) => {
    if (data.settings !== undefined) {
        selectorList.forEach((x, i) => {
            x.status = data.settings[i].status
        })
    }
    insertRuleCSS(selectorList);
})
insertSetting();