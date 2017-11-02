import typeDetect from '../';
import Benchmark from 'benchmark';
const benches = [];
const fixtures = {
  'string literal    ': '',
  'array literal     ': [],
  'boolean literal   ': true,
  'object literal    ': {},
  'object from null  ': Object.create(null),
  'regex literal     ': /^$/,
  'number literal    ': 1,
  'promise           ': Promise.resolve(),
  'null              ': null,
  'undefined         ': undefined,
  'function          '() {},

  'buffer            ': Buffer.from(1),
  'date              ': new Date(),
  'error             ': new Error(),
  'map               ': new Map(),
  'regex constructor ': new RegExp(),
  'set               ': new Set(),
  'string constructor': new String(),
  'weakmap           ': new WeakMap(),
  'weakset           ': new WeakSet(),
  'arguments         ': (function () {
    return arguments;
  }()),
};
try {
  fixtures['arrow function    '] = eval('() => {}'); // eslint-disable-line no-eval
} catch (error) {
  console.error('cannot benchmark arrow functions');
}
try {
  fixtures['generator function'] = eval('function * generator() {}; generator'); // eslint-disable-line no-eval
} catch (error) {
  console.error('cannot benchmark generator functions');
}
const arrayTypes = [ 'Float64', 'Float32', 'Uint32', 'Uint16', 'Uint8', 'Int32', 'Int16', 'Int8', 'Uint8Clamped' ];
arrayTypes.forEach((value) => {
  value += 'Array';
  if (typeof global[value] === 'function') {
    fixtures[value + new Array(19 - value.length).join(' ')] = new (global[value])(1);
  }
});
if (typeof DataView === 'function') {
  fixtures['DataView          '] = new DataView(new ArrayBuffer(1));
}

const filter = process.argv[2] || '';
Object.keys(fixtures).filter((key) => key.indexOf(filter) !== -1).forEach((test) => {
  benches.push(new Benchmark(test, {
    fn() {
      typeDetect(fixtures[test]);
    },
    onCycle(event) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(event.target.toString());
    },
  }));
});
Benchmark.invoke(benches, {
  name: 'run',
  onCycle: function onCycle() {
    console.log('');
  },
  onComplete: function onComplete() {
    console.log('~Fin~');
  },
});
