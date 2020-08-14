require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

//GET ALL ITEMS THAT CONTAIN TEXT
function getTextItems (searchTerm) {
    knexInstance
        .select()
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

//getTextItems('Kale')

//GET ALL ITEMS PAGINATED
function getPaginatedItems(pageNumber) {
    const limit = 6;
    const offset = limit * (pageNumber - 1);

    knexInstance    
        .select()
        .from('shopping_list')
        .limit(limit)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

//getPaginatedItems(4)


//GET ALL ITEMS ADDED AFTER DATE

function totalCategoryCost() {
    knexInstance  
        .select('category')
        .sum('price AS total')  
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
    }

totalCategoryCost();