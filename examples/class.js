const Container = require('../client/container');

const container = new Container();

class Person {
  constructor(name, email, age, location) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.location = location;
  }
}

container.register('person', Person, ['Matthew', 'matt123@gmail.com', 37, 'Nashville']);
const person = container.resolve('person');

console.log(person.name) //returns Matthew
console.log(person.email) //returns matt123@gmail.com
console.log(person.age) //returns 37
console.log(person.location) //returns Nashville

class Show {
  constructor(name, season, episode, actors){
    this.name = name;
    this.season = season;
    this.episode = episode
    this.actors = actors
  }
}

container.register('show', Show, ['The Office', 'Season 1', 'Episode 10', ['Steve Carell', 'John Krasinski', 'Jenna Fischer']]);
const show = container.resolve('show');

console.log(show.name) //returns The Office
console.log(show.season) //returns Season 1
console.log(show.episode) //returns Episode 10
console.log(show.actors) //returns Steve Carell, John Krasinski, Jenna Fischer


class Foo {
  constructor() {
    this.name = 'foo';
    this.age = 5;
  }
}

container.register('foo', Foo);
const noDependencyFoo = container.resolve('foo');

console.log(noDependencyFoo.name); // returns foo
console.log(noDependencyFoo.age); // returns 5
