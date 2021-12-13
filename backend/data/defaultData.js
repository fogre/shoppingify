//default data
const defaultCategoriesAndItems = {
  'Fruits and vegetables': [
    {
      name: 'Avocado',
      note: 'The fruit of the plant, also called an avocado, is botanically a large berry containing a single large seed.'
    },
    {
      name: 'Carrot',
      note: 'The carrot is a root vegetable, usually orange in color, though purple, black, red, white, and yellow cultivars exist. They are a domesticated form of the wild carrot, Daucus carota, native to Europe and Southwestern Asia.'
    },
    {
      name: 'Bell Pepper',
      note: 'The bell pepper is the fruit of plants in the Grossum cultivar group of the species Capsicum annuum. Cultivars of the plant produce fruits in different colors, including red, yellow, orange, green, white, and purple. Bell peppers are sometimes grouped with less pungent pepper varieties as sweet peppers. While they are fruits—botanically classified as berries—they are commonly used as a vegetable ingredient or side dish.'
    },
    {
      name: 'Cucumber',
      note: 'Cucumber is a widely-cultivated creeping vine plant in the Cucurbitaceae gourd family that bears cucumiform fruits, which are used as vegetables. There are three main varieties of cucumber—slicing, pickling, and burpless/seedless—within which several cultivars have been created.',
      image: 'https://i.imgur.com/xUXhFSH.jpeg'
    },
    {
      name: 'Strawberry',
      note: 'The garden strawberry is a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries, which are cultivated worldwide for their fruit. The fruit is widely appreciated for its characteristic aroma, bright red color, juicy texture, and sweetness.',
      image: 'https://i.imgur.com/EZH6bad.jpeg'
    },
  ],
  'Meat and poultry': [
    {
      name: 'Minced meat 400g',
      note: 'is meat finely chopped by a meat grinder or a chopping knife. A common type of ground meat is ground beef, but many other types of meats are prepared in a similar fashion, including pork, veal, lamb, and poultry.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Ground_beef_USDA.jpg'
    },
    {
      name: 'Chicken legs 400g',
      note: 'super basic marinaded, salt injected legs'
    },
    {
      name: 'Kebab',
      note: 'Turkish meat stick',
      image: 'https://i.imgur.com/TgpbNVU.gif'
    },
  ],
  'Beverages': [
    {
      name: 'Soda',
      note: 'Soda is a bubbly drink known for its static taste'
    },
    {
      name: 'Beer',
      note: 'Just a basic beer'
    },
    {
      name: 'Apple Juice',
      note: 'Juice made by squeezing juices from apples'
    }
  ],
  'Beans and vegan protein': [
    {
      name: 'Kidney beans 400g',
      note: 'Kidney shaped beans'
    },
    {
      name: 'Nyhtökaura 350g',
      note: 'Pulled oat full of protein'
    }
  ]
}

const devUser = {
  email: 'dev@user.com',
  password: 'verysekret'
}

module.exports =  {
  defaultCategoriesAndItems,
  devUser,
}