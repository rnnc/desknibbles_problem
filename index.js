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

// init data store
const realSnacks = [];

const processedData = inventory.forEach(product => {

  sample_data.forEach((person, i) => {

    const { fave_snack, email } = person;
    const { title, variants } = product;

    // check if snack exists in inventory
    if (fave_snack === title) {

      // check if snack exists in data store
      const index = realSnacks.findIndex(elem => elem.fave_snack === title);

      (index > -1)

        ? realSnacks[index].email.push(email)

        : realSnacks.push({
          fave_snack,
          price: variants[0].price,
          email: [email]
        })
    }
  })

})

fs.writeFileSync(
  path.resolve('./processed_data.json'),
  JSON.stringify(realSnacks, null, 2)
);

console.log(realSnacks)