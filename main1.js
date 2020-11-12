let body = document.querySelector('body');
let data = JSON.parse(localStorage.getItem('filteredData'));


const ajax = (url, callback, method = "GET") => {
    if (!url) return console.error("Request Required");
	if (!callback) return console.error("Callback Required");
	const request = new XMLHttpRequest();
	request.addEventListener("readystatechange", (evt) => {
        let req = evt.target;
		if (req.readyState !== 4) return;
		if (req.status === 200) return callback(req.response);
		callback("");
	});
	request.open(method, url);
	request.send();
};


ajax('https://sdg-octodex.herokuapp.com/', (results) => {
    let body = document.querySelector('body');
    let data = JSON.parse(results).data;
    let filterArray = ["Topguntocat", "Luchadortocat", "Grinchtocat", "Maxtocat", "Dunetocat", "Dr.Octocat", "Spidertocat", "Stormtroopocat", "Homercat", "Minion", "Heisencat", "Doctocat Brown", "Octotron", "Riddlocat", "X-tocat", "Okal-Eltocat", "IronCat", "Jean-Luc Picat", "Spocktocat", "Trekkie", "Octobi Wan Catnobi"];
    let filteredData = data.filter((item) => filterArray.includes(item.name));
    localStorage.setItem('filteredData', JSON.stringify(filteredData));
})


function selectImage(myName, data){
    // let data = JSON.parse(localStorage.getItem('filteredData'));
    let selectedImage = data.filter((item)=>item.name==myName);
    return selectedImage[0].image;
}

function selectName(myName, data){
    let selectedName = data.filter((item)=>item.name==myName);
    return selectedName[0].name;
}

function selectNumber(myName, data){
    let selectedNumber = data.filter((item)=>item.name==myName);
    return selectedNumber[0].number;
}

function makeACard(name) {
    let data = JSON.parse(localStorage.getItem('filteredData'));
    let card = document.createElement('div');
    card.classList.add('card');
    let remove = document.createElement('div');
    remove.classList.add('remove');
    remove.classList.add('hidden');
    remove.innerText = 'X';
    let img = document.createElement('img');
    img.src = `${selectImage(name, data)}`;
    let p = document.createElement('p');
    p.innerText = `${selectName(name, data)}`;
    card.append(remove,img, p);
    body.append(card)
}

function makeMultipleCards(number, data = JSON.parse(localStorage.getItem('filteredData'))){
    for(i=0;i<number;i++){
        let name = data[i].name;
        makeACard(name)
    }
}

makeMultipleCards(10);

let remove = document.querySelectorAll('.remove');
let card = document.querySelectorAll('.card');

card.forEach((card) => {
    card.addEventListener('click', (e)=> {
    })
})

card.forEach((card) => {
    card.addEventListener('mouseenter', (e)=>{
        e.target.firstChild.classList.remove('hidden');
    })
})

card.forEach((card) => {
    card.addEventListener('mouseleave', (e)=>{
        e.target.firstChild.classList.add('hidden');
    })
})

//Add event listener for each X in upper right hand corner of card. When X is clicked, card is removed from screen.
remove.forEach((item) => {
    item.addEventListener('click', (e) => {
        console.log(e.target)
        body.removeChild(e.target.parentNode);
})})





