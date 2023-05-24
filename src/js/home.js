const entrances = document.getElementsByClassName('entrance');

const link = (ref)=>{
    window.location.href = `${ref}.html`;
}

for (const entrance of entrances) {
    entrance.addEventListener('click',()=>{link(entrance.id)});
}



