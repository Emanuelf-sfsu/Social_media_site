var url = 'https://jsonplaceholder.typicode.com/albums/2/photos';
var counter;
fetch(url)
.then((response) =>{
    return response.json()
})
.then((json_data) =>{
    formatData(json_data)
    console.log(json_data)
    document.getElementById('items-count').innerHTML =`There are ${json_data.length} photo(s) being shown`
})


function formatData(data){
    counter = data.length;

    var container = document.getElementById("container");
    for(var i = 0; i < data.length; i++){
        var div = document.createElement("div");
        var src = imgs(data[i].url ,data[i].title )
        div.innerHTML = src ;
        container.appendChild(div)
    }
}

var divNums=0;
function imgs(src ,title){
    divNums++;
    return `
    <div id ="img${divNums}"class="square" onclick="remove(this.id)">
    <a href="#"></a>
    <img src="${src}" width="200px" height="200px"> 
    <h5>${title}</h5>

    </div> `;

}

function remove(imgsec){
    var obj = document.getElementById(imgsec);
    document.getElementById(imgsec).classList.add("fade-out")
    obj.remove();
    counter--;
    document.getElementById('items-count').innerHTML =`There are ${counter} photo(s) being shown`

}