const foo = {
  name: "gaurav",
  age: 30,
  isBiker: true,
  address: {
    city: "Nashik",
    pin: 1234,
    building: {
      flat: "12",
      name: "Abc tower",
      rooms: [1, 2, 3],
      roomsObject: [
        { height: 5, width: 4 },
        { height: 13, width: 3 },
        { height: 9, width: 9, weight: 70 }
      ]
    }
  },
  arr: [1, 2, 4],
  arrOfObject: [
    { height: 5, width: 4 },
    { height: 13, width: 3 },
    {
      height: 9,
      width: 9,
      weight: 70,
      arrOfArray: [
        [3, 4, 6, 9],
        [1, 5, 7, 10],
        [2, 8, 9]
      ]
    }
  ],
  arrOfArray: [
    [3, 4, 6, 9],
    [1, 5, 7, 10],
    [2, 8, 9]
  ],
  isMarried: true
};
const TYPES = {
  STRING: "string",
  OBJECT: "object",
  NUMBER: "number",
  BOOLEAN: "boolean"
};
const commaOrNothing = (length, index) => (length === index ? "" : ",");
const keyValue = (key, value, length, i) =>
  `${key ? `"${key}":` : ""}${value}${commaOrNothing(length, i)}`;

const myStringify = (obj) => {
  let str = "{";
  let length = Object.keys(obj).length - 1;
  let i = 0;
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      let arrayLength = obj[key].length - 1;
      let arrayIndex = 0;
      str += `"${key}":[`;
      let keyArrayIndex = 0;
      for (const keyOfArray of obj[key]) {
        let keyArrayLength = keyOfArray.length - 1;
        if (Array.isArray(keyOfArray)) {
          str += keyValue("", `[${keyOfArray}]`, keyArrayLength, keyArrayIndex);
          keyArrayIndex++;
        } else if (typeof keyOfArray === TYPES.OBJECT) {
          str += keyValue("", myStringify(keyOfArray), arrayLength, arrayIndex);
        } else {
          str += `${obj[key]}`;
          break;
        }
        arrayIndex++;
      }
      str += `]${commaOrNothing(length, i)}`;
    } else if (typeof obj[key] === TYPES.OBJECT) {
      str += `"${key}":`;
      str += keyValue("", myStringify(obj[key]), length, i);
    } else if (
      typeof obj[key] === TYPES.NUMBER ||
      typeof obj[key] === TYPES.BOOLEAN
    ) {
      str += keyValue(key, obj[key], length, i);
    } else {
      str += keyValue(key, `"${obj[key]}"`, length, i);
    }
    i++;
  }
  return `${str}}`;
};

const bar = myStringify(foo);
console.log(
  "🚀 ~ file: index.js:76 ~ JSON.stringify(foo):",
  JSON.stringify(foo)
);
console.log("🚀 ~ file: index.js:74 ~ bar:", bar);
console.log("🚀 ~ file: index.js:78 ~  JSON.parse(bar):", JSON.parse(bar));
console.log(
  "🚀 ~ file: index.js:77 ~ bar === JSON.stringify(foo):",
  bar === JSON.stringify(foo)
);
