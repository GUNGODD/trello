"use client";
import { updateBoard } from "@/app/actions/boardActions";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BOARD_COLORS = [
  { name: "Default", value: "" },
  { name: "Blue", value: "#0079bf" },
  { name: "Green", value: "#519839" },
  { name: "Red", value: "#b04632" },
  { name: "Purple", value: "#89609e" },
  { name: "Pink", value: "#cd5a91" },
  { name: "Orange", value: "#d29034" },
  { name: "Sky", value: "#00aecc" },
  { name: "Dark Blue", value: "#1d3855" },
  { name: "Charcoal", value: "#344563" },
];

const BOARD_WALLPAPERS = [
  { name: "Old Man of Storr", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/Old%20Man%20of%20Storr.jpg" },
  { name: "Anders Jilden", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/anders-jilden-cYrMQA7a3Wc-unsplash.jpg" },
  { name: "Annie Spratt 1", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/annie-spratt-8nAvFWUig3c-unsplash.jpg" },
  { name: "Annie Spratt 2", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/annie-spratt-Nvq1vngu4ZQ-unsplash.jpg" },
  { name: "Bjorn Snelders", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/bjorn-snelders-Cd3Ek7rNXSk-unsplash.jpg" },
  { name: "Caleb White", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/caleb-white-R3d2GdiVRyg-unsplash.jpg" },
  { name: "Daniel Leone", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/daniel-leone-g30P1zcOzXo-unsplash.jpg" },
  { name: "Deborah Diem", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/deborah-diem-ds_NPvoAzro-unsplash.jpg" },
  { name: "Jack Anstey", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/jack-anstey-HtUBBdNDxpQ-unsplash.jpg" },
  { name: "Jeremy Bishop", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/jeremy-bishop-dvACrXUExLs-unsplash.jpg" },
  { name: "Jessica Pamp", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/jessica-pamp-XiHRIiwq2jY-unsplash.jpg" },
  { name: "John O Nolan", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/john-o-nolan-6f_ANCcbj3o-unsplash.jpg" },
  { name: "Jon Flobrant", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/jon-flobrant-rB7-LCa_diU-unsplash.jpg" },
  { name: "Joris Visser", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/joris-visser-8konJx6dY4g-unsplash.jpg" },
  { name: "Kalen Emsley", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/kalen-emsley-Bkci_8qcdvQ-unsplash.jpg" },
  { name: "Kazuend", value: "https://raw.githubusercontent.com/makccr/wallpapers/master/wallpapers/landscape/kazuend-cCthPLHmrzI-unsplash.jpg" },
];

type Props = {
  boardId: string;
  currentBackground: string;
};

export default function BoardBackground({ boardId, currentBackground }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSelect(bgValue: string) {
    await updateBoard(boardId, { metadata: { background: bgValue } });
    router.refresh();
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        className="btn text-sm flex items-center gap-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white transition-all duration-300"
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faPalette} />
        <span className="hidden sm:inline">Background</span>
      </button>
      {open && (
        <div 
          className="absolute top-full right-0 mt-2 rounded-xl p-4 z-30 w-64 bg-white/95 dark:bg-gray-900/95 border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Board color
            </h5>
            <div className="grid grid-cols-5 gap-1.5">
              {BOARD_COLORS.map((color) => (
                <button
                  key={color.value}
                  className="w-8 h-8 rounded-md transition-transform hover:scale-110 border border-black/5 dark:border-white/5"
                  style={{
                    backgroundColor: color.value || 'var(--color-bg-tertiary)',
                    boxShadow: currentBackground === color.value 
                      ? '0 0 0 2px var(--color-bg-secondary), 0 0 0 4px var(--color-accent)' 
                      : 'none',
                  }}
                  title={color.name}
                  onClick={() => handleSelect(color.value)}
                />
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Wallpapers
            </h5>
            <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto pr-1">
              {BOARD_WALLPAPERS.map((wp) => (
                <button
                  key={wp.value}
                  className="w-11 h-11 rounded-md transition-transform hover:scale-110 bg-cover bg-center border border-black/5 dark:border-white/5"
                  style={{
                    backgroundImage: `url(${wp.value})`,
                    boxShadow: currentBackground === wp.value 
                      ? '0 0 0 2px var(--color-bg-secondary), 0 0 0 4px var(--color-accent)' 
                      : 'none',
                  }}
                  title={wp.name}
                  onClick={() => handleSelect(wp.value)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
