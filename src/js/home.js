// NAV
const nav = document.getElementsByTagName('nav')[0];
const navItems = nav.getElementsByClassName('navItem');

for (const item of navItems) {
    item.addEventListener('click',()=>{link(item.id)})
}

// ENTRANCES
const entrances = document.getElementsByClassName('entrance');

const link = (ref)=>{
    window.location.href = `${ref}.html`;
}

for (const entrance of entrances) {
    entrance.addEventListener('click',()=>{link(entrance.id)});
}



