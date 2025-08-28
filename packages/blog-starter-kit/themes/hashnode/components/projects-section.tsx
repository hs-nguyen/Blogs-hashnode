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
                onClick={(e: any) => {
                  e.currentTarget.classList.add('project-clicked');
                }}
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
                    <div className="project-link">
                      <span>View Project</span>
                      <svg className="project-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
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