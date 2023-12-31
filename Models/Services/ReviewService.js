import { Op, where } from "sequelize";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import Sequelize from "sequelize";
export const deleteReviewService = async(id,customer_id)=>{
    try {
        const delete_review = await db.review.destroy({
            where : {
                [Op.and] : [
                    {id},
                    {customer_id}
                ]
            }
        })
        if(delete_review == 0) return createError(400, 'Xoá đánh giá không thành công!')
        return {
            status: true,
            meessage: 'Xoá thành công!'
        };
    } catch (error) {
        return error;
    }
}
export const inforReviewBookService = async(id) =>{
    try {
        const number_review = await db.review.count({
            where : {
                book_id : id
            }
        })
        let arrRating = [];
        for(let i = 1; i <=5 ; i++){
            const count = await db.review.count({
                where : {
                    [Op.and] : [
                        {book_id : id},
                        {num_star : i}
                    ]
                }
            })
            if(!count){
                arrRating.push(0)
            }else{
                arrRating.push((count/number_review)*100)
            }
        }
        const numPage = (Math.ceil(number_review/2))
        return {
            number_review,
            arrRating,
            numPage
        };
    } catch (error) {
        return error;
    }
}
export const getReviewsByBookService = async(id, page, reviewsPerPage = 2) =>{
    try {
        if(page){
            const offset = (page - 1) * reviewsPerPage;

            const reviews = await db.review.findAll({
                include: [
                    {
                        model: db.user,
                        as: 'review1',
                        attributes: { exclude: ['password'] }
                    }
                ],
                where: { book_id: id },
                limit: reviewsPerPage,
                offset: offset
            });
            if(reviews.length == 0) return {message : 'Không có đánh giá!'}
            return {
                reviews,
            };
        }else{
            const reviews = await db.review.findAll({
                include: [
                    {
                        model: db.user,
                        as: 'review1',
                        attributes: { exclude: ['password'] }
                    }
                ],
                where: { book_id: id },
            });
            if(reviews.length == 0) return {message : 'Không có đánh giá!'}
            return {
                reviews,
            };
        }

    } catch (error) {
        return error;
    }
}
export const updateReviewService = async(id, desc, num_star, customer_id, img)=>{
    try {
        const update_review = await db.review.update({
            desc,
            num_star,
            img
        }, {
            where : {
                [Op.and] : [
                    {id},
                    {customer_id}
                ]
            }
        })
        if(update_review[0] == 0) return createError(400, 'Update không thành công!')
        return {
            status: true,
            message: 'Chỉnh sửa thành công!'
        }
    } catch (error) {
        
    }
}
export const createReviewService = async(desc, customer_id, book_id, num_star, img) =>{
    try {
        const order = await db.order.findAll({
            where : {
                [Op.and] : [
                    {customer_id},
                    {BookId: book_id},
                    {isPayment : 1}
                ]
            }
        })
        if(order.length == 0) return createError(400, 'Bạn không thể đánh giá sản phẩm khi chưa có đơn hàng!')
        const checkUser = await db.review.findOne({
            where : {
                [Op.and] : [
                    {customer_id},
                    {Book_id : book_id}
                ]
            }
        })
        if(checkUser){
            const updateReview = await updateReviewService(checkUser.id, desc, num_star, customer_id, img);
            const review = await db.review.findOne({
                where : {
                    id : checkUser.id
                }
            })
            return review;
        }
        const review = await db.review.create({
            desc,
            customer_id,
            book_id,
            num_star,
            img
        })
        if(!review) return createError(400, 'Đánh giá không thành công!')
        return review;
    } catch (error) {
        return error;
    }
}
export const getBookByReview5StarService = async()=>
{
    try {
        const date = new Date();
        const month = date.getMonth() + 1;
            const reviews = await db.review.findAll({
                where:{
                    [Op.and] : [
                        { num_star: 5 },
                    ]
                },
            include : [
                {
                    model : db.book,
                    as: 'review2'
                }
            ]
          });
          
          function demReview(reviews) {
            const dem = {};
            const category = [];
            const data = []
            reviews.forEach((review) => {
              const reviewItem = review.review2.name;
          
              if (dem[reviewItem]) {
                dem[reviewItem]++;
              } else {
                dem[reviewItem] = 1;
              }
            });
            Object.keys(dem).map((reviewItem) => {
                data.push(dem[reviewItem]);
                category.push(reviewItem)
            });
          
            return {
                data,
                category
            };
          }  
          const mangReviewMoi = demReview(reviews);
          return mangReviewMoi;
          
    } catch (error) {
        return error;
    }
}
export const getReviewsByStoreService = async(store_id) =>{
    try {
        const reviews = await db.review.findAll({
            include : [
                {
                    model : db.book,
                    as : 'review2',
                    where : {store_id}
                },
                {
                    model : db.user,
                    as : 'review1',
                    attributes : {exclude : ['password']}
                },
                {
                    model : db.feedBack
                }
            ]
        })
        const numStar = reviews.length;
        let percentStar = 0;
        if(numStar !== 0){
            let total = 0;
            reviews.map((item)=>{
                total += item.num_star
            })
            console.log(total)
            percentStar = (total/numStar).toFixed(1);
        }
        if(reviews.length == 0) return createError(400, 'Không có đánh giá!');
        return {
            reviews,
            percentStar
        };
    } catch (error) {
        return error;
    }
}
export const searchReviewsByStoreService = async(id, num_star)=>{
    try {
        const reviews = await db.review.findAll({
            where : {
                num_star
            },
            include : [
                {
                    model : db.book,
                    as : 'review2',
                    where : {store_id : id}
                },
                {
                    model : db.user,
                    as : 'review1',
                    attributes : {exclude : ['password']}
                },
                {
                    model : db.feedBack
                }
            ]
        })
        if(reviews.length == 0) return createError(400, 'Không có đánh giá');
        return reviews;
    } catch (error) {
        return(error);
    }
}