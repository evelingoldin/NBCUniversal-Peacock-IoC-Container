class Container {
  constructor() {
    this.services = new Map();
    this.singletons = new Map();
  }

  /**
   * Register Class in the Container
   * @param {String} name - name given to the Class
   * @param {Object} definition - the actual Class
   * @param {Array} dependencies - the dependencies for that Class constructor.
   * @param {Boolean} isSingleton - confirms if it is a Singleton 
   * @returns {void} - doesn't return anything
   */
  register(name, definition, dependencies, isSingleton) {
    if (!name) { //if the name isn't entered, throw an error
      throw new Error('Class name is required. Please enter the Class name');
    }
    if (typeof definition === 'function' || typeof definition === 'object') { //if the definition is a function or object
      this.services.set( //add the following key-value pairs to the Map object
        name,
        {
          definition,
          dependencies,
          isSingleton,
        },
      );
    } else { //otherwise (if not function or object), throw an error
      throw new Error(
        'You can only register a class or object. Please verify the dependency type',
      );
    }
  }

  /**
   * Resolves a given Class or Object
   * @param {String} name - name of Class set during registration
   * @returns {any} value of class
   */
  resolve(name) {
    const current = this.services.get(name); //initialize variable which retrieves an instance of the Class set during registration

    if (!name) { //if the name isn't entered, throw an error
      throw new Error(
        'Class name is required. Please enter the Class name',
      );
    }

    if (!current) { //if the Class doesn't exist, throw an error
      throw new Error(
        'The Class you are trying to resolve doesn\'t exist. Please check again',
      );
    }

    if (current.isSingleton) { //if the Class is a Singleton
      const singletonInstance = this.singletons.get(name); //initialize variable which retrieves the ONLY instance of the Class set during registration
      if (singletonInstance) { //if there is already an instance of the Singleton
        return singletonInstance; //return the instance
      }

      const singletonInstanceValue = this.getInstantiatedValue(current); //intialize variable to get value of current Singleton class
      this.singletons.set(name, singletonInstanceValue); //add the following key-value pairs to the Map object

      return singletonInstanceValue; //return the value
    }
    return this.getInstantiatedValue(current); //return value of current Singleton instance
  }

  /**
   * Returns value of a given instance
   * @param {Object} currentObject an object to instantiate
   * @returns {any} Instantiated value
   */
  getInstantiatedValue(currentObject) {
    if (currentObject.dependencies && currentObject.dependencies.length > 0) { //if the currentObject has dependencies
      return new currentObject.definition(...currentObject.dependencies); 
    }
    if (Object.keys(currentObject.definition).length) { //if there are key-value pairs
      return currentObject.definition; 
    }

    return new currentObject.definition();
  }
}

module.exports = Container;