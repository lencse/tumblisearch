import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { range } from 'lodash'
import * as striptags from 'striptags'
import Tumblr from '../tumblr-api/Tumblr'
import { TYPES } from '../dic/params'
import JobSaver from './JobSaver'
import FetchPosts from './FetchPosts'
import BlogInfo from './BlogInfo'

@injectable()
export default class JobRunner {

    constructor(
        @inject(Tumblr) private tumblr: Tumblr,
        @inject(TYPES.JobSaver) private jobSaver: JobSaver
    ) {}

    public async getBlogInfo(job: BlogInfo): Promise<void> {
        const offsets = await this.tumblr.getPostCount(job.getSearch().params.blogName)
            .then((postCount) => Math.floor(postCount / 50))
            .then((slices) => range(0, slices).map((slice) => slice * 50))

        offsets.forEach(async (offset) => {
            await this.jobSaver.saveJob(new FetchPosts(job.getSearch(), offset).data())
        })
    }

    public async fetchPosts(job: FetchPosts): Promise<void> {
        const apiResult = await this.tumblr.getPosts(
            job.getSearch().params.blogName,
            job.getParams().offset
        )
        const posts = apiResult.map((pd) => {
            return {
                url: pd.url,
                text: striptags(pd.text).replace(/\s+/gm, ' ')
            }
        }).filter((norm) => norm.text.match(job.getParams().searchText))
        console.info(posts)
    }

}
