/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
 

export function createGetter(path) {

  return function(obj) {
    let parts = path.split(".");
    let current = obj;
    for (let i = 0; i < parts.length; i++) {
      current = current[parts[i]];
      if (!current)
      {break;}
    }
    return current;
  };
  
}
