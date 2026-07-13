import type { MetadataRoute } from "next";

/**
 * Brand colors from src/app/globals.css :root
 * --deep-navy: #0B1120
 * --brass: #D4AF37
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Iron Eagle Studio",
    short_name: "Iron Eagle",
    description:
      "American-crafted websites and software. Premium web systems, product UI, and brand-to-build execution delivered with precision and speed.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1120",
    theme_color: "#0B1120",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
