import { useEffect } from "react";

function InstagramEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/DYbuXbPFI3B/?utm_source=ig_embed&amp;utm_campaign=loading"
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: "100%",
          minWidth: "100%",
          width: "100%",
          padding: 0,
        }}
      />
  );
}

export default InstagramEmbed;
