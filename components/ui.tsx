import Link from "next/link";

export function SectionTitle({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="display text-5xl md:text-6xl">{title}</h2>
      {text && <p className="mt-5 leading-7 text-muted">{text}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="bg-ivory pb-20 pt-40 text-center">
      <div className="container-site">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="display mx-auto max-w-4xl text-6xl md:text-8xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl leading-7 text-muted">{text}</p>
      </div>
    </section>
  );
}

export function InquiryCTA() {
  return (
    <section className="bg-sand py-24 text-center">
      <div className="container-site">
        <p className="eyebrow mb-4">Start a conversation</p>
        <h2 className="display text-5xl md:text-6xl">
          Looking for Tableware for
          <br className="hidden md:block" /> Your Next Collection?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted">
          Tell us what you are looking for. Our team will help with product selection, customization
          and wholesale quotations.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link className="btn btn-dark" href="/contact">Request a Quote</Link>
          <Link className="btn btn-outline" href="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
