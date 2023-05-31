// NAV
const nav = document.getElementsByTagName('nav')[0];
const navItems = nav.getElementsByClassName('navItem');

const link = (ref)=>{
    window.location.href = `${ref}.html`;
}

for (const item of navItems) {
    item.addEventListener('click',()=>{link(item.id)})
}

// 

const hostInput = document.getElementById('host');
const printerSelect = document.getElementById('printer');

const getPrinters = (host)=>{
    const res = fetch(`${host}/printer`).then(res=>res.json()).then(data=>data);
    return res;
}

const populatePrinterSelect = (printers)=>{
    printers.map(printer=>{
        const option = document.createElement('option');
        option.value = printer;
        option.innerText = printer;

        if(localStorage.getItem('printer') == printer){
            option.selected = true;
        }

        printerSelect.append(option);
    })
}

hostInput.addEventListener('change',async ()=>{
    localStorage.setItem('host',hostInput.value);
    const host = localStorage.getItem('host');
    const {printers} = await getPrinters(host);
    populatePrinterSelect(printers);

})

if(localStorage.getItem('host')){
    const host = localStorage.getItem('host');
    hostInput.value = host;
    getPrinters(host).then(({printers})=>{
        populatePrinterSelect(printers)
    })
}

printerSelect.addEventListener('change',()=>{
    localStorage.setItem('printer',printerSelect.value);
})
