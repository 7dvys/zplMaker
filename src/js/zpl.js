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

const inputContainerBox = inputContainer.getElementsByClassName('containerBox')[0];
const inputContainerBoxTextarea = inputContainerBox.getElementsByTagName('textarea')[0];

const outputContainerBox = outputContainer.getElementsByClassName('containerBox')[0];
const outputContainerBoxTextarea = outputContainerBox.getElementsByTagName('textarea')[0];

const formatedZpl = (zpl)=>{
    const formatedZpl = zpl.split('^XA').map((row,index)=>{
        return index>0?"^XA\n^MD10\n^PR4\n^MTD\n^LH0,0\n^PW720\n^LL240\n"+row:""            
    })
    
    return formatedZpl.join("");
}

inputContainerBoxTextarea.addEventListener('keyup',()=>{
    console.log('algo')
    outputContainerBoxTextarea.value = formatedZpl(inputContainerBoxTextarea.value)
})

    



