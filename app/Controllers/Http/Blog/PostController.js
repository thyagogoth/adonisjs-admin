'use strict'

const Category = use('App/Models/Blog/BlogCategory')
const Post = use('App/Models/Blog/BlogPost')

/**
 * Resourceful controller for interacting with blog_posts
 */
class PostController {

    async index({ view }) {
		let posts = await Post.all()
        posts = posts.toJSON()

		return view.render('blog.posts.list', { posts })
    }

    async showCreateForm({ view }) {
        let categories = await Category.all()
        categories = categories.toJSON()
		return view.render('blog.posts.new', { categories })
	}

    // store() {

    // }


    // update() {

    // }

}


module.exports = PostController
