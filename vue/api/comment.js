// 引入request
import request from '@/utils/request.js';

// 获取文章或评论的评论
export const getComentList = ({
    // 评论类型
    isArticle,
    // 文章或者评论的ID
    source,
    // 做分页使用，记录最后一条ID，初次使用的时候传null
    offset = null,
    // 获取几条数据
    limit = 10
}) => {
    // a是文章的评论，c是评论的评论
    return request.get('/app/v1_0/comments', {
        params: {
            type: isArticle ? 'a' : 'c',
            source,
            offset,
            limit
        }
    });
};

// 发布评论
export const sendComment = ({
    target,
    content,
    // 当发送文章评论，不需要，设置成null
    // 当发布评论的评论，此时必须设置成文章的ID
    artId
}) => {
    return request.post('/app/v1_0/comments', {
        target,
        content,
        art_id: artId
    });
};
