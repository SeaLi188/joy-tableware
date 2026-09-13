export default function ProductGlassTypes({ glassTypes }: { glassTypes: string[] }) {
  if (!glassTypes.length) return null;

  return (
    <section className="border-b border-black/10 bg-paper py-16 md:py-20">
      <div className="container-site">
        <p className="eyebrow">Coordinated Service</p>
        <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,32rem)] md:items-end">
          <h2 className="display text-5xl md:text-6xl">Available Glass Types</h2>
          <p className="text-sm leading-6 text-muted">
            Catalogue-listed glass types remain grouped inside their parent collection for professional range planning.
          </p>
        </div>
        <ul className="mt-10 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {glassTypes.map((glassType) => (
            <li className="min-w-0 bg-white p-6 font-serif text-xl" key={glassType}>
              {glassType}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
