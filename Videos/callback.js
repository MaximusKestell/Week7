let animals = ['Giraffe', 'Elephant', 'Yak']

animals.forEach( function(animal,index ) {
    console.log(animal, index)
})
// top and bottom are different ways to do the same thing.
animals.forEach( (animal, index) => {
    console.log(animal, index)
} )

animals.forEach( function(animal) {
    console.log(animal)
})
// Below is simplified version of above.
animals.forEach( (animal) => {
    console.log(animal)
})
animals.forEach( ( animal) => {
    console.log(animal)
})

animals.forEach( animal => console.log(animal))