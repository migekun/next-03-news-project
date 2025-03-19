export default function ArchiveLayout({archive, latest}) {
  return (
    <div>
      <h1>Archives</h1>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latet">{latest}</section>
    </div>
  );
}