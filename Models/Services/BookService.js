import createError from "../../ultis/createError.js";
import sendEmail from "../../ultis/sendEmail.js";
import db from "../Entitys/index.js";
import { Op, where } from 'sequelize';
import Sequelize from "sequelize";
export const createBookService = async (store_id, name, desc, price, sales_number, publication_date, author_id, categorys, images, nhaXB, languages, weight, size, numPage,percentDiscount) =>{
    try {
        const checkBook = await db.book.findOne({
            where : {
                name,
            }
        })
        if(checkBook) return createError(400, 'Sách này đã tồn tại!')
        const book = await db.book.create({
            name,
            desc,
            price,
            sales_number,
            publication_date,
            store_id,
            author_id,
            nhaXB,
            languages,
            weight,
            size,
            numPage,
            percentDiscount
        })
        if(!book) return createError(400, 'Thêm sách không thành công!')
          for (const image of images) {
            const newImage = await db.image.create({
              filename: image,
            });
            await book.addImage(newImage)
          }
        await book.addCategory(categorys);
        await book.save()
        return book;
    } catch (error) {
        return createError(error.status, error.message);        
    }
}
export const deleteBookService = async (id) =>{
    try {
        if(!id) return createError(400, 'Không tìm thấy sách!')
        const deleteBook = await db.book.destroy({
            where : {id}
        })
        if(!deleteBook) return createError(400, 'Xoá sách không thành công!')
        return {
            status: true,
            message: 'Xoá sách thành công!'
        };
    } catch (error) {
        return error;
    }
}
export const updateBookService = async(id, name, desc, price, sales_number, publication_date, author_id, categorys) =>{
    try {
        if(!id) return createError(400, 'Không tìm thấy sách!')
        const update_book = await db.book.update({
            name,
            desc,
            price,
            sales_number,
            publication_date,
            author_id   
        },{ where : {id}})
        const book = await db.book.findByPk(id)
        await book.setCategories(categorys);
        await book.save();
        if(update_book[0] == 0) return createError(400, 'Update không thành công!')
        return {
            status: true,
            message: 'update thành công !'
        }
    } catch (error) {
        return error;
    }
}
export const getBokByArrId = async(id) =>{
    try {
        const books = await db.book.findAll({
            include : [
                {
                    model : db.category,
                },
                {
                    model : db.author
                },
                {
                    model : db.image
                },
                {
                    model : db.user,
                    include : [
                        {
                            model : db.storeRequest,
                            as : "DetailStore"
                        }
                    ]
                }
            ], 
            where : {
                id : id
            } 
        });
        if(!books) return createError(400, 'Không có sách!');
        console.log(books)
        return books;
    } catch (error) {
        return error;
    }
}
export const getBooksService = async(id) =>{
    try {
        console.log(id)
        if(!id){
            const books = await db.book.findAll({
                include : [
                    {
                        model : db.category,
                    },
                    {
                        model : db.author
                    },
                    {
                        model : db.image
                    },
                    {
                        model : db.user,
                        include : [
                            {
                                model : db.storeRequest,
                                as : "DetailStore"
                            }
                        ]
                    }
                ]   
            });
            if(!books) return createError(400, 'Không có sách!');
            return books;
        }else{
            const books = await db.book.findAll({
                include : [
                    {
                        model : db.category,
                    },
                    {
                        model : db.author
                    },
                    {
                        model : db.image
                    },
                    {
                        model : db.user,
                        include : [
                            {
                                model : db.storeRequest,
                                as : "DetailStore"
                            }
                        ]
                    }
                ], 
                where : {
                    id : id
                } 
            });
            if(!books) return createError(400, 'Không có sách!');
            return books;
        }
    } catch (error) {
        return error;
    }
} 
export const getBookByQueryService = async(filter, category, author, page, bookPerPage) =>{
    try {
        if(!page){
            console.log('cc')
            const booksByQuery = await db.book.findAll({
                include : [
                    {
                        model : db.category,
                        where : category
                    },
                    {
                        model : db.author,
                        where : author
                    },
                    {
                        model : db.image
                    },
                    {
                        model : db.user,
                        include : [
                            {
                                model : db.storeRequest,
                                as : "DetailStore"
                            }
                        ]
                    }
                ] ,  
                
                where : {
                    [Op.and] : [filter]
                }
            });
            
            if (!booksByQuery || booksByQuery.length === 0) {
                return createError(400, "Không tìm thấy sách!");
            }
            
            return booksByQuery;
        }else{
            const offset = (page - 1)*bookPerPage;
            const booksByQuery = await db.book.findAll({
                include : [
                    {
                        model : db.category,
                        where : category
                    },
                    {
                        model : db.author,
                        where : author
                    },
                    {
                        model : db.image
                    },
                    {
                        model : db.user,
                        include : [
                            {
                                model : db.storeRequest,
                                as : "DetailStore"
                            }
                        ]
                    }
                ] ,  
                
                where : {
                    [Op.and] : [filter]
                },
                limit : bookPerPage,
                offset : offset
            });
            const count = await db.book.findAll({
                include : [
                    {
                        model : db.category,
                        where : category
                    },
                    {
                        model : db.author,
                        where : author
                    },
                    {
                        model : db.image
                    },
                    {
                        model : db.user,
                        include : [
                            {
                                model : db.storeRequest,
                                as : "DetailStore"
                            }
                        ]
                    }
                ] ,  
                
                where : {
                    [Op.and] : [filter]
                },
            });
            console.log(bookPerPage)
            console.log(count.length)
            console.log(count.length)
            const numpage = Math.ceil(count.length/bookPerPage)
            if (!booksByQuery || booksByQuery.length === 0) {
                return createError(400, "Không tìm thấy sách!");
            }
            
            return {
                booksByQuery,
                numpage
            }
        }
    } catch (error) {
        return error;
    }
}
export const getBookByIdService = async(id) =>{
    try {
        const book = await db.book.findOne({
            where : {id},
            include : [
                {
                    model : db.category,
                },
                {
                    model : db.author
                },
                {
                    model : db.image
                },
                {
                    model : db.user,
                    include : [
                        {
                            model : db.storeRequest,
                            as : "DetailStore"
                        }
                    ]
                }
            ]   
        })
        if(!book) return createError(400, 'Không có sách!')
        return book;
    } catch (error) {
        return error;
    }
}   
export const getBookByStoreService = async(id, name, page, bookPerPage = 16)=>{
    try {
        if(!page){
            const book = await db.book.findAll({
                where: {
                    [Op.and] : [
                        {store_id : id},
                    ]
                },
                include : [
                    {
                        model : db.category,
                    },
                    {
                        model : db.author
                    },
                    {
                        model : db.image
                    },
                    {
                        model : db.user,
                        include : [
                            {
                                model : db.storeRequest,
                                as : "DetailStore"
                            }
                        ]
                    }
                ]   
            })
            if(book.length == 0) return createError(400, 'Không có sách!')
            return book;
        }else {
            const offset = (page - 1)*bookPerPage;
            const book = await db.book.findAll({
                where: {
                    [Op.and] : [
                        {store_id : id},
                    ]
                },
                include : [
                    {
                        model : db.category,
                    },
                    {
                        model : db.author
                    },
                    {
                        model : db.image
                    },
                    {
                        model : db.user,
                        include : [
                            {
                                model : db.storeRequest,
                                as : "DetailStore"
                            }
                        ]
                    }
                ],
                limit : bookPerPage,
                offset : offset   
            })
            const count = await db.book.count({
                where : {
                    store_id : id,
                }
            })
            const numpage = Math.ceil(count/15)
            if(book.length == 0) return createError(400, 'Không có sách!')
            return {
                book,
                numpage
            };
        }
    } catch (error) {
        return error;
    }
}
export const getBookByOrderHighService = async() =>{
    try {
        const date = new Date();
        const month = date.getMonth() + 1;
        const reviews = await db.order.findAll({
            where: {
                [Op.and] : [
                    {isPayment : true},
                ]
            },
            
            include : [
                {
                    model : db.book,
                }
            ]
        });
            
        function demReview(reviews) {
            const dem = {};
            const category = [];
            const data = []
            reviews.forEach((review) => {
                const reviewItem = review.Book?.name;
            
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
export const getBookIsOrderByStoreService = async(store_id, isHigh) => {
    try {
        const orders = await db.order.findAll({
            where : {
                [Op.and] : [
                    {store_id},
                    {isPayment : true}
                ]
            },
            include : [
                {
                    model : db.book,
                }
            ]
        })
        const ob = {}
        const book = {}
        orders.map((item)=>{
            ob[item.Book.name] = ob[item.Book.name] ? ob[item.Book.name] + 1: 1;
            book[""]
        })
        if(isHigh == 1){
            const filteredOb = Object.fromEntries(
                Object.entries(ob).filter(([key, value]) => value > 3)
            );
            const nameBook = Object.keys(filteredOb);
            const data = Object.values(filteredOb);
            return {
                nameBook,
                data
            }
        }
        const nameBook = Object.keys(ob);
        const data = Object.values(ob);
        return {
            nameBook,
            data,
        };
    } catch (error) {
        return error;
    }
}
export const getBookBoughtHighService = async() =>{
    try {
        const book = await db.book.findAll({
                order: [['purchases', 'DESC']],
                limit: 10
        })
        return book;
    } catch (error) {
        return error;
    }
}
export const getBookFlashSaleService = async(time, date) =>{
    console.log(date)
    try {
        if(!time) return createError(400, 'Không tìm thấy thời gian Flash Sale')
        const book = await db.book.findAll({
            where : {
                [Op.and] : [
                    {isFlashSale : 1},
                    {timeFlashSale : "9h-11h"},
                    Sequelize.literal(`DATE(dateFlashSale) = '${date.toISOString().split('T')[0]}'`)
                ]
            },
            include : [
                {
                    model : db.category,
                },
                {
                    model : db.author
                },
                {
                    model : db.image
                },
                {
                    model : db.user,
                    include : [
                        {
                            model : db.storeRequest,
                            as : "DetailStore"
                        }
                    ]
                }
            ]
        })
        if(book.length == 0) return createError(400, 'Sự kiện Flash Sale không có sách !');
        return book;
    } catch (error) {
        return error;
    }
}
export const registerBookFlashSaleSeervice = async(store_id, time, id, date) =>{
    try {
        if(!time) return createError(400, 'Không tìm thấy thời gian sự kiện !')
        console.log(date)
        const currentDate = new Date();
        const hours = currentDate.getHours();
        const data = new Date(date)
        if(data < currentDate) return createError(400, 'Vui lòng chọn ngày lớn hơn thời gian hiện tại!')
        if(hours >=9 && hours <=11 && data == currentDate) return createError(400, 'Sự kiện đang diễn ra, không thể đăng ký được')
        const checkBook = await db.book.findAll({
            where : {
                [Op.and] : [
                    { timeFlashSale: time }, 
                    {isFlashSale : 1},
                    {id : id},
                    Sequelize.literal(`DATE(dateFlashSale) >= '${currentDate.toISOString().split('T')[0]}'`)
                ]
            }
        })
        if(checkBook.length > 0) return createError(400, 'Sách này đã được đăng ký rồi!')
        const checkBook1 = await db.book.findAll({
            where : {
                [Op.and] : [
                    { timeFlashSale: time }, 
                    {isFlashSale : 0},
                ]
            }
        })
        if(checkBook1.length > 0) return createError(400, 'Yêu cầu của bạn đang chờ admin phê duyệt!')
        const updateBook = await db.book.update(
            {
                timeFlashSale : time,
                dateFlashSale : data
            },
            {
                where : {
                    [Op.and] : [
                        {store_id},
                        {id : id}

                    ]
                }
            }
        )
        if(updateBook[0] === 0) return createError(400, 'Cập nhật không thành công!');
        return {
            message : 'Đăng ký sự kiện Flash Sale thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const confirmBookFlashSaleService = async(store_id, id) =>{
    try {
        const updateBook = await db.book.update(
            {
                isFlashSale : 1
            },
            {
                where : {
                    [Op.and] : [
                        {store_id},
                        {id : id}
                    ]
                }
            }
        )
        if(updateBook[0] == 0) return createError(400, 'Xác nhận không thành công!');
        return {
            message : 'Xác nhận thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const cancelBookFSService = async(store_id, id) =>{
    try {
        const updateBook = await db.book.update(
            {
                timeFlashSale : 0,
                dateFlashSale : null
            },
            {
                where : {
                    [Op.and] : [
                        {store_id},
                        {id : id}
                    ]
                }
            }
        )
        if(updateBook[0] == 0) return createError(400, 'Xác nhận không thành công!');
        return {
            message : 'Xác nhận thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const getStoreFlashSaleService = async(date)=>{
    try {
        console.log(date)
        const data = new Date(date)
        const user = await db.user.findAll({
            include : [
                {
                    model : db.book,
                    where : {
                        [Op.and] : [
                            {isFlashSale : 0},
                            Sequelize.literal(`DATE(dateFlashSale) = '${data.toISOString().split('T')[0]}'`)
                        ]
                    }
                },
                {
                    model : db.storeRequest,
                    as : 'DetailStore'
                },
            ]
        })
        if(user.length === 0) return createError(400, 'Không có cửa hàng đăng ký sự kiện ')
        return user;
    } catch (error) {
        return error;
    }
}
export const getBookFlashSaleByStoreService = async(id, date, isFlashSale)=>{
    try {
        const data = new Date(date)
        if(!isFlashSale){
            const book = await db.book.findAll({
                where : {
                    [Op.and] : [
                        {isFlashSale : 0},
                        Sequelize.literal(`DATE(dateFlashSale) = '${data.toISOString().split('T')[0]}'`),
                        {store_id : id}
                    ]
                },
                include : [
                    {
                        model : db.image
                    }
                ]
            })
            if(book.length == 0) return createError(400, 'Không có danh sách!')
            return book;
        }else{
            const book = await db.book.findAll({
                where : {
                    [Op.and] : [
                        {isFlashSale : 1},
                        {store_id : id}
                    ]
                },
                include : [
                    {
                        model : db.image
                    }
                ]
            })
            if(book.length == 0) return createError(400, 'Không có danh sách!')
            return book;
        }
    } catch (error) {
        return error;   
    }
}
export const getBookNoFlashSaleByStoreService = async(id)=>{
    try {
        const book = await db.book.findAll({
            where : {
                [Op.and] : [
                    {isFlashSale : 0},
                    {store_id : id},
                    {timeFlashSale : 0}
                ]
            },
            include : [
                {
                    model : db.image
                }
            ]
        })
        if(book.length == 0) return createError(400, 'Không có danh sách!')
        return book;
    } catch (error) {
        return error;   
    }
}
export const getBookWaitConfirmFlashSaleService = async(idStore) =>{
    try {
        const book = await db.book.findAll({
            where : {
                [Op.and] : [
                    {store_id : idStore},
                    {isFlashSale : 0}
                ]
            }
        })   
        if(book.length === 0) return createError(400, 'Không có sách!')  
        return book;   
    } catch (error) {
        return error
    }
}
export const getNhaXBService = async()=>{
    try {
        const uniquePublishers = await db.book.findAll({
            where : {
                nhaXB : {
                    [Op.not] : null
                }
            },
            attributes: [
              [Sequelize.fn('DISTINCT', Sequelize.col('nhaXB')), 'nhaXB'],
            ],
            raw: true,
        });
        const arrNXB = [];
        uniquePublishers.map((item)=>{
            arrNXB.push(item.nhaXB)
        })
        return arrNXB;
    } catch (error) {
        return error;
    }
}
export const getLanguagesService = async() =>{
    try {
        const languages = await db.book.findAll({
            where : {
                languages : {
                    [Op.not] : null,
                }
            },
            attributes : [
                [Sequelize.fn('DISTINCT',Sequelize.col('languages')), 'languages']
            ]
        })
        const arrLan = [];
        languages.map((item) =>{
            arrLan.push(item.languages)
        })
        return arrLan;
    } catch (error) {
        return error;
    }
}
export const getAuthorSearchServices = async() => {
    try {
        const authors = await db.author.findAll({
            attributes : [
                [Sequelize.fn('DISTINCT',Sequelize.col('name')), 'name']
            ]
        })
        const arrAuthor = [];
        authors.map((item)=>{
            arrAuthor.push(item.name)
        })
        return arrAuthor;
    } catch (error) {
        return error;
    }
}
