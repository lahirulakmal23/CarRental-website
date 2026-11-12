import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { blogPosts } from '../assets/constance/blogPosts'

export default function BlogSection({ showAllLink = true }) {
  return (
    <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-16 md:py-20" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><BookOpen aria-hidden="true" className="h-4 w-4" /> Our Blog</p>
            <h2 id="blog-heading" className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Travel Tips & <span className="text-primary">Inspiration</span></h2>
            <p className="mt-4 text-sm text-gray-500 md:text-base">Helpful ideas for your next journey and your special occasions.</p>
          </div>
          {showAllLink && <Link to="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dull">View All Articles <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
              <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary">
                <div className="aspect-[16/10] overflow-hidden"><img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">{post.category}</p>
                  <h3 className="mt-4 text-xl font-bold leading-snug text-gray-900 group-hover:text-primary">{post.title}</h3>
                  <p className="mb-5 mt-3 text-sm leading-relaxed text-gray-500">{post.excerpt}</p>
                  <span className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-4 text-sm font-semibold text-primary">Read Article <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
