
// import fs from "fs";
import { Feed } from "feed";
import { compareDesc, parseISO } from "date-fns";
 

const getAllPosts = [
  {
    title: "Sample Blog Post 1",
    date: "2023-01-15", // Use an ISO date format (YYYY-MM-DD)
    slug: "sample-blog-post-1",
    author: "John Doe",
    coverImage: "sample-image-1.jpg",
    description: "This is the first sample blog post",
    content: "This is the first sample blog postt.",
  },
  {
    title: "Sample Blog Post 2",
    date: "2023-02-20",
    slug: "sample-blog-post-2",
    author: "Jane Smith",
    coverImage: "sample-image-2.jpg",
    description: "This is the second sample blog post",
    content: "This is the second sample blog postt.",
  },
  {
    title: "Sample Blog Post 3",
    date: "2023-02-20",
    slug: "sample-blog-post-3",
    author: "Jane Smith",
    coverImage: "sample-image-2.jpg",
    description: "This is the 3 sample blog post",
    content: "This is the 3 sample blog postt.",
  },
  // Add more sample posts as needed
];

 // Dynamically import 'fs' only on the server side
 let fs;
 if (typeof window === "undefined") {
   const fsModule = await import("fs");
   fs = fsModule.default;
 }

export default async function generateRssFeed(allPosts,logo) {

  const posts = allPosts;

  // console.log('genFeed',posts)
  // console.log('logo',logo)

  const siteURL = process.env.NEXT_PUBLIC_WEB_URL;
  const date = new Date();
  
  const feed = new Feed({
    title: process.env.NEXT_PUBLIC_TITLE,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    id: siteURL,
    link: siteURL,
    image: logo,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date, // today's date
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,  // xml format
      json: `${siteURL}/rss/feed.json`,// json fromat
    },
  });
  
  posts?.data.map((post) => {
    const url = `${siteURL}/news/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: post?.id,
      link: url,
      description: post.description,
      content: post?.image,
      date: parseISO(post.published_date),
    });
  });
 
  // fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rssfeed.xml", feed.rss2());
  fs.writeFileSync("./public/rssfeed.json", feed.json1());
}