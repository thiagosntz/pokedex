const getPokemonUrl = id => ` https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {

    const pokemonPromises = []

    for (let i = 1; i <=150; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises).then(pokemons => {

        const listCardsPokemons = pokemons.reduce((accumulator, pokemon) => {

            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name)


            var statsTotal = 0
            var statsList = [
                pokemon.stats[0].base_stat,
                pokemon.stats[1].base_stat,
                pokemon.stats[2].base_stat,
                pokemon.stats[3].base_stat,
                pokemon.stats[4].base_stat,
                pokemon.stats[5].base_stat,
            ]
            for(let i = 0; i < statsList.length; i++){
                statsTotal += statsList[i]
            }

            accumulator += 
                `
                <div class="pokemon-card type-${pokemon.types[0].type.name}" id="pokemon-${pokemon.id}">
                    <div class="card-top">
                        <div class="details">
                            <h2 class="name">${pokemon.name}</h2>
                            <span># ${pokemon.id}</span>
                        </div>
                        <span class="type">${pokemon.types.map(typeInfo => typeInfo.type.name).join(' | ')}</span>

                        <div class="card-image">
                            <img alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
                        </div>
                    </div>

                    <div class="card-info">
                        <div class="status">
                            <h3>Status</h3>
                            <ul>
                                <li>HP ${pokemon.stats[0].base_stat}</li>
                                <li>Ataque ${pokemon.stats[1].base_stat}</li>
                                <li>Defesa ${pokemon.stats[2].base_stat}</li>
                                <li>Ataque Esp. ${pokemon.stats[3].base_stat}</li>
                                <li>Defesa Esp. ${pokemon.stats[4].base_stat}</li>
                                <li>Velocidade ${pokemon.stats[5].base_stat}</li>
                                <li>Total ${statsTotal}</li>
                            </ul>
                        </div>

                        <div class="skills">
                            <h3>Habilidades</h3>
                            <p class="skills-list">
                                ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join('<br>')}
                            </p>
                        </div>
                    </div>

                </div>
                `


            return accumulator
        }, '')


        const pokemonNavList = pokemons.reduce((accumulator, pokemon) => {

            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name)

            accumulator += 
                `
                <ul>
                    <li class="pokemon" id="${pokemon.id}">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="imagem do ${pokemon.name}">
                        <span>${pokemon.name}</span>
                    </li>
                </ul>
                `

            return accumulator
        }, '')

        const pokemonCards = document.querySelector('[data-js="pokedex"]')
        pokemonCards.innerHTML = listCardsPokemons

        const pokemonList = document.querySelector('[data-js="pokemon-list"]')
        pokemonList.innerHTML = pokemonNavList

        activePokemonList()
     
    })

}

fetchPokemon()


function activePokemonList(){

    const pokemonList = document.querySelectorAll('.pokemon')
    const pokemonCard = document.querySelectorAll('.pokemon-card')
    
    pokemonCard[0].classList.add('show')
    pokemonList[0].classList.add('active')

    pokemonList.forEach(pokemon => {
        pokemon.addEventListener('click', () => {
    
            const openPokemonCard = document.querySelector('.show')
            openPokemonCard.classList.remove('show')
    
            const selectedPokemonId = pokemon.attributes.id.value
    
            const selectedPokemonIdToOpen = 'pokemon-'+ selectedPokemonId

            const pokemonCardToOpen = document.getElementById(selectedPokemonIdToOpen)
            pokemonCardToOpen.classList.add('show')
    
            const activePokemonInTheList = document.querySelector('.active')
            activePokemonInTheList.classList.remove('active')
    
            const selectedPokemonInTheList = document.getElementById(selectedPokemonId)
            selectedPokemonInTheList.classList.add('active')
        })
    })
    
}




