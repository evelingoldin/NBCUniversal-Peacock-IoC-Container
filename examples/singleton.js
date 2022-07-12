const Container = require('../client/container')

const container = new Container();
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const isSingleton = true;
container.register('person', Person, ['Matthew', 37], isSingleton);
const person = container.resolve('person');

console.log(person.name); // returns Matthew
console.log(person.age); // returns 37

class Foo {
  constructor() {
    this.name = 'foo';
    this.age = 5;
  }
}

container.register('person', Foo, ['Luna', 5], isSingleton);
const personTwo = container.resolve('person');

console.log(personTwo.name); // still returns Matthew
console.log(personTwo.age); // still returns 37