import { injectable } from 'inversify'
import 'reflect-metadata'
import Job from './Job'
import JobData from './JobData'
import BlogInfo from './BlogInfo'
import FetchPosts from './FetchPosts'

@injectable()
export default class JobFactory {

    public createJob(jobData: JobData): Job {
        if ('blog_info' === jobData.jobType) {
            return new BlogInfo({
                id: jobData.searchId,
                params: jobData.searchParams
            })
        }
        if ('fetch_posts' === jobData.jobType) {
            return new FetchPosts(
                {
                    id: jobData.searchId,
                    params: jobData.searchParams
                },
                jobData.params.offset,
                jobData.params.postCount
            )
        }
        throw new Error(`Invalid job type: '${jobData.jobType}'`)
    }

}
