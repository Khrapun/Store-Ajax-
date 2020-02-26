let storeList = document.getElementById('stores-list');
let containerStoreDetails = document.getElementById('container-store-details');
let syncButton = document.getElementById('sync');
let searchButton = document.getElementById('search');
let deleteButton = document.getElementById('backspace');
let modalWindowShow = document.getElementById('window-modal');
let modalProduct = document.getElementById('modalProduct');
let createStore = document.getElementById('create-store');
let cancelForm = document.getElementById('cancel-store-form');
let createNewStore = document.getElementById('create-new-store');
let createNewProduct = document.getElementById('createProduct');
let deleteStoreModal = document.getElementById('delete-store-modal');
let cancelDetailModal = document.getElementById('cancel-detail-form');
let deleteStoreDetailModal  = document.getElementById('delete-store-detail-modal');
let cancelDetailForm = document.getElementById('cancel-store-detail-form');
let loader = document.getElementById('loader');

let okListener;
let storageListener;
let stockListener;
let allListener;
let storeId;
let url;
let store;
let product;
let floor;
let productValue;
let sortRoute;
let currentItem;
let sortCriterion;

let nameFilter;
let priceFilter;
let specsFilter;
let supplierFilter;
let countryFilter;
let companyFilter;

let indexItem;
let amountAll = 0;
let amountOk = 0;
let amountStock = 0;
let amountStorage = 0;
let inputStores = document.getElementById('input-stores');

const storesKeysSearch = ['Name', 'FloorArea', 'Address'];
let raitingProduct = [];
let date = '';
let numberItems = 0;
let storesListEnd = '';
let floorAreaLi = '';
let html = '';

let outputStoresItemTemplate = '<li class="list-item list-item_left">'+
                            '<div class="list-item__name">'+
                                '<p class="item-name">{{Name}}</p>'+
                                '<p class="location">{{Address}}</p>'+
                            '</div>'+
                            '<p class="list-item__score">{{FloorArea}}</p>'+
                        '</li>';
let storeDetailsTemplate = '<div class="list-scroll list-scroll_right">'+
                                '<div class="store-details store-details_header">'+
                                    '<h1 class="store-details__title header-topic">Store details</h1>'+
                                    '<div class="store-details__information">'+
                                        '<div class="store-left-column">'+
                                            '<p class="store-details__information__item"><span class="bold">Email:</span><a href="{{Email}}">{{Email}}</a></p>'+
                                            '<p class="store-details__information__item"><span class="bold">Phone Number:</span><a href="tel:{{PhoneNumber}}">{{PhoneNumber}}</ a></p>'+
                                            '<p class="store-details__information__item"><span class="bold">Address:</span><a href="{{Address}}">{{Address}}</a></p>'+
                                        '</div>'+
                                        '<div class="store-rigth-column">'+
                                            '<p class="store-details__information__item" id="date">{{Established}}</p>'+
                                            '<p class="store-details__information__item"><span class="bold">Floor Area:</span>{{FloorArea}}</p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="store-details__filter">'+
                                        '<p class="value" id="filter-value">0</p>'+
                                        '<div class="filter" id="filter-ok">'+
                                            '<i class="far fa-check-square"></i>'+
                                            '<p class="store-details__information__item">ok</p>'+
                                            '<p class="store-details__information__value">0</p>'+
                                        '</div>'+
                                        '<div class="filter" id="filter-storage">'+
                                            '<i class="fas fa-exclamation-triangle"></i>'+
                                            '<p class="store-details__information__item">storage</p>'+
                                            '<p class="store-details__information__value">0</p>'+
                                        '</div>'+
                                        '<div class="filter" id="filter-stock">'+
                                            '<i class="fas fa-exclamation-circle"></i>'+
                                            '<p class="store-details__information__item">out of stock</p>'+
                                            '<p class="store-details__information__value">0</p>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<table class="table" id="table">'+
                                    '<caption class="table-header">'+
                                        'Products'+
                                        '<form class="form">'+
                                            '<input class="input input-duration" placeholder="search" id="inputs">'+
                                            '<a class="button" id="searchInTableButton"><i class="fas fa-search"></i></a>'+
                                        '</form>'+
                                    '</caption>'+
                                    '<tr class="tr-topic">'+
                                        '<th class="topic-name"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Name</th>'+
                                        '<th class="topic-price"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Price</th>'+
                                        '<th class="topic-specs column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Specs</th>'+
                                        '<th class="topic-info column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Suppllerinfo</th>'+
                                        '<th class="topic-country column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>CCountry of origin</th>'+
                                        '<th class="topic-company column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Prod.company</th>'+
                                        '<th class="topic-raiting column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Raiting</th>'+
                                        '<th class="column-topic"> </th>'+
                                        '<th class="column-topic"> </th>'+
                                    '</tr>';
let tableFooter =    '</table>'+
                    '<div class="list-scroll__footer footer-right">'+
                        '<a class="button-create button" id = "create-product">+ Create</a>'+
                        '<a class="button-delete button" id = "delete-store"><i class="far fa-trash-alt"></i> Delete</a>'+
                    '</div>'+
                    '</div>';

let searchHead =   '<caption class="table-header">'+
                    'Products'+
                    '<form class="form">'+
                    '<input class="input input-duration" placeholder="search" id="inputs">'+
                    '<a class="button" id="searchInTableButton"><i class="fas fa-search"></i></a>'+
                    '</form>'+
                    '</caption>'+
                    '<tr class="tr-topic">'+
                        '<th class="topic-name"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Name</th>'+
                        '<th class="topic-price"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Price</th>'+
                        '<th class="topic-specs column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Specs</th>'+
                        '<th class="topic-info column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Suppllerinfo</th>'+
                        '<th class="topic-country column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>CCountry of origin</th>'+
                        '<th class="topic-company column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Prod.company</th>'+
                        '<th class="topic-raiting column-topic"><a href="#" class="sort"><i class="fas sort-product fa-sort"></i></a>Raiting</th>'+
                        '<th class="column-topic"> </th>'+
                        '<th class="column-topic"> </th>'+
                    '</tr>';
let storesTableItems = '<tr class="tr-item">'+
                            '<td class="cell cell_name">'+
                            '<span class="bold">{{Name}}</span>'+
                            '</td>'+
                            '<td class="cell cell_price">'+
                                '{{Price}}'+
                            'USD</td>'+
                            '<td class="cell cell_specs">'+
                                '{{Specs}}'+
                            '</td>'+
                            '<td class="cell cell_info">'+
                                '{{SupplierInfo}}'+
                            '</td>'+
                            '<td class="cell cell_country">'+
                                '{{MadeIn}}'+
                            '</td>'+
                            '<td class="scell cell_company">'+
                            '{{ProductionCompanyName}}'+
                            '</td>'+
                            '<td class="cell cell_raiting">'+
                                '<ul class="rate">'+
                                    '<li class="star"></li>'+
                                    '<li class="star"></li>'+
                                    '<li class="star"></li>'+
                                    '<li class="star"></li>'+
                                    '<li class="star"></li>'+
                                '</ul>'+
                            '</td>'+
                            '<td class="cell">'+
                                '>'+
                            '</td>'+
                            '<td class="cell">'+
                                '<i class="far fa-times-circle delete-products-item"></i>'+
                            '</td>'+
                        '</tr>';
let starTemplate = '<li class="star"></li>'+
                    '<li class="star"></li>'+
                    '<li class="star"></li>'+
                    '<li class="star"></li>';

let storeNoSelectded =     '<div class="selected-header">'+
                                '<h1 class="header-topic">Store is not selected</h1>'+
                            '</div>'+
                            '<div class="selected-main">'+
                                '<i class="fas fa-store-alt"></i>'+
                                '<p class="selected-main__discriotion-title">'+
                                    '<span class="bold">The store is not selected</span><br>'+
                                '</p>'+
                                '<p class="selected-main__discriotion">please select the store to proceed</p>'+
                            '</div>';

inputStores.oninput = function() {
    if(inputStores.value !== '') {
        deleteButton.style.display = 'block';
        searchButton.style.paddingLeft = '0.9vw';
    }
    else {
        deleteButton.style.display = 'none'; 
        searchButton.style.paddingLeft = '1.35vw';
    }

};

inputStores.onfocus = function() {
    syncButton.style.display = 'none';
    if (inputStores.value === '') {
        searchButton.style.paddingLeft = '1.35vw';
    }
    else {
        searchButton.style.paddingLeft = '0.9vw';
    }
};

inputStores.onblur = function() {
    if (inputStores.value === '') {
        syncButton.style.display = 'block';
        searchButton.style.paddingLeft = '0vw';
        deleteButton.style.display = 'none'; 
    }
    else {
        searchButton.style.paddingLeft = '0.9vw';
    }
};

function hangEvent() { 
    deleteButton.style.display = 'none';
    document.querySelectorAll('.list-item').forEach(item => {
        item.addEventListener('click', event => {
            window.location = '#storedetails';
            currentItem = item;
            getProductDetails()
        });
    });
};

function insertFiltres(filter) {
    filter.forEach((item, index, array) => {
        html += Mustache.to_html(storesTableItems, item);
    });
document.getElementById('table').innerHTML = html;
html='';
}

function showLoadingIndicator(flag) {
    if(flag) {
        loader.style.display = 'block';
    }
    else {
        loader.style.display = 'none';
    }
};

function updateListStores() {
    showLoadingIndicator(true)
    storesListEnd = '';
    fetch("http://localhost:3000/api/Stores")
    .then(response => {
        return response.json();
    }).then(res => {
        res.forEach((item, index, array) => {
        let html = Mustache.to_html(outputStoresItemTemplate, item);
        storesListEnd += html;
        showLoadingIndicator(false);

    });
    storeList.innerHTML = storesListEnd;
    hangEvent();
});
};

function selectSortField(indexCtiterion) {
    switch (indexCtiterion+'') {
        case '0':
            sortCriterion = 'Name';
            break;
        case '1':
            sortCriterion = 'Price';
            break;
        case '2':
            sortCriterion = 'Specs';
            break;
        case '3':
            sortCriterion = 'SuppllerInfo';
            break;
        case '4':
            sortCriterion = 'MadeIn';
            break;
        case '5':
            sortCriterion = 'ProductionCompanyName';
            break;
        case '6':
            sortCriterion = 'Rating';
            break;
        default: break;
    }
};

function getProductSort() {
    fetch("http://localhost:3000/api/Products?filter=%7B%22where%22%3A%7B%22StoreId%22%3A%22"
    + storeId + "%22%7D%7D")
    .then(response  => {
        return response.json();
    })
    .then(response => {
        sortProduct(response, sortCriterion);
        setSortDirection(response);
        setStar(raitingProduct);
    })
};

function deleteProductNoSort() {
    table.querySelectorAll('.tr-item').forEach(item => {
        item.remove();
    });
};

function setSortDirection(arrayProductSorted) {
    raitingProduct = [];
    let table = document.getElementById('table');
    if(sortRoute === 'up') {
        arrayProductSorted.forEach((item, index, array) => {
            raitingProduct.push(item.Rating)
            html += Mustache.to_html(storesTableItems, item);
        });
    }
    else {
        arrayProductSorted.reverse().forEach((item, index, array) => {
            raitingProduct.push(item.Rating)
            html += Mustache.to_html(storesTableItems, item);
        });
    }
    deleteProductNoSort();
    table.innerHTML = table.innerHTML + html;
    html = '';
    sortListener();
};

function sortProduct(array, criterion) {
    array.sort((a,b) => (a[criterion] > b[criterion]) ? 1 : ((b[criterion] > a[criterion]) ? -1 : 0))
};

function fetctStoresSubstring() {
    showLoadingIndicator(true);
    fetch("http://localhost:3000/api/Stores")
    .then(response => {
        return response.json();
    }).then(res => {
        searchSubstringStores (res, inputStores.value);
        showLoadingIndicator(false);
});
};

function searchSubstringStores (arrayStores, substring) {
    arrayStores.forEach((item, index, array) => {
        let isPushedFlag = false
        Object.keys(item).forEach((key) => {
            if(checkCorrectInput(item, key)) {  
                isPushedFlag = true
            };
        });
        if (isPushedFlag) {
            html += Mustache.to_html(outputStoresItemTemplate, item);
        };
    });
    storeList.innerHTML = html;
    html = '';
};

function searchStores() {
    fetctStoresSubstring();
    hangEvent();
};

function setStar(raiting) {
    document.querySelectorAll('.rate').forEach((item, index, array) => {
        item.childNodes.forEach((item, index, array) => {
            if(index < raiting[numberItems]){
                item.style.color = '#dfa10e';
            }    
        });
        numberItems++;
        raitingAll = [];
    });
    numberItems = 0;
};

function getProduct(product) {
    html += Mustache.to_html(storeDetailsTemplate, product[0]);
};

function checkCorrectInput(item, key) {
    return ((item[key]+'').toLowerCase()).indexOf((substring+'').toLowerCase()) === 0 && storesKeysSearch.indexOf(key+'') > -1;
};

function dateConvert() {
    let dateEstablished = new Date(document.getElementById('date').innerHTML);
    document.getElementById('date').innerText = dateEstablished.toLocaleString('en-US', options)+'';
};


function getProductDetails() {
    showLoadingIndicator(true);
    floor = event.currentTarget.querySelectorAll('.list-item__score')[0].innerText-0;
    fetch("http://localhost:3000/api/Stores?filter=%7B%22where%22%3A%7B%22FloorArea%22%3A%22" + floor + "%22%7D%7D")
    .then(response => {
        return response.json();
    }).then(response => {
        getProduct(response);
        storeId = response[0].id
        return response[0].id
    }).then(response => {
        return fetch("http://localhost:3000/api/Products?filter=%7B%22where%22%3A%7B%22StoreId%22%3A%22" + response + "%22%7D%7D")
    }).then(response => {
        return response.json()
    }).then(response => {
        amountAll = response.length;
        response.forEach((item, index, array) => {
            getFiltresValue(item);
            raitingProduct.push(item.Rating)
            html += Mustache.to_html(storesTableItems, item);
        });
        return html;
    }).then(response => {
        containerStoreDetails.innerHTML = response+tableFooter;
        setStar(raitingProduct);
        getFilters();
        setFiltres();
        setFilterListener();
        createNewProductListener();
        deleteStoreButton();
        dateConvert();
        html = '';
        document.querySelectorAll('.tr-item').forEach((item, index, array)=> {
            item.childNodes[8].addEventListener('click', function() {
                setProductFiltres(item)
                item.remove();
                fetchProductDelete();
            })
        })
        sortListener();
        showLoadingIndicator(false);
    })
};

function getSortRoute(i) {
    switch (i.classList[2]+'') {
        case 'fa-sort':
            i.classList.remove("fa-sort");
            i.classList.add("fa-sort-amount-up-alt");
            sortRoute = 'up';
            break;
        case 'fa-sort-amount-up-alt':
            i.classList.remove("fa-sort-amount-up-alt");
            i.classList.add("fa-sort-amount-down");
            sortRoute = 'down';
            break;
        case 'fa-sort-amount-down':
            i.classList.remove("fa-sort-amount-down");
            i.classList.add("fa-sort-amount-up-alt");
            sortRoute = 'up';
            break;
        default: break;
    }
};

function sortListener() {
    document.querySelectorAll('.sort-product').forEach((item, index, array) => {
        item.addEventListener('click', function(e) {
            selectSortField(index);
            getProductSort();
            getSortRoute(item);
        })
    });
};

function fetchProductDelete() {
    showLoadingIndicator(true);
    fetch("http://localhost:3000/api/Products?filter=%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22Name%22%3A%20%22" + nameFilter
            + "%22%7D%2C%7B%22Price%22%3A%20" + priceFilter
            + "%7D%2C%7B%22Specs%22%3A%20%22" + specsFilter 
            + "%22%7D%2C%7B%22SupplierInfo%22%3A%20%22" + supplierFilter 
            + "%22%7D%2C%7B%22MadeIn%22%3A%20%22" + countryFilter 
            + "%22%7D%2C%7B%22ProductionCompanyName%22%3A%20%22" + companyFilter 
            + "%22%7D%5D%7D%7D")
    .then(response=> {
        return response.json();
    })
    .then(response => {
        fetchDelete('http://localhost:3000/api/Products/', response[0].id);
        showLoadingIndicator(false);
    })
};

function setProductFiltres(product) {
    nameFilter = product.childNodes[0].innerText;
    priceFilter = product.childNodes[1].innerText.replace(/\D+/g,"")-0;
    specsFilter = product.childNodes[2].innerText;
    supplierFilter = product.childNodes[3].innerText;
    countryFilter = product.childNodes[4].innerText;
    companyFilter = product.childNodes[5].innerText; 
};

function getFiltresValue(product) {
    switch (product.Status) {
        case 'STORAGE':
            amountStorage += 1;
            break;
        case 'OUT_OF_STOCK':
            amountStock +=1;
            break;
        case 'OK':
            amountOk += 1;
            break;
        default: break;
    }
};

function resetFilter() {
    amountOk = 0;
    amountStock = 0;
    amountStorage = 0;
};

function setFiltres() {
    allListener.innerText = amountAll;
    okListener.querySelectorAll('p')[1].innerText = amountOk;
    storageListener.querySelectorAll('p')[1].innerText = amountStorage;
    stockListener.querySelectorAll('p')[1].innerText = amountStock;
    resetFilter()
};

function getFilters() {
    allListener = document.getElementById('filter-value');
    okListener = document.getElementById('filter-ok');
    storageListener = document.getElementById('filter-storage');
    stockListener = document.getElementById('filter-stock');
};

function setFilterListener() {
    allListener.addEventListener('click', searchAll);
    okListener.addEventListener('click', searchOK);
    storageListener.addEventListener('click', searchStorage);
    stockListener.addEventListener('click', searchOutOfStock);
};

function searchAll() {
    showLoadingIndicator(true);
    fetch("http://localhost:3000/api/Products?filter=%7B%22where%22%3A%7B%22StoreId%22%3A%22" + storeId + "%22%7D%7D")
    .then(response => {
        return response.json();
    })
    .then(response => {
        showFilterProducts(response);
        showLoadingIndicator(false);
    })
};

function fetchFiltres(status) {
    showLoadingIndicator(true);
    fetch("http://localhost:3000/api/Products?filter=%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22StoreId%22%3A" + storeId + "%7D%2C%7B%22Status%22%3A%22" + status + "%22%7D%5D%7D%7D")
    .then(response => {
        return response.json();
    }).then(response => {
        showFilterProducts(response);
        showLoadingIndicator(false);
    });
};

function showFilterProducts(product) {
    raitingProduct = [];
    product.forEach((item, index, array) => {
        raitingProduct.push(item.Rating)
        html += Mustache.to_html(storesTableItems, item);
    });
    table.innerHTML = searchHead + html;
    setStar(raitingProduct);
    html = '';
};

function searchOK() {
    fetchFiltres('OK');
};

function searchOutOfStock() {
    fetchFiltres('OUT_OF_STOCK');
};

function searchStorage() {
    fetchFiltres('STORAGE');
};

function fetchPost(url, data) {
    showLoadingIndicator(true);
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => 
        response.json()
    )
    .then(response => {
        checkUrl(response.id);
        showLoadingIndicator(false);
    });
};

function checkUrl(id) {
    if (url === 'http://localhost:3000/api/Stores') {
        storeId = id;
    };
};

function fetchDelete(url, id) {
    showLoadingIndicator(true);
    fetch(url+id+'', {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
    }).then(response => {
        showLoadingIndicator(false);
    })
};

function getStoreOfForm() {
    store = {
        Name: document.getElementById('create-store-name').value,
        Email: document.getElementById('create-store-email').value,
        PhoneNumber: document.getElementById('create-store-phone').value,
        Address: document.getElementById('create-store-address').value,
        Established: document.getElementById('create-store-date').value,
        FloorArea: document.getElementById('create-store-floor').value
    };
}

function getProductOfForm() {
    product = {
        Name: document.getElementById('product-name').value,
        Price: document.getElementById('product-price').value,
        Photo: '',
        Specs: document.getElementById('product-specs').value,
        Rating: document.getElementById('product-rating').value,
        SupplierInfo: document.getElementById('product-supplier').value,
        MadeIn: document.getElementById('product-made').value,
        ProductionCompanyName: document.getElementById('product-company').value,
        Status: document.getElementById('product-status').value,
        StoreId: storeId
    };
};

function addListenerCreate() {
    createNewStoreLostener()
}

function createNewStoreLostener() {
    createNewStore.addEventListener('click', function() {
        url = 'http://localhost:3000/api/Stores';
        getStoreOfForm();
        storeList.innerHTML = storeList.innerHTML + Mustache.to_html(outputStoresItemTemplate, store);
        containerStoreDetails.innerHTML = Mustache.to_html(storeDetailsTemplate+tableFooter, store);
        modalWindowShow.style.display = "none";
        createNewProductListener();
        deleteStoreButton();
        fetchPost(url, store);
        hangEvent();
    });
};

function createProduct() {
    createNewProduct.addEventListener('click', function(){
        url = 'http://localhost:3000/api/Products';
        getProductOfForm();
        entryProductHtml ();
        fetchPost(url, product);
        setFiltres();
    })
}

function entryProductHtml () {
    let table = document.getElementById('table');
    table.innerHTML = table.innerHTML + Mustache.to_html(storesTableItems, product);
    modalProduct.style.display = "none";
}

function createNewProductListener() {
    document.getElementById('create-product').addEventListener('click', openProductModal);
}

function openProductModal () {
    modalProduct.style.display = "block";
};

function deleteStoreButton() {
    document.getElementById('delete-store').addEventListener('click', function () {
        deleteStoreModal.style.display = 'block';
    })
};

function deleteStore() {
    deleteStoreModal.style.display = "none";
    deleteProductsInStore();
    setDeleteToHtml();
};

function setDeleteToHtml() {
    containerStoreDetails.innerHTML = storeNoSelectded;
    document.querySelector('ul').removeChild(currentItem);
    modalProduct.style.display = "none";
};

function deleteProductsInStore() {
    showLoadingIndicator(true);
    fetchDelete('http://localhost:3000/api/Stores/', storeId);
    fetch("http://localhost:3000/api/Products?filter=%7B%22where%22%3A%7B%22StoreId%22%3A%22" + storeId + "%22%7D%7D")
    .then(response => {
        return response.json();
    }).then(response => {
        response.forEach((item, index, array) => {
            fetchDelete('http://localhost:3000/api/Products/', item.id);
            showLoadingIndicator(false);
        })
    })
};

createProduct();

createNewStoreLostener();

updateListStores();

cancelDetailModal.addEventListener('click', function() {
    modalProduct.style.display = 'none';
});

cancelDetailForm.addEventListener('click', function() {
    deleteStoreModal.style.display = "none";
});

createStore.addEventListener('click', function() {
    modalWindowShow.style.display = "block";
});

window.onclick = function(event) {
    if (event.target == modalWindowShow || event.target ==  modalProduct) {
        modalWindowShow.style.display = "none";
        modalProduct.style.display = "none";
    }
}

cancelForm.addEventListener('click', function() {
    modalWindowShow.style.display = "none";
})


syncButton.addEventListener('click', function(){
    updateListStores();
});

searchButton.addEventListener('click', searchStores);

deleteButton.addEventListener('click', function(){
    inputStores.value = '';
    searchButton.style.paddingLeft = '1.35vw';
    hangEvent();
    window.location = '#storeslist'
});

document.getElementById('delete-store-ok').addEventListener('click', deleteStore);

window.location = '#storeslist';