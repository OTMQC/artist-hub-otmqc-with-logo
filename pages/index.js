
import Head from "next/head";
import ArtistHub from "../components/ArtistHub";

export default function Home() {
  return (
    <>
      <Head>
        <title>Portail Artiste | OnTheMapQc</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        {/* SEO de base */}
        <meta
          name="description"
          content="Accédez à votre portail personnalisé chez OnTheMapQc. Gérez vos projets, discutez avec l’équipe et préparez vos prochaines sorties musicales."
        />
        <meta
          name="keywords"
          content="OnTheMapQc, artiste, hip-hop, distribution musicale, portail, JULZ, Eticrazy, KDS Requinzer, Lixfe, Disbe, BbyBlurr, Zeke B, D’ose, 66VET, formulaire, discussions"
        />
        <meta name="author" content="OnTheMapQc" />
        <meta name="publisher" content="OnTheMapQc" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Portail Artiste | OnTheMapQc" />
        <meta
          property="og:description"
          content="Votre portail exclusif pour artistes affiliés à OnTheMapQc. Formulaires, discussions, et gestion des sorties."
        />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.onthemapqc.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portail Artiste | OnTheMapQc" />
        <meta
          name="twitter:description"
          content="Accédez à votre portail personnalisé chez OnTheMapQc. Gérez vos projets, discutez avec l’équipe et préparez vos prochaines sorties musicales."
        />
        <meta name="twitter:image" content="/preview.png" />

        {/* Canonical et alternate */}
        <link rel="canonical" href="https://www.onthemapqc.com" />
        <link
          rel="alternate"
          href="https://artist-hub-otmqc-with-logo.vercel.app"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ArtistHub />
    </>
  );
}

