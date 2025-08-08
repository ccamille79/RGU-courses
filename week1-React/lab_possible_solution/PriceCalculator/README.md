# PriceCalculator

To run this, you'll need:
- node
- npm
- mongod (server from community tools)
- mongosh (for checking the database)

To run the database, in top level folder type
`mongod --auth --port 27017 --dbpath mydatabase`

In the PriceCalculator folder type
`node backend/index.js`

Look at the webpage running on localhost:8000
See if you can add a quote to the database. Use mongosh to check the quote:
`mongosh --host 127.0.0.1:27017`
Then in mongo shell:
`use mydb`
`db.quotes.find()`
