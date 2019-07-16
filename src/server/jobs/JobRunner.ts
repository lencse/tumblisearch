import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { range } from 'lodash'
import * as striptags from 'striptags'
import Tumblr from '../tumblr-api/Tumblr'
import { TYPES, SCALARS } from '../dic/params'
import JobSaver from './JobSaver'
import FetchPosts from './FetchPosts'
import BlogInfo from './BlogInfo'

@injectable()
export default class JobRunner {

    constructor(
        @inject(SCALARS.JobRunner.fetchPostCount) private fetchPostCount: number,
        @inject(Tumblr) private tumblr: Tumblr,
        @inject(TYPES.JobSaver) private jobSaver: JobSaver
    ) {}

    public async getBlogInfo(job: BlogInfo): Promise<void> {
        const postCount = await this.tumblr.getPostCount(job.search.params.blogName)
        const slices = Math.floor(postCount / this.fetchPostCount) + 1
        const offsets = range(0, slices).map((slice) => slice * this.fetchPostCount)
        offsets.forEach(async (offset) => {
            const fetchPostjob = new FetchPosts(job.search, offset, this.fetchPostCount)
            await this.jobSaver.saveJob(fetchPostjob.data)
        })
    }

    public async fetchPosts(job: FetchPosts): Promise<void> {
        const apiResult = await this.tumblr.getPosts(
            job.search.params.blogName,
            job.params.offset,
            job.params.postCount
        )
        const posts = apiResult.map((pd) => {
            return {
                url: pd.url,
                text: striptags(pd.text).replace(/\s+/gm, ' ')
            }
        }).filter((norm) => norm.text.match(job.params.searchText))
        console.info(posts)
    }

}
