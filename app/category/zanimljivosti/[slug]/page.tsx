//import CommentComponent from "@/app/Components/Comments/CommentComponent";
//import TestAd from "@/app/Components/Adds/testAdd";
import RestComments from "@/app/components/Comments/RestApiComments";
//import SinglePost from "@/app/Components/DesktopComponents/SinglePost/SinglePost";

import { AllPostsI, getAllPosts } from "@/app/functions/queries/allPosts";
import {
  getSinglePost,
  SinglePostSourceI,
} from "@/app/functions/queries/singlePosts";
import { removeHtmlTags } from "@/app/functions/removeHtmlTags";
import { grOnlineMainPath } from "@/app/GronlineURLs/gronlineURLs";
import MobileCommentForm from "@/app/layoutType/Mobile/Components/MobileComments/MobileCommentForm";
import MobilePostSharing from "@/app/layoutType/Mobile/Components/MobileSinglePost/MobilePostSharing";
import MobileSinglePost from "@/app/layoutType/Mobile/Components/MobileSinglePost/MobileSinglePost";
import MobileSinglePostTags from "@/app/layoutType/Mobile/Components/MobileSinglePost/MobileSinglePostTags";
import { detectDevice } from "@/app/lib/detectDevice";
//import { getComments } from "@/app/libs/dbComments/dbc";

import type { Metadata } from "next";
import React, { Suspense } from "react";

export type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params)?.slug;
  const post: SinglePostSourceI = await getSinglePost(slug);

  if (post.postBy === null) {
    return {};
  }

  const {
    postBy: {
      title,
      content,
      date,
      tags: { nodes },
    },
  } = post;

  return {
    title: `${title} - Grude Online`,
    description: removeHtmlTags(content?.slice(0, 190) + " ..."),
    authors: [{ name: post?.postBy?.author?.node?.name || "Unknown" }],
    openGraph: {
      description: removeHtmlTags(content?.slice(0, 190) + " ..."),
      images: post?.postBy?.featuredImage?.node?.sourceUrl
        ? [post?.postBy?.featuredImage?.node?.sourceUrl]
        : [],
      type: "article",
      publishedTime: date,
      tags: nodes?.map((item) => item?.name) || [],
      siteName: "Grude Online",
      url: `${grOnlineMainPath}/${slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} - Grude Online`,
      description: removeHtmlTags(content?.slice(0, 190) + " ..."),
      images: post?.postBy?.featuredImage?.node?.sourceUrl
        ? [post?.postBy?.featuredImage?.node?.sourceUrl]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const {
    posts: { nodes },
  } = posts;

  return nodes
    .filter((post) => post?.slug)
    .map((post: AllPostsI) => ({
      slug: post?.slug.toString(),
    }));
}

const SingleZanimljivosti = async ({ params }: Props) => {
  const { slug } = await params;
  // const isMobile = await isMobileDevice();
  const deviceType = await detectDevice();
  const thePost = await getSinglePost(slug);

  // if (thePost.postBy === null) {
  //   return <NotFound />;
  // }

  const {
    postBy: { tags, commentStatus, postId },
  } = thePost;

  return (
    <div>
      <div className="container">
        {/* <TestAd /> */}
        {deviceType === "mobile" && (
          <Suspense
            fallback={<h1 style={{ color: "white" }}>Loading Post ...</h1>}
          >
            <MobileSinglePost post={thePost?.postBy} />
          </Suspense>
        )}

        {/* {!isMobile && <SinglePost post={thePost?.postBy} />} */}

        {deviceType && (
          <Suspense
            fallback={<h2 style={{ color: "white" }}>Loading Tags ...</h2>}
          >
            <MobileSinglePostTags tags={tags} />
          </Suspense>
        )}

        {deviceType === "mobile" && <MobilePostSharing slug={slug} />}

        {commentStatus === "open" && (
          <div className="row" style={{ padding: "0 5px" }}>
            <div className="col-md-8">
              {
                <>
                  {/* <CommentComponent
                  post={slug}
                  color={isMobile ? "white" : "black"}
                /> */}
                  <RestComments postId={Number(postId)} />
                  <MobileCommentForm slug={slug} id={postId} />
                </>
              }
            </div>
          </div>
        )}

        {/* {isMobile && (
        <Suspense
          fallback={<h2 style={{ color: "white" }}>Loading Promo ...</h2>}
        >
          <MobilePromo />
        </Suspense>
      )}
      {isMobile && (
        <Suspense
          fallback={<h2 style={{ color: "white" }}>Loading Popularno ...</h2>}
        >
          <MobilePopularno />
        </Suspense>
      )} */}
      </div>
      {/* {isMobile && <MobilePromo />} */}
    </div>
  );
};

export default SingleZanimljivosti;
