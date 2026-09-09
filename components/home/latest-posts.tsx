import { getPosts } from '@/lib/blog'
import { BlogCard } from '@/components/blog-card'
import { Cta } from '@/components/cta'
export async function LatestPosts(){const {posts}=await getPosts({limit:3});if(!posts.length)return null;return <section className="bg-white py-20 lg:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-12 flex items-end justify-between gap-6"><div><p className="eyebrow text-orange">Latest from our blog</p><h2 className="display-lg mt-4 font-bold text-navy">Ideas, activity and company news.</h2></div><Cta href="/blog" variant="outline" className="hidden sm:inline-flex">See all posts</Cta></div><div className="grid gap-6 md:grid-cols-3">{posts.map(post=><BlogCard key={post.id} post={post}/>)}</div></div></section>}
