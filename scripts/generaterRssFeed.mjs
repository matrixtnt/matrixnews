"use client"
import fs from "fs";
import { Feed } from "feed";
import { compareDesc, parseISO } from "date-fns";
 

const getAllPosts = [
  {
    title: "Sample Blog Post 1",
    date: "2023-01-15", // Use an ISO date format (YYYY-MM-DD)
    slug: "sample-blog-post-1",
    author: "John Doe",
    coverImage: "sample-image-1.jpg",
    excerpt: "This is the first sample blog post.",
  },
  {
    title: "Sample Blog Post 2",
    date: "2023-02-20",
    slug: "sample-blog-post-2",
    author: "Jane Smith",
    coverImage: "sample-image-2.jpg",
    excerpt: "This is the second sample blog post.",
  },
  // Add more sample posts as needed
];

export default async function generateRssFeed() {
  const posts = getAllPosts;
  const siteURL = process.env.NEXT_PUBLIC_WEB_URL;
  const date = new Date();
  const author = {
    name: "John Doe",
    email: "example@gmail.com",
    link: "https://twitter.com/<username>",
  };
  
  const feed = new Feed({
    title: "Your Blog name",
    description: "Your Blog description",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date, // today's date
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,  // xml format
      json: `${siteURL}/rss/feed.json`,// json fromat
    },
    author,
  });
  
  posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.excerpt,
      author: [author],
      contributor: [author],
      date: parseISO(post.date),
    });
  });
 
  // fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rssfeed.xml", feed.rss2());
  fs.writeFileSync("./public/rssfeed.json", feed.json1());
}