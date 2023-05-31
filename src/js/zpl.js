// NAV
const nav = document.getElementsByTagName('nav')[0];
const navItems = nav.getElementsByClassName('navItem');

const link = (ref)=>{
    window.location.href = `${ref}.html`;
}

for (const item of navItems) {
    item.addEventListener('click',()=>{link(item.id)})
}

const inputContainer = document.getElementById('inputContainer');
const outputContainer = document.getElementById('outputContainer');

const inputContainerOptions = inputContainer.getElementsByClassName('containerOptions')[0];
const outputContainerOptions = outputContainer.getElementsByClassName('containerOptions')[0];

const inputContainerOptionsSelect = inputContainerOptions.getElementsByTagName('select')[0];

const inputContainerBox = inputContainer.getElementsByClassName('containerBox')[0];
const inputContainerBoxTextarea = inputContainerBox.getElementsByTagName('textarea')[0];

const outputContainerBox = outputContainer.getElementsByClassName('containerBox')[0];
const outputContainerBoxTextarea = outputContainerBox.getElementsByTagName('textarea')[0];

// Input Functions
const format = {full:"^XA^MD10^PR4^MTD^LH0,0^PW720^LL240",flex:"flex Format..."};

const formatedZpl = (zpl)=>{
    const formatedZpl = zpl.split('^XA').map((row,index)=>{
        return index>0?format[inputContainerOptionsSelect.value]+row:""            
    })
    
    return formatedZpl.join("");
}

function printToOutput(zpl){
    outputContainerBoxTextarea.value = zpl;
}

inputContainerBoxTextarea.addEventListener('keyup',()=>{
    printToOutput(formatedZpl(inputContainerBoxTextarea.value))
})
inputContainerOptionsSelect.addEventListener('change',()=>{
    printToOutput(formatedZpl(inputContainerBoxTextarea.value))
})

// Output Functions

const clipboard = document.getElementById('clipboard');

clipboard.addEventListener('click',()=>{
    navigator.clipboard.writeText(
        outputContainerBoxTextarea.value
    )

    // Alert the copied text
    alert("Nuevo Zpl Copiado!");
})
