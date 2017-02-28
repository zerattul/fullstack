(function () {
  var app = angular.module('pokedex', [])

  app.controller('pokemonController', function () {
    this.pokemon = {
      id: '001',
      name: 'Bulbasaur',
      species: 'Seed Pokemon',
      type: ['Grass', 'Poison'],
      height: '50cm',
      weight: '6.5kg',
      abilities: ['Latigo cepa', 'hojas navaja'],
      stats: {
        hp: 45,
        attack: 59,
        defense: 46,
        "sp.atk": 54,
        "sp.def": 43,
        speed: 34,
        total: 324
      },
      evolution: ["Bulbasaur", "Ivysaur", "Venusaur"]
    }
  })

  app.controller('tabsController', function () {
    this.tab = 1

    this.selectTab = function (tab) {
      this.tab = tab
    }
  })
})()
