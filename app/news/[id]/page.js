export default function NewsDetailPage({params}) {
  const newsId = params.id;
  return <>
    <h1>Details page</h1>
    {newsId}
  </>
}