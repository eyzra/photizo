import { HeroSequence } from "@/components/home/HeroSequence";
import { Purpose } from "@/components/home/Purpose";
import { PillarsSequence } from "@/components/home/PillarsSequence";
import { TeachingEmphasis } from "@/components/home/TeachingEmphasis";
import { DNA } from "@/components/home/DNA";
import { ImmersionFeature } from "@/components/home/ImmersionFeature";
import { Expressions } from "@/components/home/Expressions";
import { Resources } from "@/components/home/Resources";
import { Invitation } from "@/components/Invitation";
import { Moments } from "@/components/home/Moments";
import { NationsVideo } from "@/components/NationsVideo";
import { Quotes } from "@/components/Quotes";

export default function HomePage() {
  return (
    <>
      <HeroSequence />
      <PillarsSequence />
      <Purpose />
      <Moments />
      <TeachingEmphasis />
      <Quotes />
      <DNA />
      <NationsVideo />
      <ImmersionFeature />
      <Expressions />
      <Resources />
      <Invitation />
    </>
  );
}
