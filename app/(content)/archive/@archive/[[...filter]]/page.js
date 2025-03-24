import { Suspense } from "react";
import Link from "next/link";
import NewsList from "@/components/news-list";
import {
  getAllNews,
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth
} from "@/lib/news";

async function FilterHeader({year, month}) {
  const availableNewsYears = await getAvailableNewsYears();
  let links = availableNewsYears;

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  if (
    (year && !availableNewsYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))) {
    throw new Error('Invalid filter.')
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          { links.map(link => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>)
          })}
        </ul>
      </nav>
    </header>
  )
}
async function FilteredNews({year, month}) {
  let news = await getAllNews();
  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }
  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news}/>;
  }

  return newsContent;
}

export default async function FilteredNewsPage({params}){
  const filter = params.filter;

  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];


  return (
    <>
      <Suspense fallback={<p>Loading header...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth}/>
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth}/>
      </Suspense>
  </>
  );
}