import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { SCALARS } from '../dic/params'
import Axios from 'axios'

@injectable()
export default class Tumblr {

    constructor(
        @inject(SCALARS.Tumblr.apiKey) private apiKey: string
    ) {}

    public async getPostCount(blogName: string): Promise<number> {
        const url = [
            `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com/info`,
            `?api_key=${this.apiKey}`
        ].join('')
        const apiResult = await Axios.get(url)
        return apiResult.data.response.blog.posts
    }

    public async getPosts(blogName: string, offset: number, postCount: number): Promise<any> {
        const url = [
            `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com/posts`,
            `?offset=${offset}&limit=${postCount}&api_key=${this.apiKey}`
        ].join('')
        const apiResult = await Axios.get(url)
        return apiResult.data.response.posts.map((postData) => {
            if ('text' === postData.type) {
                return {
                    url: postData.post_url,
                    text: postData.body
                }
            }
            return {
                url: '',
                text: ''
            }
        })
    }

}
