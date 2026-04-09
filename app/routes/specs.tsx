import { useEffect, useState } from "react";
import type { Route } from "./+types/specs";
import { Card } from "../components/Card";
import { CardGrid } from "../components/CardGrid";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";

interface SpecItem {
  label: string;
  value: string;
  url?: string;
}

interface SpecCategory {
  name: string;
  items: SpecItem[];
}

const SPEC_CATEGORIES: SpecCategory[] = [
  {
    name: "Gaming PC (Serenity)",
    items: [
      {
        label: "CPU",
        value: "AMD Ryzen 9 7950X3D",
        url: "https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-9-7950x3d.html",
      },
      {
        label: "Motherboard",
        value: "MSI MAG X670E TOMAHAWK WIFI",
        url: "https://www.msi.com/Motherboard/MAG-X670E-TOMAHAWK-WIFI",
      },
      {
        label: "Cooling",
        value: "be quiet! DARK ROCK PRO 5",
        url: "https://www.bequiet.com/en/cpucooler/4466",
      },
      {
        label: "RAM",
        value: "64GB G.Skill Flare X5 Series DDR5 6000 MT/s",
        url: "https://www.gskill.com/product/165/396/1722406261/F5-6000J3036F16GX2-FX5",
      },
      {
        label: "GPU",
        value: "MSI GeForce RTX 4080 16GB Ventus 3X OC",
        url: "https://www.msi.com/Graphics-Card/GeForce-RTX-4080-16GB-VENTUS-3X-E-OC",
      },
      {
        label: "Storage",
        value: "4TB Crucial T710 Gen5 NVMe",
        url: "https://www.crucial.com/ssd/t710/ct4000t710ssd8",
      },
      {
        label: "PSU",
        value: "EVGA SuperNOVA 850 Ga, 80 Plus Gold 850W",
        url: "https://www.evga.com/products/product.aspx?pn=220-GA-0850-X1",
      },
      {
        label: "Case",
        value: "Fractal Design North",
        url: "https://www.fractal-design.com/products/cases/north/north/charcoal-black-tg-dark/",
      },
    ],
  },
  {
    name: "Peripherals",
    items: [
      {
        label: "Monitor",
        value: '27" Samsung Odyssey G7 1440p HDR',
        url: "https://www.samsung.com/ca/business/monitors/curved/odyssey-g7-lc27g75tqsnxza/",
      },
      { label: "Keyboard", value: "Wooting 80HE", url: "https://wooting.io/wooting-80he" },
      {
        label: "Mouse",
        value: "SteelSeries Aerox 5 Wireless",
        url: "https://steelseries.com/gaming-mice/aerox-5",
      },
      {
        label: "Headset",
        value: "HyperX Cloud II",
        url: "https://hyperx.com/products/hyperx-cloud-ii",
      },
    ],
  },
  {
    name: "Streaming PC (Surge)",
    items: [
      {
        label: "CPU",
        value: "Intel Core i5 12600K",
        url: "https://www.intel.com/content/www/us/en/products/sku/134589/intel-core-i512600k-processor-20m-cache-up-to-4-90-ghz/specifications.html",
      },
      {
        label: "Motherboard",
        value: "ASRock Z690 Steel Legend WiFi 6E",
        url: "https://www.asrock.com/mb/Intel/Z690%20Steel%20Legend%20WiFi%206E/index.asp",
      },
      {
        label: "Cooling",
        value: "be quiet! PURE ROCK 2",
        url: "https://www.bequiet.com/en/cpucooler/1842",
      },
      {
        label: "RAM",
        value: "Corsair Vengeance LPX 32GB DDR4 3600MT/s",
        url: "https://www.corsair.com/us/en/p/memory/cmk32gx4m2e3200c16/vengeance-lpx-32gb-2-x-16gb-ddr4-dram-3200mhz-c16-memory-kit-black-cmk32gx4m2e3200c16",
      },
      {
        label: "GPU",
        value: "MSI GeForce RTX 4070 12GB Ventus 3X",
        url: "https://www.msi.com/Graphics-Card/GeForce-RTX-4070-VENTUS-3X-E1-12G",
      },
      {
        label: "Storage",
        value: "2TB Western Digital WD_BLACK SN770 Gen4 NVMe",
        url: "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn770-nvme-ssd?sku=WDS200T3X0E-00B3N0",
      },
      {
        label: "PSU",
        value: "Seasonic FOCUS PX-750 750W 80+ Platinum",
        url: "https://seasonic.com/focus-px/",
      },
      {
        label: "Case",
        value: "Fractal Design Mesify 2 Compact",
        url: "https://www.fractal-design.com/products/cases/meshify/meshify-2-compact/black-solid/",
      },
      {
        label: "Capture Card",
        value: "Elgato 4K Pro",
        url: "https://www.elgato.com/us/en/p/game-capture-4k-pro",
      },
    ],
  },
  {
    name: "Streaming Gear",
    items: [
      { label: "Microphone", value: "Rode PodMic", url: "https://rode.com/en-us/products/podmic" },
      {
        label: "USB Interface",
        value: "XLR Dock for Stream Deck +",
        url: "https://www.elgato.com/us/en/p/xlr-dock-stream-deck-plus",
      },
      {
        label: "Stream Control",
        value: "Stream Deck 15 Key",
        url: "https://www.elgato.com/us/en/p/stream-deck",
      },
      {
        label: "Camera",
        value: "Insta360 Link 2",
        url: "https://www.insta360.com/product/insta360-link2",
      },
      {
        label: "Lighting",
        value: "2 x Elgato Key Light Air",
        url: "https://www.elgato.com/us/en/p/key-light-air",
      },
    ],
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Specs | Duke Skyloafer" },
    { name: "description", content: "Duke Skyloafer's gaming PC specs and peripherals." },
  ];
}

export default function Specs() {
  const [diagramOpen, setDiagramOpen] = useState(false);

  useEffect(() => {
    if (!diagramOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDiagramOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [diagramOpen]);

  return (
    <PageContainer>
      <PageHeader
        title="Gaming PC Specs"
        subtitle="I run a 2 PC setup while streaming. I game on Serenity while Surge streams and/or records the footage through a capture card. I use OBS Studio to manage the stream."
      />

      <CardGrid columns={2}>
        {SPEC_CATEGORIES.map((category) => (
          <Card key={category.name} className="p-6">
            <h3 className="font-heading text-lg text-text-primary mb-4">{category.name}</h3>
            <div className="flex flex-col divide-y divide-white/10">
              {category.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3">
                  <span className="text-sm text-text-secondary">{item.label}</span>
                  <span className="text-sm text-text-primary flex items-center gap-2">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cyan hover:underline flex items-center gap-1 text-right"
                      >
                        {item.value}
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ) : (
                      item.value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </CardGrid>

      <section className="mt-12">
        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-6">Dual PC Setup</h2>
        <Card className="p-6 cursor-pointer" onClick={() => setDiagramOpen(true)}>
          <img
            src="/stream-pc-setup.svg"
            alt="Dual PC streaming setup diagram"
            className="w-full"
          />
          <ul className="mt-6 list-disc space-y-1 text-sm text-text-secondary">
            <li>
              The gaming PC outputs at 1440p 120hz, which passes through the capture card to the
              primary monitor. The gaming PC's audio and video are inputs in OBS Studio.
            </li>
            <li>
              Video is captured and sent to YouTube at 1440p 60hz, encoded in AVC (H.264) at 18Mbps.
            </li>
            <li>
              The Streaming PC handles most of the audio (including Discord), but I do loop the mic
              back into the gaming PC in case I need to use the in-game chat on the gaming PC.
            </li>
            <li>
              Attaching the mic and headphones to the audio interface allows me to monitor my own
              voice in real time with no latency, but it also means I can only hear the gaming PC
              through the headphones when OBS is running.
            </li>
            <li>
              When recording, a copy is stored on my local network drive with the audio tracks
              separated. This way I can replace my voiceover or the music if I need to edit it
              later. I usually record <i>or</i> stream, but sometimes I do both at the same time.
            </li>
          </ul>
        </Card>

        {diagramOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setDiagramOpen(false)}
          >
            <button
              className="absolute top-6 right-6 cursor-pointer text-white/70 hover:text-white transition-colors"
              onClick={() => setDiagramOpen(false)}
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src="/stream-pc-setup.svg"
              alt="Dual PC streaming setup diagram"
              className="max-w-[95vw] max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </section>
    </PageContainer>
  );
}
