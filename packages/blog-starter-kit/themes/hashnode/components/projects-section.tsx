import { twJoin } from 'tailwind-merge';
import Link from 'next/link';
import { Publication } from '../generated/graphql';

type Props = {
  posts: any[];
  publication: Publication;
};

export const ProjectsSection = ({ posts, publication }: Props) => {
  const displayedPosts = posts.slice(0, 6);
  const hasMorePosts = posts.length > 6;

  return (
    <section className="projects-section py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my latest work, tutorials, and insights in web development and technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post, index) => (
            <Link key={post.id} href={`/${post.slug}`}>
              <article className="project-card brand-card group cursor-pointer h-full" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {post.tags?.slice(0, 2).map((tag: any) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 text-xs font-medium bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.brief}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    
                    <div className="flex items-center text-brand-600 dark:text-brand-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {hasMorePosts && (
          <div className="text-center mt-12">
            <Link href="/" className="btn-primary inline-flex items-center gap-2 px-8 py-3 group">
              View All Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};