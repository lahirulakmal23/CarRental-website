import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import BlogSection from '../components/BlogSection'
import Footer from '../components/Footer'
import { blogPosts } from '../assets/constance/blogPosts'

export default function Blog() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)
  return (
    <div className="pt-20">
      {!slug ? <BlogSection showAllLink={false} /> : post ? (
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
          <Link to="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" />All Articles</Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">{post.category}</p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">{post.title}</h1>
          <p className="mt-5 leading-relaxed text-gray-500">{post.excerpt}</p>
          <img src={post.image} alt="" className="my-8 aspect-video w-full rounded-2xl object-cover" />
          {post.sections.map((section) => <section key={section.title} className="mt-8"><h2 className="text-xl font-bold text-gray-900">{section.title}</h2><p className="mt-3 leading-relaxed text-gray-600">{section.text}</p></section>)}
          <Link to="/cars" className="mt-10 inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dull">Explore Our Cars</Link>
        </article>
      ) : <div className="px-6 py-20 text-center"><h1 className="text-3xl font-bold">Article not found</h1><Link to="/blog" className="mt-6 inline-block text-primary">Back to the blog</Link></div>}
      <Footer />
    </div>
  )
}
