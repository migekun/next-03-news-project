'use client';

import {useEffect, useState } from 'react';
import NewsList from '@/components/news-list';

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()
  const [news, setNews] = useState([])

  useEffect(() => {
    alert('useEffect')
    async function fetchNews() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/news');
      if (!response.ok) {
        setError('Could not fetch news.');
        setIsLoading(false);
      }
      const news = await response.json();
      setIsLoading(false);
      setNews(news);
    }
    fetchNews();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error)  {
    return <p>{error}</p>
  }

  let newsContext;
  if (news) {
    newsContext = <NewsList news={news} />
  }
  return (
    <>
      <h1>News Page</h1>
      {newsContext}
    </>
  );
}