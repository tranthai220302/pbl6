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
import Shippemt from "./Shippemt.js";
import Voucher from "./Voucher.js";
import Review from "./Review.js";
import State from "./State.js";
import Admin from "./Admin.js";
import VoucherItem from "./VoucherItem.js";
import Customer_VoucherItem from "./Customer_VoucherItem.js";
import StoreRequest from "./StoreRequest.js";
import ReportStore from "./ReportStore.js";
import ShipperRequest from "./ShipperRequest.js";
import FeedBack from "./FeedBack.js";
import ReviewShipper from "./ReviewShipper.js";
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
db.feedBack = FeedBack(sequelize);
db.customer_voucherItem = Customer_VoucherItem(sequelize)
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
db.voucherItem = VoucherItem(sequelize)
db.storeRequest = StoreRequest(sequelize)
db.reportStore = ReportStore(sequelize)
db.shipperRequest = ShipperRequest(sequelize)
db.reviewShipper = ReviewShipper(sequelize)

/*feedBack vs review*/
db.review.hasOne(db.feedBack);
db.feedBack.belongsTo(db.review);

/*reportStore vs customer*/
db.user.hasMany(db.reportStore, {foreignKey : 'customer_id', as : 'reportByCustomer'});
db.reportStore.belongsTo(db.user, {foreignKey: 'customer_id', as : 'customerReport'})
/*reportStore vs store*/
db.user.hasMany(db.reportStore, {foreignKey : 'store_id', as : 'reportByStore'});
db.reportStore.belongsTo(db.user, {foreignKey: 'store_id', as : 'storeByReport'})
/*Author vs store*/
db.author.belongsTo(db.user, {foreignKey: 'store_id'});
db.user.hasMany(db.author, {foreignKey: 'store_id'})
/* __Order__*/
//order vs Customer
db.order.belongsTo(db.user, { foreignKey: 'customer_id', as: 'customer' });
db.user.hasMany(db.order, { foreignKey: 'customer_id', as: 'ordersCustomer' });
//order vs Store
db.order.belongsTo(db.user, { foreignKey: 'store_id', as: 'store' });
db.user.hasMany(db.order, { foreignKey: 'store_id', as: 'ordersStore' });
//order vs book
db.order.belongsTo(db.book,{
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION'
})
db.book.hasMany(db.order, {
})

/*__Cart__*/
//customerId
db.user.hasMany(db.cart,{
  foreignKey: 'customerId'
})
db.cart.belongsTo(db.user, {
  foreignKey: 'customerId'
})
db.cart.belongsTo(db.book)
db.book.hasOne(db.cart, {
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION'
})
/*User vs RequestStore*/
db.user.hasOne(db.storeRequest, { as: "DetailStore", foreignKey: 'customer_id' });
db.storeRequest.belongsTo(db.user, { as: "userStore", foreignKey: 'customer_id' });

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
db.book.hasMany(db.image,{
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION'
})
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
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION'
})
db.book.belongsTo(db.author,{
  foreignKey: 'author_id'
})

/*Book vs Category*/
db.category.belongsToMany(db.book, {
  through: 'Category_Book',
})
db.book.belongsToMany(db.category, {through: 'Category_Book'})
/*Shipment*/
//OrderItemId//
db.shippemt.belongsTo(db.order)
db.order.hasOne(db.shippemt)
//ShipperId
db.user.hasMany(db.shippemt,{ foreignKey: 'shipperId', as: 'ordersShipper'})
db.shippemt.belongsTo(db.user,{ foreignKey: 'shipperId', as: 'shipper'})


/*Voucher vs VoucherItem*/
db.voucherItem.belongsTo(db.voucher);
db.voucher.hasMany(db.voucherItem)
/*VoucherItem vs User*/
db.user.belongsToMany(db.voucherItem, { through: db.customer_voucherItem, foreignKey: 'user_id' });
db.voucherItem.belongsToMany(db.user, { through: db.customer_voucherItem, foreignKey: 'voucherItem_id' });
db.user.hasMany(db.voucherItem, {foreignKey: 'store_id' })
db.voucherItem.belongsTo(db.user, {foreignKey: 'store_id'})
/*State*/
db.order.belongsTo(db.state)
db.state.hasMany(db.order)
/*Review*/
db.review.belongsTo(db.user, { as: 'review1', foreignKey: 'customer_id' });
db.review.belongsTo(db.book, { as: 'review2', foreignKey: 'book_id', onDelete: 'CASCADE',onUpdate: 'NO ACTION'  });
db.user.hasMany(db.review, { as: 'review_customer', foreignKey: 'customer_id' })
db.book.hasMany(db.review, { as: 'review_book', foreignKey: 'book_id'})

/*ReviewShipper*/
db.reviewShipper.belongsTo(db.user, { as: 'reviewShipper1', foreignKey: 'customer_id' });
db.reviewShipper.belongsTo(db.user, { as: 'reviewShipper2', foreignKey: 'shipper_id', onDelete: 'CASCADE',onUpdate: 'NO ACTION'  });
db.user.hasMany(db.reviewShipper, { as: 'reviewShipper_customer', foreignKey: 'customer_id' })
db.user.hasMany(db.reviewShipper, { as: 'review_shipper', foreignKey: 'shipper_id'}) 

db.order.hasMany(db.cart);
db.cart.belongsTo(db.order);

/*User vs RequestShipper*/
db.user.hasOne(db.shipperRequest, { as: "DetailShipper", foreignKey: 'customer_id' });
db.shipperRequest.belongsTo(db.user, { as: "userShipper", foreignKey: 'customer_id' });

export default db;
