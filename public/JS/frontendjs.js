function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - .05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50)
    }, 4000);
}

function addFlashfromFrontEnd(message) {
    let flasMessageDiv = document.createElement('div');
    let innnerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innnerFlashDiv.appendChild(innerTextNode);
    flasMessageDiv.appendChild(innnerFlashDiv);
    flasMessageDiv.setAttribute('id', 'flash-message');
    innnerFlashDiv.setAttribute('class', 'alert alert-info');
    document.getElementsByTagName('body')[0].appendChild(flasMessageDiv);
    setFlashMessageFadeOut(flasMessageDiv);
}

function createCard(postData) {
    return `<div id="post-${postData.id}" class="card ">

    <div class="w-100 justify-content-center d-flex" id="post-bg"
        style="background:url(${postData.thumbnail}) center; background-size:cover;">
        <div class="img-width">

        </div>
    </div>

    <div class="card-body ">
        <h5 class="card-title">${postData.title}</h5>
        <div class="text-overflow">
            <small class="card-text text-muted ">${postData.description}</small>

        </div>
    </div>
    <div class="card-footer bg-dark">
        <div class="d-flex">
        </div>

        <a href="/post/${postData.id}" class="anchor-buttons">Post Details</a>
        <small class="text-primary text-end">Comments </small>
    </div>
</div>
`
}

function executeSearch() {
    let searchTerm = document.getElementById('search-text').value;
    if (!searchTerm) {
        location.replace('/');
        addFlashfromFrontEnd('empty search term, here are the 8 most recent post')
        return;
    }

    let mainContent = document.getElementById('main-content');
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newMainContentHTML = '';
            data_json.results.forEach((row) => {
                newMainContentHTML += createCard(row);
            });
            mainContent.innerHTML = newMainContentHTML;
            if (data_json.message) {
                addFlashfromFrontEnd(data_json.message);
            }
        })
        .catch((err) => console.log(err));
}


let flashElement = document.getElementById('flash-message');
if (flashElement) {
    setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.onclick = executeSearch;
}