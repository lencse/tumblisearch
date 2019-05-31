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
        return Axios.get(
            `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com/info?api_key=${this.apiKey}`
        )
        .then((apiResult) => apiResult.data.response.blog.posts)
    }

    public async getPosts(blogName: string, offset: number): Promise<any> {
        return Axios.get(
            `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com/posts`
                + `?offset=${offset}&limit=50&api_key=${this.apiKey}`
        ).then((response) => response.data.response.posts.map((postData) => {
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
        }))
    }

}
