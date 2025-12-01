var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((acc, item) => acc + item.likes, 0)
    return total
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0){
        return {}
    }
    const maxItem = blogs.reduce((max, item) => {
        return item.likes > max.likes ? item : max;
    },blogs[0]);
    return {
        "title": maxItem.title,
        "author": maxItem.author,
        "likes": maxItem.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return {}
    }
    const authors = blogs.map((x)=>x.author)
    
    const countByAuthors = _.countBy(authors)
    const toPairsAuthors = _.toPairs(countByAuthors)
    const maxByAuthor = _.maxBy(toPairsAuthors, 1)
    

    return {
        "author": maxByAuthor[0],
        "blogs": maxByAuthor[1]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return {}
    }
    const authors = blogs.map((x)=>x.author)
    const uniqueAuthors = _.uniq(authors)
    
    
    
    const likesByAuthor = uniqueAuthors.map((author)=>{
        let likes = 0
        blogs.map((blog)=>{
            if (author === blog.author){
                likes += blog.likes
            }
        })
        return [author, likes]
    })

    const mostLikedAuthor = _.maxBy(likesByAuthor,1)

    return {
        author: mostLikedAuthor[0],
        likes: mostLikedAuthor[1]
    }
    
}



module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}