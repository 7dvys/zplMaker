// configs
const host = 'http://localhost:3000';
const printer = 'ws408';

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

// const clipboard = document.getElementById('clipboard');

// clipboard.addEventListener('click',()=>{
//     navigator.clipboard.writeText(
//         outputContainerBoxTextarea.value
//     )

//     // Alert the copied text
//     alert("Nuevo Zpl Copiado!");
// })

const print = document.getElementById('print');

print.addEventListener('click',()=>{
    if(outputContainerBoxTextarea.value != ''){
        alert("Imprimiendo");
        const data = {zpl:outputContainerBoxTextarea.value,printer:printer}
        console.log(JSON.stringify(data))
        const config = {
            method:"POST",
            body:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
        }
        fetch(`${host}/printer`,config).then(()=>{
            outputContainerBoxTextarea.value = '';
            alert("Impresion finalizada");
        })
    }
})