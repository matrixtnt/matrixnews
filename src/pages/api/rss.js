// import fs from "fs";
import { Feed } from "feed"; 
export default async function generateRssFeed(allPosts) {

  if (typeof window === "undefined") {
    const fs = require("fs"); // require 'fs' only on the server-side
    
    // rest of your code that uses fs
  }
  

    // console.log('allPostsInGen',allPosts)

  const siteURL = process.env.NEXT_PUBLIC_WEB_URL? process.env.NEXT_PUBLIC_WEB_URL : "http://localhost:3000";

  const date = new Date();

  const posts = allPosts;

  
  const feed = new Feed({
    title: "Your Blog name",
    description: "Your Blog description",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date, // today's date
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,  // xml format
      json: `${siteURL}/rss/feed.json`,// json fromat
    },
  });
  
  posts.map((post) => {
    const url = `${siteURL}/news/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: post?.id,
      link: url,
      description: post.description,
      category: post.category?.category_name,
      date: parseISO(post.published_date),
    });
  });
 
  // fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rssfeed.xml", feed.rss2());
  fs.writeFileSync("./public/rssfeed.json", feed.json1());
}