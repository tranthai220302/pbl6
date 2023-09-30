import configdb from "../../dbConfig/database.js";
import { Sequelize } from "sequelize";
import User from "./User.js";
import Book from "./Book.js";
import Role from "./role.js";
import Order from "./Order.js";
import Author from "./Author.js";
import Cart from "./Cart.js";
import CarItem from "./CartItem.js";
import Category from "./Category.js";
import Chat from "./Chat.js";
import Image from "./Image.js";
import Message from "./Message.js";
import OrderItem from "./OrderItem.js";
import Payment from "./Payment.js";
import Rating from "./Rating.js";
import Shippemt from "./Shippement.js";
import Voucher from "./Voucher.js";
import Review from "./Review.js";
import State from "./State.js";
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
db.book = Book(sequelize)
db.user = User(sequelize)
db.role = Role(sequelize)
db.order = Order(sequelize)
db.author = Author(sequelize)
db.cart = Cart(sequelize)
db.cartItem = CarItem(sequelize)
db.category = Category(sequelize)
db.chat = Chat(sequelize)
db.image = Image(sequelize)
db.message = Message(sequelize)
db.orderItem = OrderItem(sequelize)
db.payment = Payment(sequelize)
db.rating = Rating(sequelize)
db.shippemt = Shippemt(sequelize)
db.state = State(sequelize)
db.review = Review(sequelize)
db.voucher = Voucher(sequelize)
/* __Order__*/
db.user.hasMany(db.order,{
  foreignKey: 'customer_id'
})
db.order.belongsTo(db.user,{
  foreignKey: 'customer_id'
})

/*__OrderItem__*/
//orderId
db.order.hasMany(db.orderItem)
db.orderItem.belongsTo(db.order)
//bookid
db.orderItem.belongsTo(db.book)
db.book.hasOne(db.orderItem)

/*__Payment__*/
//orderId
db.order.hasOne(db.payment)
db.payment.belongsTo(db.order)

/*__Cart__*/
//customerId
db.user.hasOne(db.cart,{
  foreignKey: 'customerId'
})
db.cart.belongsTo(db.user, {
  foreignKey: 'customerId'
})
/*__CartItem__*/
//CartId
db.cart.hasMany(db.cartItem)
db.cartItem.belongsTo(db.cart)
//BookId
db.cartItem.belongsTo(db.book)
db.book.hasOne(db.cartItem)

/*__Chat__*/
db.chat.belongsTo(db.user, { as: 'Participant1', foreignKey: 'customer_id' });
db.chat.belongsTo(db.user, { as: 'Participant2', foreignKey: 'store_id' });

/*__Message__ */
//UserId
db.user.hasMany(db.message)
db.message.belongsTo(db.user  )
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

/*Rating*/
db.rating.belongsTo(db.user, { as: 'Rating1', foreignKey: 'customer_id' });
db.rating.belongsTo(db.user, { as: 'Rating2', foreignKey: 'store_id' });

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
db.shippemt.belongsTo(db.orderItem)
db.orderItem.hasOne(db.shippemt)
//ShipperId
db.user.hasOne(db.shippemt,{
  foreignKey: 'shipperId'
})
db.shippemt.belongsTo(db.user,{
  foreignKey: 'shipperId'
})
/*Voucher*/
db.voucher.belongsTo(db.user, { as: 'Voucher1', foreignKey: 'customer_id' });
db.voucher.belongsTo(db.user, { as: 'Voucher2', foreignKey: 'store_id' });

/*State*/
db.orderItem.hasMany(db.state)
db.state.belongsTo(db.orderItem)

/*Review*/
db.review.belongsTo(db.user, { as: 'review1', foreignKey: 'customer_id' });
db.review.belongsTo(db.user, { as: 'review2', foreignKey: 'store_id' });
export default db;
