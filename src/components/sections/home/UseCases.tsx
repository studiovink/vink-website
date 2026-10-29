import { ScatteredCards, type ScatterCard, type ScatterTile } from "@/components/interactive/ScatteredCards";
import { MediaSlot } from "@/components/media/MediaSlot";
import { useCases } from "@/content/home";

const cardLayout: Pick<ScatterCard, "tone" | "pos">[] = [
  { tone: "white", pos: { top: "3%", left: "2%", rotate: -8 } },
  { tone: "burgundy", pos: { top: "6%", right: "2%", rotate: 7 } },
  { tone: "rose", pos: { top: "38%", left: "0%", rotate: 4 } },
  { tone: "white", pos: { top: "42%", right: "0%", rotate: -5 } },
  { tone: "burgundy", pos: { top: "74%", left: "4%", rotate: -3 } },
  { tone: "rose", pos: { top: "76%", right: "4%", rotate: 6 } },
];

const tiles: ScatterTile[] = [
  { key: "t1", media: <MediaSlot id="usecases.1" quiet sizes="10rem" />, pos: { top: "4%", left: "36%", rotate: -10 } },
  { key: "t2", media: <MediaSlot id="usecases.2" quiet sizes="10rem" />, pos: { top: "9%", right: "36%", rotate: 12 } },
  { key: "t3", media: <MediaSlot id="usecases.3" quiet sizes="10rem" />, pos: { top: "80%", left: "38%", rotate: -14 } },
  { key: "t4", media: <MediaSlot id="usecases.4" quiet sizes="10rem" />, pos: { top: "76%", right: "37%", rotate: 9 } },
];

export function UseCases() {
  const cards: ScatterCard[] = useCases.items.map((item, i) => ({
    key: item.who,
    ...cardLayout[i],
    content: (
      <>
        <p className="display text-3xl leading-none">“{item.who}”</p>
        <p className="mt-3 text-base leading-snug opacity-85">{item.what}</p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] opacity-60">Podría necesitar</p>
      </>
    ),
  }));

  return (
    <section className="overflow-hidden bg-cream-deep py-24 md:py-32">
      <ScatteredCards
        cards={cards}
        tiles={tiles}
        center={
          <div>
            <p className="label text-charcoal">{useCases.label}</p>
            <h2 className="display mt-4 text-[clamp(2.5rem,1rem+4.6vw,5.5rem)] leading-[0.92] text-charcoal">
              {useCases.title[0]} <span className="text-burgundy">{useCases.title[1]}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm text-charcoal-soft">{useCases.note}</p>
          </div>
        }
      />
    </section>
  );
}
