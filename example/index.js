"use strict";

const simplePLimit = require("../lib");

(async () => {
  const limit = simplePLimit(2)

  // Time   ------------------------>
  // Task 1  |--- 1000ms ---|
  // Task 2  |-500ms|
  // Task 3         |-300ms|
  // Task 4                |--700ms-|
  const sleep = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
  const tasks = [
    limit(() => { return sleep(1000, 'Task 1'); }),
    limit(() => { return sleep(500, 'Task 2'); }),
    limit(() => { return sleep(300, 'Task 3'); }),
    limit(() => { return sleep(700, 'Task 4'); }),
  ];

  console.log(await Promise.all(tasks)); // Output: ['Task 1', 'Task 2', 'Task 3', 'Task 4']
})();
