
const Container = require('../container');

describe('Container', () => {
  class Foo {
    constructor() {
      this.test = 'test';
    }
  }
  describe('register', () => {
    it('should store class as a Map() when name is passed in', () => {
      const container = new Container();

      container.register('foo', Foo, { bar: true });

      expect(container.services.get('foo')).toEqual({
        definition: expect.any(Function),
        dependencies: { bar: true },
      });
    });

    it('should store object as a Map() when name is passed in', () => {
      const testObj = {};
      const container = new Container();

      container.register('foo', testObj, { bar: true });

      expect(container.services.get('foo')).toEqual({
        definition: expect.any(Object),
        dependencies: { bar: true },
      });
    });

    it('should store a singleton dependency with a flag', () => {
      const testObj = {};
      const container = new Container();
      const isSingleton = true;

      container.register('foo', testObj, { bar: true }, isSingleton);

      expect(container.services.get('foo')).toEqual({
        definition: expect.any(Object),
        dependencies: { bar: true },
        isSingleton: true,
      });
    });

    it('should throw an Error when attempting to register without a name', () => {
      const container = new Container();

      expect(() => {
        container.register();
      }).toThrow('Class name is required. Please enter the Class name');
    });

    it('should throw an Error when attempting to register any other type', () => {
      const container = new Container();

      expect(() => {
        container.register('foo', 1);
      }).toThrow('You can only register a class or object. Please verify the dependency type');
    });
  });

  describe('resolve', () => {
    it('should return instantiated object of specified class', () => {
      const container = new Container();
      container.register('foo', Foo, { bar: false });
      const instantiatedValue = container.resolve('foo');

      expect(instantiatedValue).toEqual({ test: 'test' });
    });

    it('should throw error when name is not passed to resolve()', () => {
      const container = new Container();

      expect(() => {
        container.resolve();
      }).toThrow('Class name is required. Please enter the Class name');
    });

    it('should throw Error when class is not registered', () => {
      const container = new Container();

      expect(() => {
        container.resolve('class-does-not-exist');
      }).toThrow('The Class you are trying to resolve doesn\'t exist. Please check again');
    });

    it('should not allow overriding of singleton class', () => {
      const container = new Container();
      const isSingleton = true;

      container.register('foo', Foo, { bar: true }, isSingleton);
      const instanceValue = container.resolve('foo');

      expect(instanceValue).toEqual({ test: 'test' });

      class Bar {
        constructor() {
          this.test = 'test override class';
        }
      }

      container.register('foo', Bar, { bar: false }, isSingleton);

      const newInstanceValue = container.resolve('foo');
      expect(newInstanceValue).toEqual({ test: 'test' });
    });

    it('should set the dependencies of the class when set', () => {
      class Person {
        constructor(height, name) {
          this.height = height;
          this.name = name;
        }
      }
      const container = new Container();

      container.register('person', Person, [160, 'sam']);
      const instanceValue = container.resolve('person');

      expect(instanceValue.height).toEqual(160);
      expect(instanceValue.name).toEqual('sam');
    });

    it('should work without setting dependencies', () => {
      class Person {
        constructor() {
          this.height = 200;
        }
      }
      const container = new Container();

      container.register('person', Person);
      const instanceValue = container.resolve('person');

      expect(instanceValue.height).toEqual(200);
    });

    it('should support modules', () => {
      const lib = {
        method: () => {},
      };
      const container = new Container();

      container.register('person', lib);
      const instanceValue = container.resolve('person');

      expect(instanceValue.method).toEqual(expect.any(Function));
    });
  });
});
