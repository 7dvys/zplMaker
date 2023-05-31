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

// Tool 
const inputContainer = document.getElementById('inputContainer');
const outputContainer = document.getElementById('outputContainer');

// const inputContainerOptions = inputContainer.getElementsByClassName('containerOptions')[0];
// const outputContainerOptions = outputContainer.getElementsByClassName('containerOptions')[0];

const inputContainerBox = inputContainer.getElementsByClassName('containerBox')[0];

const outputContainerBox = outputContainer.getElementsByClassName('containerBox')[0];
const outputContainerBoxTextarea = outputContainerBox.getElementsByTagName('textarea')[0];

// Output Clipboard Function
// const clipboard = document.getElementById('clipboard');

// clipboard.addEventListener('click',()=>{
//     navigator.clipboard.writeText(
//         outputContainerBoxTextarea.value
//     )
//     alert("Nuevo Zpl Copiado!");
// })

const print = document.getElementById('print');

print.addEventListener('click',()=>{
    if(outputContainerBoxTextarea.value != ''){
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
        })
    }
})

// Input add Function
const adder = document.getElementById('adder');

adder.addEventListener('click',()=>{
    labelController.add();
})

class Label{
    id;
    label;
    inputCodigo;
    inputCantidad;
    inputTitulo;
    remover;

    constructor(id){
        const {label,inputCodigo,inputTitulo,inputCantidad,remover} = this.create()
        this.id = id;
        this.label = label;
        this.inputCodigo = inputCodigo;
        this.inputTitulo = inputTitulo;
        this.inputCantidad = inputCantidad;
        this.remover = remover;
    }

    create(){
        const label = document.createElement('div');
        label.classList.add('label');

        const inputCodigo = document.createElement('input');
        inputCodigo.classList.add('input','input-codigo');
        inputCodigo.placeholder = "codigo";

        const inputTitulo = document.createElement('input');
        inputTitulo.classList.add('input','input-titulo');
        inputTitulo.placeholder = "titulo";

        const inputCantidad = document.createElement('input');
        inputCantidad.classList.add('input','input-cantidad');
        inputCantidad.type = 'number';
        inputCantidad.min = 1;
        inputCantidad.value = 1;
        inputCantidad.title = "cantidad"

        const remover = document.createElement('div');
        remover.innerText = "-";
        remover.classList.add('remover');

        label.append(inputCodigo,inputTitulo,inputCantidad,remover);

        return {label,inputCodigo,inputTitulo,inputCantidad,remover};
    }

    insert(destination){
        destination.append(this.label);
    }

    get codigo(){
        return this.inputCodigo.value;
    }

    get titulo(){
        return this.inputTitulo.value;
    }

    get cantidad(){
        return this.inputCantidad.value;
    }
}

class LabelController{
    idCounter;
    labelList;
    inputContainerBox;
    outputContainerBoxTextarea;

    constructor(inputContainerBox,outputContainerBoxTextarea){
        this.idCounter = 0;
        this.labelList = [];
        this.inputContainerBox = inputContainerBox;
        this.outputContainerBoxTextarea = outputContainerBoxTextarea;
        this.setInputFunction()
    }

    add(){
        const label = new Label(this.idCounter);
        this.setRemoverFunction(label);
        label.insert(this.inputContainerBox);
        this.labelList.push(label)
        this.idCounter++;
    }

    setRemoverFunction(label){
        label.remover.addEventListener('click',()=>{
            label.label.remove();
            this.labelList = this.labelList.filter(({id})=>(id!=label.id))
            this.createZpl();
        })
    }

    setInputFunction(){
        this.inputContainerBox.addEventListener('keyup',()=>{this.createZpl()})
        this.inputContainerBox.addEventListener('change',()=>{this.createZpl()})
    }

    createZpl(){
        // Plantilla ZPL (adaptar a impresora o configurar correctamente la impresora <3)
        const formatLabelList = this.labelList.reduce((acc,{cantidad,titulo,codigo})=>{
            if(cantidad && titulo && codigo){
                acc.push(...Array(parseInt(cantidad)).fill([codigo,titulo]))
            }
            return acc;
        },[])  
        
        let n = 0;
        let zplCode = "";
        for(const [codigo,titulo] of formatLabelList){
            if(!n){
                zplCode+="^XA^MU203^MD10^MTD^LH0,0^PW799^LL240"
                +`^FO10,40^A0N,20,20^FD${titulo}^FS`
                +`^FO10,70^BY2^BCN,120,Y,N,N^FD${codigo}^FS`
                n++;
            }else{
                zplCode+=`^FO440,40^A0N,20,20^FD${titulo}^FS`
                +`^FO440,70^BY2^BCN,120,Y,N,N^FD${codigo}^FS`
                +"^XZ"
                n--;
            }
        }
        if(n){
            zplCode +="^XZ"
        }

        this.sendToOutput(zplCode);
    }

    sendToOutput(string){
        this.outputContainerBoxTextarea.value = string;
    }

}

const labelController = new LabelController(inputContainerBox,outputContainerBoxTextarea);
labelController.add()

// Clear output box
outputContainerBoxTextarea.value = '';


