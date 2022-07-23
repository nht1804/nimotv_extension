function insertRuleCSS(arraylist) {
    arraylist.forEach(e => {
        styleSheet.insertRule(`${e.selector}{display:${e.status === true ? "flex" : "none"};`);
    });
}
function cookie() {
    return Object.fromEntries(
        document.cookie
            .split("; ")
            .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
    );
}
var get_status = (s_name) => {
    if(cookie().s_name !== undefined){

    }
}
var slectorList = [
    { selector: ".n-as-scroll.nimo-scrollbar>.n-as-mrgh", name: "Thông báo hệ thống (chat)", status: false },
    { selector: ".n-as-scroll.nimo-scrollbar>.chatroomShareComp-container.c3.n-fx-sc", name: "Thông báo chia sẻ", status: false },
    { selector: ".nimo-gift-banner", name: "Thông báo tặng quà(Nổi)", status: false },
    { selector: ".chat-room__enter_banner", name: "Thông báo vào phòng", status: false },
    { selector: ".n-as-w100.n-as-abs.marquee-container", name: "Thông báo chạy màn hình", status: false },
    { selector: ".nimo-room__activity", name: "Banner Sự kiện", status: false },
    { selector: ".n-as-scroll.nimo-scrollbar>.n-as-mrg-xs", name: "Thông báo thăng cấp", status: false },
];
function insertSetting() {
    setTimeout(function () {
        let a = document.querySelectorAll(".nimoE_test");
        if (a.length === 0) {
            let b = document.querySelector(".ClientChatSettingsPopover-items");
            if (b !== null) {
                b.innerHTML += `<hr>`;
                slectorList.forEach(x => {
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
                        if (switchBtn.checked) {
                            for (let i = 0; i < styleSheet.cssRules.length; i++) {
                                if (styleSheet.cssRules[i].selectorText.replace(/\s/g, '') === x.selector) {
                                    styleSheet.deleteRule(i);
                                }
                            }
                        }
                        else {
                            styleSheet.insertRule(`${x.selector}{display:none;}`)
                        }
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
    }, 100);
}
var style_element = document.createElement("style");
document.head.appendChild(style_element);
var styleSheet = style_element.sheet;
insertRuleCSS(slectorList);
styleSheet.insertRule(`.n-as-scroll.nimo-scrollbar{font-size:23px;}`);

insertSetting();
