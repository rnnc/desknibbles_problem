const fs = require('fs');
const path = require('path');

// read current inventory
const inventory = JSON.parse(
  fs.readFileSync(path.resolve('./inventory.json'))
).products;

// read customer data
const sample_data = JSON.parse(
  fs.readFileSync(path.resolve('./sample_data.json'))
);

const realSnacks = [];

const processedData = inventory.forEach(product => {
  sample_data.forEach(person => {

    const { fave_snack, email } = person;
    const { title, variants } = product;

    if (person.fave_snack === product.title)
      realSnacks.push({
        fave_snack: person.fave_snack,
        email: person.email,
        price: variants[0].price
      })
  })
})

fs.writeFileSync(
  path.resolve('./processed_data.json'),
  JSON.stringify(realSnacks)
);

console.log(realSnacks)