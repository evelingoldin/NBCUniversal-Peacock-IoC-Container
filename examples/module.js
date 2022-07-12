const Container = require('../client/container')

const container = new Container();
const cakes = {
  getCakes: () => (['chocolate', 'carrot']),
};

container.register('cake', cakes);
const cake = container.resolve('cake');

console.log(cake.getCakes()); // returns [ 'chocolate', 'carrot' ]