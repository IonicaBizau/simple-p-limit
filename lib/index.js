"use strict";

/**
 * simplePLimit
 * A simple implementation of concurent promises with a limit.
 *
 * @name simplePLimit
 * @function
 * @param {Number} concurrency How many functions returning a promise should run in parallel.
 * @return {Function} The `limit` function.
 */
module.exports = function simplePLimit(concurrency) {
  const queue = [];
  let activeCount = 0;

  async function next() {
    if (queue.length === 0 || activeCount >= concurrency) return;
    activeCount++;
    const { fn, resolve, reject } = queue.shift();
    try {
      resolve(await fn());
    } catch (error) {
      reject(error);
    } finally {
      activeCount--;
      next();
    }
  }

  return function (fn) {
    return new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      next();
    });
  };
}

