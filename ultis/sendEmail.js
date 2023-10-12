import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import inlineCss from 'inline-css'
dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "thailu220302@gmail.com",
      pass: process.env.passEmail,
    },
  });
  const sendEmail = async(customer, order, book, price_free, priceShip, priceFreeShip) => {
    const price = order.quantity*book.price;
    const info = await transporter.sendMail({
      from: 'harumi@gmail.com', 
      to: "tranthai220302@gmail.com", 
      subject: `Harumi đã nhận đơn hàng ${book.name}`, 
      html: `
      <div style="max-width: 1200px; margin: 0 auto; background-color: gray">
        <div style="background-color: gray; font-size: 17px;">
            <div style="text-align: center; padding: 20px;">
            <span style="font-size: 25px; background-color: white; font-weight: 600;">Cám ơn bạn đã đặt hàng tại Harumi!</span>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 10px;">
            <span style="display: block; text-align: center;">Xin chào ${customer.firsName + customer.lastName}</span>
            <span style="display: block; text-align: center;">Harumi đã nhận được yêu cầu đặt hàng của bạn và đang xử lý nhé. Bạn sẽ nhận được thông báo tiếp theo khi đơn hàng đã sẵn sàng được giao.</span>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h2>Đơn hàng được giao đến</h2>
            <div style="margin-bottom: 10px;">
                <strong style="color: #0f146d;">Tên:</strong>
                <span>${customer.firstName + customer.lastName}</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong style="color: #0f146d;">Địa chỉ:</strong>
                <span>${customer.address}</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong style="color: #0f146d;">Điện thoại:</strong>
                <span>0${customer.phone}</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong style="color: #0f146d;">Email:</strong>
                <span>${customer.email}</span>
            </div>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h2>Đơn hàng</h2>
            <span>Được bán bởi: TT102-Dụng cụ thể thao</span>
            <div style="display: flex; margin-top: 20px;">
                <img src=${book.image} alt="" style="flex: 1; max-width: 300px; margin-right: 50px;">
                <div style="flex: 3;">
                <span style="display: block;">${book.name}</span>
                <span style="display: block; color: red; font-weight: 600;">VND ${book.price}</span>
                <span style="display: block;">Số lượng : ${order.quantity}</span>
                </div>
            </div>
            </div>
            <div style="background-color: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <table style="width: 100%;">
                    <tr>
                        <td style="padding-right: 500px;">Thành tiền</td>
                        <td style="text-align: right;">${price}đ</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 500px;">Tiền ship</td>
                        <td style="text-align: right;">${priceShip}</td>
                    </tr>
                    <tr>
                    <td style="padding-right: 500px;">Free ship</td>
                        <td style="text-align: right;">- ${priceFreeShip}</td>
                    </tr>
                    <tr>
                        <td style="padding-right: 500px;">Giảm giá</td>
                        <td style="text-align: right;">- ${price_free}đ</td>
                    </tr>
                    <tr>
                        <td style="border-top: 1px solid #000; font-weight: bold; padding-right: 500px;">Tổng cộng</td>
                        <td style="border-top: 1px solid #000; text-align: right; font-weight: bold;">${order.total_price}đ</td>
                    </tr>
                </table>
            </div>
            <div style="text-align: center; background-color: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h1>Thanks for your order!</h1>
            </div>
        </div>
    </div>

      `, 
    });
    console.log('send email')
};

  
export default sendEmail;