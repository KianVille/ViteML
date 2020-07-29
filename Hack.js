//This is for bookmarklet

document.querySelector('#contentIframe').src = 'http://192.168.254.254/ipqostc.htm';
let KV_ORIG_STYLES = [];
$KV('link').forEach((el) => {
    KV_ORIG_STYLES.push(el.href);
    el.href = '';
});

let addStyle = (() => {
    const style = document.createElement('style');
    const KVmeta = document.createElement('meta');
    KVmeta.setAttribute('name', 'viewport');
    KVmeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    document.head.append(KVmeta);
    document.head.append(style);
    return (styleString) => (style.textContent = styleString);
})();

addStyle(`
    .KV_BODY {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        background-color: #050505;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Helvetica;
        color: #9bdeac;
        z-index: 99;
    }

    .KV_PAGE {
        height: 35%;
        width: 70%;
        /* background-color: red; */
        text-align: center;
        display: none;
        flex-direction: column;
        align-items: center;
        animation: fadeIn 1.5s;
    }

    @-webkit-keyframes fadeIn {
    from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
    }

    @-webkit-keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
    to { opacity: 0; }
    }

    .kv_buttons {


        height: 60%;
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        /* background-color: blue; */
    }

    .kv_btn {
        font-family: Helvetica;
        background: transparent;
        border: 3px solid black;
        height: 30%;
        width: 60%;
        color: white;
    }

    .kv_primary {
        border-color: #9bdeac;
    }

    .kv_primary:hover {
        background-color: #9bdeac;
        color: black;
    }

    .kv_danger {
        border-color: #e7305b;
    }

    .kv_danger:hover {
        background-color: #e7305b;
        color: black;
    }

    .kv_home {
        border-color: #eebb4d;
    }

    .kv_home:hover {
        background-color: #eebb4d;
    }

    #KV_INJECTION {
        justify-content: space-around;
    }

    #KV_REMOVER  {
        justify-content: space-around;
    }

    #KV_REMOVER #KV_UI_TABLE {
        width: 70%;
    }

    #KV_REMOVER #KV_UI_TABLE td {
        text-align: center;
        vertical-align: middle;
    }

    .KV_TBL {
        overflow: scroll;
        height: 30%;
        width: 100%;
        font-size: 0.7rem;
    }



    .progress-bar {
        width: 90%;
        background-color: #e0e0e0;

    }
        
    .progress-bar-fill {
        display: block;
        height: 5px;
        background-color: #17706e;		
        transition: width 500ms ease-in-out;
    }

    .table-highlight {
        color: #cf1b1b;
    }

    #KV_INJECTION button {
        display:none;
        animation: fadeIn 1.5s;
    }
    #KV_REMOVER button {
        display:none;
        animation: fadeIn 1.5s;
    }

    #KV_REMOVER {
        color: #cf1b1b;
    }


`);

let addHTML = (() => {
    let KV_DIV_BODY = document.createElement('div');
    KV_DIV_BODY.setAttribute('class', 'KV_BODY');
    document.body.append(KV_DIV_BODY);
    return (KV_DIV_BODYSTRING) => (KV_DIV_BODY.innerHTML = KV_DIV_BODYSTRING);
})();

addHTML(`

<div class="KV_PAGE" id="KV_MENU">
            <div class="kv_title">
                <h1>Vite ML</h1>
                <h6>version 0.2</h6>
            </div>
    
            <div class="kv_buttons">
                    <button id="KV_hack_btn" class="kv_btn kv_primary">HACK</button>
                    <button id= "KV_remove_btn" class="kv_btn kv_danger">REMOVE</button>
                    <button id="KV_home_btn" class="kv_btn kv_home">HOME</button>
            </div>
        </div>

        <div class="KV_PAGE" id="KV_INJECTION">

            <div class="kv_title">
                <h2 id='kv_status'>Injecting...</h2>
                <h5 id="progress-label">0%</h5>
            </div> 
            <div class="progress-bar">
                <span class="progress-bar-fill" style="width: 0%;"></span>
            </div>    

            <table id="KV_UI_TABLE" class="KV_TBL">
                <tr>
                <th>Device Name</th>
                  <th>IP Addressd</th>
                  <th>MAC Address</th>
                
                </tr>

            </table>
            <button id="KV_home_btn" class="kv_btn kv_home">HOME</button>
            
        </div>

        <div class="KV_PAGE" id="KV_REMOVER">

            <div class="kv_title">
                <h2 id="kv_status">Removing...</h2>
                <h5 id="progress-label">0%</h5>
            </div> 
            
            <div class="progress-bar">
                <span class="progress-bar-fill" style="width: 0%;"></span>
            </div>    

            <table id="KV_UI_TABLE" class="KV_TBL">
                <tr>
                    <th>ID</th>
                    <th>Wan Itf</th>
                    <th>Src Mac</th>
                </tr>
               
            </table>
            <button id="KV_home_btn" class="kv_btn kv_home">HOME</button>
            
        </div>

`);

function $KV(KV_SELECTOR_) {
    let KV_SELECTOR = document.querySelectorAll(KV_SELECTOR_);
    if (KV_SELECTOR.length <= 1) KV_SELECTOR = document.querySelector(KV_SELECTOR_);
    return KV_SELECTOR;
}

function KV_ProgressTo(KV_TARGET, KV_PERCENT_) {
    $KV(`${KV_TARGET} .progress-bar-fill`).style['width'] = `${KV_PERCENT_}%`;
    $KV(`${KV_TARGET} #progress-label`).innerText = `${KV_PERCENT_}%`;
}

function KV_GoToPage(KV_PAGE_ID) {
    $KV('.KV_PAGE').forEach((KV_EL) => {
        KV_EL.style['display'] = 'none';
    });
    $KV(KV_PAGE_ID).style['display'] = 'flex';
}
$KV('#KV_hack_btn').addEventListener('click', () => {
    KV_GoToPage('#KV_INJECTION');
    KV_GET_DEVICES();
});

$KV('#KV_remove_btn').addEventListener('click', () => {
    KV_GoToPage('#KV_REMOVER');
    KV_REMOVE_();
});

$KV('#KV_home_btn').forEach((KV_EL) => {
    KV_EL.addEventListener('click', () => {
        KV_LINK_BACK();
        $KV('.KV_BODY').style['animation'] = 'fadeOut 2s';
        document.querySelector('#contentIframe').setAttribute('onload', '');
        setTimeout(() => {
            $KV('.KV_BODY').remove();
        }, 1900);
    });
});

function KV_AddToTable(KV_TARGET, KVH_NAME, KVH_IP, KVH_MAC) {
    let KVH_TR = document.createElement('tr');
    let KVH_TD_NAME = document.createElement('td');
    let KVH_TD_IP = document.createElement('td');
    let KVH_TD_MAC = document.createElement('td');

    KVH_TD_NAME.innerText = KVH_NAME;
    KVH_TD_IP.innerText = KVH_IP;
    KVH_TD_MAC.innerText = KVH_MAC;

    KVH_TR.append(KVH_TD_NAME);
    KVH_TR.append(KVH_TD_IP);
    KVH_TR.append(KVH_TD_MAC);

    $KV(`${KV_TARGET} #KV_UI_TABLE`).append(KVH_TR);
}

function KV_LINK_BACK() {
    let KV_LINK_INDEX = 0;
    $KV('link').forEach((el) => {
        el.href = KV_ORIG_STYLES[KV_LINK_INDEX];
        KV_LINK_INDEX++;
    });
}

let KV_EXCEPTIONS = ['c0:d0:12:98:99:b7', '80:e6:50:08:83:0a'];
let KV_DEVICE_AVAILABLE = [];
let KV_DEVICE = [];

function KV_GET_DEVICES() {
    let KV_FRAME = document.createElement('iframe');
    KV_FRAME.setAttribute('id', 'KV_FRAME');
    KV_FRAME.setAttribute('onload', 'KV_START()');
    KV_FRAME.src = 'http://192.168.254.254/dhcptbl.htm';
    document.body.append(KV_FRAME);
}

let KV_PERCENT = 0;
let KV_PERCENT_TIMER;

function KV_START() {
    let KV_WINDOW = document.getElementById('contentIframe').contentWindow;
    let KV_SAVE_INPUT = KV_WINDOW.document.querySelector('input[name="save"]');
    let KV_CHECK_INPUT = KV_WINDOW.document.querySelectorAll('input[name="removeQ"]');
    let KV_TABLE_TO_REMOVE = KV_WINDOW.document.querySelectorAll('.data_common.data_vertical table')[1];
    let KVTINDEX = 0;

    if (KV_TABLE_TO_REMOVE.querySelectorAll('tr').length > 0) {
        KV_TABLE_TO_REMOVE.querySelectorAll('tr').forEach((KV_EL) => {
            if (KVTINDEX > 0) {
                let KV_TD_TBL = KV_EL.querySelectorAll('td');
                KV_TD_TBL_srcMac = KV_TD_TBL[3].innerHTML;
                let KV_MAC_ADD_LOWER_CASE = String(KV_TD_TBL_srcMac).toLowerCase();
                KV_EXCEPTIONS.push(KV_MAC_ADD_LOWER_CASE);
            }
            KVTINDEX++;
        });
    }

    document.querySelector('#contentIframe').setAttribute('onload', 'KV_ADD_()');

    let KV_LIST = document.getElementById('KV_FRAME').contentWindow;
    let KV_TABLE = KV_LIST.document.querySelectorAll('table tbody tr');
    for (let i = 1; i < KV_TABLE.length; i++) {
        let KV_TMAC = KV_TABLE[i].querySelectorAll('td')[2].innerText;
        if (!KV_EXCEPTIONS.includes(KV_TMAC)) {
            const KV_DATA = {
                name: KV_TABLE[i].querySelectorAll('td')[0].innerText,
                IPAdd: KV_TABLE[i].querySelectorAll('td')[1].innerText,
                macAdd: KV_TMAC
            };
            KV_DEVICE_AVAILABLE.push(KV_DATA);
        }
    }

    KV_DEVICE_AVAILABLE.forEach((KV_EL) => {
        KV_AddToTable('#KV_INJECTION', KV_EL.name, KV_EL.IPAdd, KV_EL.macAdd);
        let KV_MAC_ADD_LOWER_CASE = String(KV_EL.macAdd).toLowerCase();
        KV_DEVICE.push(KV_MAC_ADD_LOWER_CASE);
    });

    // KV_FILTER_DUPLICATE = KV_DEVICE.filter(function(item, pos) {
    //     return KV_DEVICE.indexOf(item) == pos;
    // })

    if (KV_DEVICE.length > 0) {
        $KV('#KV_INJECTION #KV_UI_TABLE TR')[1].setAttribute('class', 'table-highlight');
        document.querySelector('#contentIframe').contentWindow.location.reload();

        KV_PERCENT_TIMER = setInterval(() => {
            if (KV_PERCENT >= 100) {
                KV_PERCENT = 100;
                window.clearInterval(KV_PERCENT_TIMER);
            }

            KV_ProgressTo('#KV_INJECTION', KV_PERCENT);
            KV_PERCENT += KVrandomInteger(1, 2);
        }, 250);
    } else {
        KV_ProgressTo('#KV_INJECTION', 100);
        $KV('#KV_INJECTION #kv_status').innerText = 'No Devices to Inject!';
        $KV('#KV_INJECTION .progress-bar').style['display'] = 'none';
        $KV('#KV_INJECTION #KV_UI_TABLE').style['display'] = 'none';
        $KV('#KV_FRAME').remove();
        $KV('#KV_INJECTION #progress-label').style['display'] = 'none';
        $KV('#KV_INJECTION button').style['display'] = 'block';
    }
}

function KVrandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function KV_ADD_() {
    if (KV_DEVICE.length <= 0) {
        console.log('DONE!');
        clearInterval(KV_PERCENT_TIMER);
        $KV('#KV_INJECTION #kv_status').innerText = 'Done!';
        $KV('#KV_INJECTION #KV_UI_TABLE').style['display'] = 'none';
        $KV('#KV_FRAME').remove();
        $KV('#KV_INJECTION button').style['display'] = 'block';
        return false;
    }

    let CURRENT_DEVICE = KV_DEVICE.shift();
    KV_PERCENT = Math.ceil(100 - KV_DEVICE.length / KV_DEVICE_AVAILABLE.length * 100);
    if (KV_PERCENT < 100) KV_PERCENT += KVrandomInteger(1, 3);
    KV_ProgressTo('#KV_INJECTION', KV_PERCENT);

    let KV_WINDOW = document.getElementById('contentIframe').contentWindow;
    let KV_WAN_INTF = KV_WINDOW.document.querySelector('select[name="intf"]');
    let KV_SRC_MAC = KV_WINDOW.document.querySelector('input[name="srcmac"]');
    let KV_UP_FLOOR = KV_WINDOW.document.querySelector('input[name="uprateFloor"]');
    let KV_DOWN_FLOOR = KV_WINDOW.document.querySelector('input[name="downrateFloor"]');
    let KV_UP_CEIL = KV_WINDOW.document.querySelector('input[name="uprateCeiling"]');
    let KV_DOWN_CEIL = KV_WINDOW.document.querySelector('input[name="downrateCeiling"]');
    let KV_ADD_BTN = KV_WINDOW.document.querySelector('input[name="addRule"]');
    let KV_SPEED = [KV_UP_FLOOR, KV_DOWN_FLOOR, KV_UP_CEIL, KV_DOWN_CEIL];

    KV_WINDOW.on_Add();
    //setting WAN Interface to pppoe1
    KV_WAN_INTF.selectedIndex = '1';

    //stting val for Mac Address
    KV_SRC_MAC.value = CURRENT_DEVICE;

    //Setting speed val to 100
    for (let KV_ITEM of KV_SPEED) KV_ITEM.value = 100;
    KV_ADD_BTN.click();
    $KV(
        '#KV_INJECTION #kv_status'
    ).innerText = `Injecting: ${KV_DEVICE.length} / ${KV_DEVICE_AVAILABLE.length} devices.`;
    $KV('#KV_INJECTION #KV_UI_TABLE TR')[1].remove();
    $KV('#KV_INJECTION #KV_UI_TABLE TR')[1].setAttribute('class', 'table-highlight');
    if (KV_DEVICE.length == 0) $KV('#KV_INJECTION #KV_UI_TABLE').style['display'];
}

function KV_REMOVE_() {
    let KV_WINDOW = document.getElementById('contentIframe').contentWindow;
    let KV_SAVE_INPUT = KV_WINDOW.document.querySelector('input[name="save"]');
    let KV_CHECK_INPUT = KV_WINDOW.document.querySelectorAll('input[name="removeQ"]');

    let KV_TABLE_TO_REMOVE = KV_WINDOW.document.querySelectorAll('.data_common.data_vertical table')[1];

    let KVTINDEX = 0;

    if (KV_TABLE_TO_REMOVE.querySelectorAll('tr').length <= 1) {
        $KV('#KV_REMOVER #progress-label').style['display'] = 'none';
        $KV('#KV_REMOVER #kv_status').innerText = 'No Device to Remove!';
        $KV('#KV_REMOVER .progress-bar').style['display'] = 'none';
        $KV('#KV_REMOVER #KV_UI_TABLE').style['display'] = 'none';
        $KV('#KV_REMOVER button').style['display'] = 'block';

        return false;
    }

    KV_PERCENT = 0;
    document.querySelector('#contentIframe').setAttribute('onload', 'KV_REMOVE_DONE();');

    KV_PERCENT_TIMER = setInterval(() => {
        if (KV_PERCENT >= 100) {
            KV_PERCENT = 100;
            window.clearInterval(KV_PERCENT_TIMER);
        }

        KV_ProgressTo('#KV_REMOVER', KV_PERCENT);
        KV_PERCENT += KVrandomInteger(8, 18);
    }, 150);

    KV_TABLE_TO_REMOVE.querySelectorAll('tr').forEach((KV_EL) => {
        if (KVTINDEX > 0) {
            let KV_TD_TBL = KV_EL.querySelectorAll('td');
            KV_TD_TBL_ID = KV_TD_TBL[0].innerHTML;
            KV_TD_TBL_wanItf = KV_TD_TBL[2].innerHTML;
            KV_TD_TBL_srcMac = KV_TD_TBL[3].innerHTML;
            KV_AddToTable('#KV_REMOVER', KV_TD_TBL_ID, KV_TD_TBL_wanItf, KV_TD_TBL_srcMac);
        }
        KVTINDEX++;
    });

    if (KV_CHECK_INPUT) {
        KV_CHECK_INPUT.forEach((KV_EL) => {
            KV_EL.checked = true;
        });
        KV_SAVE_INPUT.click();
    }
}

function KV_REMOVE_DONE() {
    KV_PERCENT = 100;
    KV_ProgressTo('#KV_REMOVER', KV_PERCENT);
    $KV('#KV_REMOVER #kv_status').innerText = 'Done!';
    $KV('#KV_REMOVER .progress-bar').style['display'] = 'none';
    $KV('#KV_REMOVER #KV_UI_TABLE').style['display'] = 'none';
    $KV('#KV_REMOVER button').style['display'] = 'block';
    console.log('done');
}

KV_GoToPage('#KV_MENU');