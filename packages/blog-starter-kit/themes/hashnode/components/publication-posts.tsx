import { Waypoint } from 'react-waypoint';
import { twJoin } from 'tailwind-merge';

import { ChevronDownSVG } from './icons/svgs';
import Button from './hn-button';
import PubLoaderComponent from './pub-loader-component';

import { PageInfo, Preferences, RequiredPublicationFieldsFragment, PostThumbnailFragment } from '../generated/graphql';


import BlogPostPreview from './blog-post-preview';

export type RequiredPublicationProps = Pick<RequiredPublicationFieldsFragment, 'features' | 'isTeam'> & {
  preferences: Pick<Preferences, 'layout'>;
};

const PublicationPosts = (props: {
  posts: {
    edges: Array<{
      cursor: string;
      node: PostThumbnailFragment;
    }>;
    pageInfo: Pick<PageInfo, 'hasNextPage' | 'endCursor'>;
  };
  publication: RequiredPublicationProps;
  pinnedPostId?: string;
  fetchMore: () => void;
  fetching: boolean;
  fetchedOnce: boolean;
}) => {
  const { posts, publication, pinnedPostId, fetchMore, fetching, fetchedOnce } = props;
  const { edges, pageInfo } = posts;
  const {
    preferences: { layout },
  } = publication;

  return (
    <div className="projects-section py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="projects-grid">
          {edges.map(({ node }, index) => (
            <a key={node.id} href={`/${node.slug}`}>
              <article className="project-item brand-card group cursor-pointer" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="project-content">
                  <div className="project-header">
                    <span className="project-date">
                      {new Date(node.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="project-title">
                    {node.title}
                  </h3>
                  
                  <p className="project-description">
                    {node.brief}
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
          {fetching && Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="project-item brand-card animate-pulse">
              <div className="project-content">
                <div className="project-header">
                  <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          ))}
        </div>
        {pageInfo.hasNextPage && !fetchedOnce && !fetching ? (
          <div className="text-center mt-12">
            <Button
              type="button"
              variant="transparent"
              className="btn-primary view-all-btn"
              onClick={fetchMore}
            >
              <span>Load more</span>
              <ChevronDownSVG className="ml-3 h-5 w-5 fill-current" />
            </Button>
          </div>
        ) : null}
      </div>
      {fetchedOnce && pageInfo.hasNextPage ? <Waypoint onEnter={fetchMore} topOffset="-20%" /> : null}
      {fetchedOnce && !pageInfo.hasNextPage ? (
        <div className="blog-posts-end-card mt-10 px-16 py-8 text-center font-heading font-bold text-slate-700 dark:text-slate-300">
          <p className="text-2xl">You&apos;ve reached the end! 👋</p>
        </div>
      ) : null}
    </div>
  );
};

export default PublicationPosts;
