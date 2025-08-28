import Link from 'next/link';
import { Publication } from '../generated/graphql';

type Props = {
  posts: any[];
  publication: Publication;
};

export const ProjectsSection = ({ posts, publication }: Props) => {
  const displayedPosts = posts.slice(0, 100);
  const hasMorePosts = posts.length > 100;

  return (
    <section className="projects-section py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Technical Projects List
          </h2>
        </div>
        
        <div className="projects-grid">
          {displayedPosts.map((post, index) => (
            <a key={post.id} href={`/${post.slug}`}>
              <article 
                className="project-item brand-card group cursor-pointer" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="project-content">
                  <div className="project-header">
                    <div className="project-tags">
                      {post.tags?.slice(0, 2).map((tag: any) => (
                        <span key={tag.id} className="project-tag">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <span className="project-date">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="project-title">
                    {post.title}
                  </h3>
                  
                  <p className="project-description">
                    {post.brief}
                  </p>
                  
                  <div className="project-footer">
                    <div className="flex justify-between items-center">
                      <div className="project-link">
                        <span>View Project</span>
                        <svg className="project-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <a 
                        href={`https://github.com/hs-nguyen/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-code-link flex items-center gap-1 text-gray-600 hover:text-brand-500 transition-colors"
                        onClick={(e: any) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="text-sm">Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
        
        {hasMorePosts && (
          <div className="projects-more">
            <Link href="/" className="btn-primary view-all-btn">
              <span>View All Projects</span>
              <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};