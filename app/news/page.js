import Link from "next/link";
import {DUMMY_NEWS} from "@/dummy-news";

export default function NewsPage() {
  return (
    <>
      <h1>News page
      </h1>
      <ul className="news-list">
        {DUMMY_NEWS.map(newsItem => (
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.id}`}>
              <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
              <span>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <main>

      </main>
    </>
  )
}