import configdb from "../../dbConfig/database.js";
import { Sequelize } from "sequelize";
import User from "./User.js";
import Book from "./Book.js";
import Role from "./Role.js";
import Order from "./Order.js";
import Author from "./Author.js";
import Cart from "./Cart.js";
import Category from "./Category.js";
import Chat from "./Chat.js";
import Image from "./Image.js";
import Message from "./Message.js";
import Shippemt from "./Shippement.js";
import Voucher from "./Voucher.js";
import Review from "./Review.js";
import State from "./State.js";
import Admin from "./Admin.js";
const sequelize = new Sequelize(
    configdb.DB,
    configdb.USER,
    configdb.PASSWORD,
    {
      host: configdb.HOST,
      dialect: configdb.dialect,
      operatorsAliases: 0,
  
      pool: {
        max: configdb.pool.max,
        min: configdb.pool.min,
        acquire: configdb.pool.acquire,
        idle: configdb.pool.idle
      },
      logging: false
    }
);
const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.admin = Admin(sequelize)
db.book = Book(sequelize)
db.user = User(sequelize)
db.role = Role(sequelize)
db.order = Order(sequelize)
db.author = Author(sequelize)
db.cart = Cart(sequelize)
db.category = Category(sequelize)
db.chat = Chat(sequelize)
db.image = Image(sequelize)
db.message = Message(sequelize)
db.shippemt = Shippemt(sequelize)
db.state = State(sequelize)
db.review = Review(sequelize)
db.voucher = Voucher(sequelize)
/* __Order__*/
//order vs Customer
db.order.belongsTo(db.user, { foreignKey: 'customer_id', as: 'customer' });
db.user.hasMany(db.order, { foreignKey: 'customer_id', as: 'ordersCustomer' });
//order vs Store
db.order.belongsTo(db.user, { foreignKey: 'store_id', as: 'store' });
db.user.hasMany(db.order, { foreignKey: 'store_id', as: 'ordersStore' });
//order vs book
db.order.belongsTo(db.book)
db.book.hasMany(db.order)

/*__Cart__*/
//customerId
db.user.hasMany(db.cart,{
  foreignKey: 'customerId'
})
db.cart.belongsTo(db.user, {
  foreignKey: 'customerId'
})
db.cart.belongsTo(db.book)
db.book.hasOne(db.cart)

/*__Chat__*/
//chat vs customer
db.chat.belongsTo(db.user, { as: 'Participant1', foreignKey: 'customer_id' });
db.user.hasMany(db.chat, { foreignKey: 'customer_id', as: 'chatCustomer' });
//chat vs store
db.chat.belongsTo(db.user, { as: 'Participant2', foreignKey: 'store_id' });
db.user.hasMany(db.chat, { foreignKey: 'store_id', as: 'chatStore' });

/*__Message__ */
//UserId
db.user.hasMany(db.message)
db.message.belongsTo(db.user)
//ChatId
db.chat.hasMany(db.message)
db.message.belongsTo(db.chat)

/*__User__*/
//RoleId
db.role.hasMany(db.user)
db.user.belongsTo(db.role)

/*__Image__*/
//bookId
db.book.hasMany(db.image)
db.image.belongsTo(db.book)


/*Book*/
//storeId
db.user.hasMany(db.book, {
  foreignKey: 'store_id'
})
db.book.belongsTo(db.user,{
  foreignKey: 'store_id'
})
//authorId
db.author.hasMany(db.book, {
  foreignKey: 'author_id'
})
db.book.belongsTo(db.author,{
  foreignKey: 'author_id'
})

/*Book vs Category*/
db.category.belongsToMany(db.book, {through: 'Category_Book', as: 'Instruments'})
db.book.belongsToMany(db.category, {through: 'Category_Book', as: 'Instruments'})

/*Shipment*/
//OrderItemId//
db.shippemt.belongsTo(db.order)
db.order.hasOne(db.shippemt)
//ShipperId
db.user.hasMany(db.shippemt,{
  foreignKey: 'shipperId'
})
db.shippemt.belongsTo(db.user,{
  foreignKey: 'shipperId'
})
/*Voucher*/
db.user.hasMany(db.voucher, {foreignKey: 'store_id' })
db.voucher.belongsTo(db.user, {foreignKey: 'store_id'})
db.user.belongsToMany(db.voucher, { through: 'UserVoucher', foreignKey: 'user_id' });
db.voucher.belongsToMany(db.user, { through: 'UserVoucher', foreignKey: 'voucher_id' });

/*State*/
db.order.hasMany(db.state)
db.state.belongsTo(db.order)

/*Review*/
db.review.belongsTo(db.user, { as: 'review1', foreignKey: 'customer_id' });
db.review.belongsTo(db.book, { as: 'review2', foreignKey: 'book_id' });
db.user.hasMany(db.review, { as: 'review_customer', foreignKey: 'customer_id' })
db.book.hasMany(db.review, { as: 'review_book', foreignKey: 'book_id' })

export default db;
