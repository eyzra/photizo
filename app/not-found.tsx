import { Button } from "@/components/Button";
import { Pathway } from "@/components/sketches";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pt-28">
      <Pathway className="pointer-events-none absolute right-[4%] top-24 hidden h-[70vh] text-navy/25 md:block" />
      <div className="container-x relative">
        <p className="eyebrow text-ink-2">Page not found</p>
        <h1 className="display-xl mt-6 text-navy">
          This path<br />leads nowhere<span className="text-orange">.</span>
        </h1>
        <p className="editorial mt-8 max-w-lg text-ink-2">The page you were looking for has moved or doesn&apos;t exist. Let&apos;s get you back to the light.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" variant="dark">Back to home</Button>
          <Button href="/contact/" variant="outline">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
