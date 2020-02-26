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
