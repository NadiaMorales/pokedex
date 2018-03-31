const $form = $('#search-form')
const $searchInput = $('#search')
const $result = $('#result-pokemon')
let searched;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

for (var i = 0; i < 10; i++) {
    let num = getRandomInt(0, 900)

    $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${num}/`
        }).done(addPokemons)
        .fail(error)

    function addPokemons(news) {
        console.log(news);
        const pokes = news.results;
        const names = news.name;
        const imgs = news.sprites.front_default;
        const types = news.types[0].type.name;
        const species = news.species.url;
        const height = news.height;
        const weight = news.weight;

        let $list = $(`              
        <div class="col-sm-4 text-center">
        <div class="thumbnail">
            <img src="${imgs}" alt="pokemon">
            <div class="caption">
                <h3>${names}</h3>
                <p>${types}</p>
            </div>
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal${news.id}">Show data</button>
        </div>
    </div> 
                `)
        $result.append($list);

        $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon-species/${num}/`
            }).done(speciesDes)
            .fail(error)

        function speciesDes(news) {
            console.log(news);
            const speciesDes = news.flavor_text_entries[1].flavor_text;

            let $list = $(`
            <!-- Modal -->
            <div id="myModal${news.id}" class="modal fade" role="dialog">
                <div class="modal-dialog modal-md">
            
                    <!-- Modal content-->
                    <div class="modal-content text-center">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h1 class="modal-title">${names}</h1>
                            <h4>N°: ${news.id}</h4>
                        </div>
                        <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <img src="${imgs}" alt="pokemon">
                                <p>Type: ${types}</p>
                                <p>Height: ${height}</p>
                                <p>Weight: ${weight}</p>
                            </div>
                            <div class="col-sm-6">
                                <h1>Description</h1>
                                <p>${speciesDes}</p>
                            </div>
                        </div>    
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
            
                </div>
            </div>
            `)
            $result.append($list)
        }
    }
}

$form.submit(function (e) {
    e.preventDefault()
    $result.html('')
    searched = $searchInput.val()
    getPokemon();
})

function getPokemon() {
    $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${searched}/`
        }).done(addPokemon)
        .fail(error)
}

function addPokemon(news) {
    const poke = news.results
    const name = news.name
    const img = news.sprites.front_default
    const type = news.types[0].type.name
    const height = news.height;
    const weight = news.weight;
    console.log(type);

    let $div = $(`
                        <div class="col-sm-4 col-sm-offset-4 text-center">
                            <div class="thumbnail">
                                <img src="${img}" alt="pokemon">
                                <div class="caption">
                                    <h3>${name}</h3>
                                    <p>${type}</p>
                                </div>
                                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal${news.id}">Show data</button>
                            </div>
                        </div>
                `)
    $result.append($div)

    $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon-species/${searched}/`
        }).done(speciesDesa)
        .fail(error)

    function speciesDesa(news) {
        console.log(news);
        const speciesDes = news.flavor_text_entries[1].flavor_text;

        let $list = $(`
        <!-- Modal -->
        <div id="myModal${news.id}" class="modal fade" role="dialog">
            <div class="modal-dialog modal-md">
        
                <!-- Modal content-->
                <div class="modal-content text-center">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h1 class="modal-title">${name}</h1>
                        <h4>N°: ${news.id}</h4>
                    </div>
                    <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <img src="${img}" alt="pokemon">
                            <p>type: ${type}</p>
                            <p>Height: ${height}</p>
                            <p>Weight: ${weight}</p>
                        </div>
                        <div class="col-sm-6">   
                            <h1>Description</h1> 
                            <p>${speciesDes}</p>
                        </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
        
            </div>
        </div>
        `)
        $result.append($list)
    }
}

function error() {
    alert('Se ha presentado un error')
}