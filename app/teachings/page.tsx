import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { TeachingLibrary } from "@/components/TeachingLibrary";
import { OpenBook } from "@/components/sketches";
import { Invitation } from "@/components/Invitation";

export const metadata: Metadata = {
  title: "Teachings",
  description: "Sermons, articles, audio, video and study resources from Photizo Global on faith, biblical doctrine, Christian apologetics, prayer and discipleship.",
};

export default function TeachingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Teachings and Resources"
        title="Keep learning between gatherings."
        art={<OpenBook className="w-full text-navy/25" />}
        intro={
          <p>
            Search and filter teachings on faith, biblical doctrine, Christian apologetics, prayer and spiritual formation, and discipleship.
          </p>
        }
      />
      <section aria-label="Teaching library" className="relative pb-28 md:pb-36">
        <div className="container-x">
          <Suspense fallback={<div className="h-96" />}>
            <TeachingLibrary />
          </Suspense>
        </div>
      </section>
      <Invitation
        heading="Have a question you'd like taught?"
        body="Sincere questions shape a lot of what we teach. Send us yours and we'll be glad to hear it."
      />
    </>
  );
}
