enum EventNames {
  "hello",
  "world",
}

interface Base {
  name: EventNames;
  payload: any;
}

interface I1 extends Base {
  name: EventNames.hello;
  payload: string;
}

interface I2 extends Base {
  name: EventNames.world;
  payload: number;
}

type Fusion = I1 | I2;

/*
function add(handler: ((p: I1) => void) | ((p: I2) => void))  {
  return;
}
*/

function add<P extends Base>(handler: (p: P) => void) {
  return;
}

function handler1(p: I1): void {
  return;
}

add(handler1);
