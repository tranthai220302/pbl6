import { 
    createAuthorService, 
    deleteAuthorService, 
    getAuthorsService, 
    updateAuthorService 
    } 
from "../Models/Services/AuthorService.js";
import createError from "../ultis/createError.js"

export const createAuthor = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !==4) return next(createError(400, 'Bạn không có quyền này!'));
        const data = req.body;
        const author = await createAuthorService(data.name, data.address, data.date_birth, data.date_death, req.params.id);
        if(author instanceof Error) return next(author);
        res.status(200).send(author);
    } catch (error) {
        next(error)
    }
}

export const getAuthors = async(req, res, next) =>{
    try {
        const authors = await getAuthorsService(req.params.id);
        if(authors instanceof Error) return next(authors);
        res.status(200).send(authors);
    } catch (error) {
        next(error)
    }
}
export const updateAuthor = async(req, res, next) =>{
    try {
        const id = req.params.id;
        if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        if(!id) return next(createError(400, 'Không tìm thấy'))
        const data = req.body;
        const update_author = await updateAuthorService(data.name, data.address, data.date_birth, data.date_deth, id, req.id)
        if(update_author instanceof Error) return next(update_author);
        res.status(200).send(update_author);
    } catch (error) {
        next(error)   
    }
}
export const deleteAuthor = async(req, res, next) =>{
    try {
        const id = req.params.id;
        if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        if(!id) return next(createError(400, 'Không tìm thấy tác giả!'))
        const delete_author = await deleteAuthorService(id)
        if(delete_author instanceof Error) return next(delete_author);
        res.status(200).send(delete_author);
    } catch (error) {
        next(error)
    }
}