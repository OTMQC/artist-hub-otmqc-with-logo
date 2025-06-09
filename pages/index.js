import Head from "next/head";
import ArtistHub from "../components/ArtistHub";

export default function Home() {
  return (
    <>
      <Head>
        <title>Portail Artiste | OnTheMapQc</title>
        <meta name="description" content="Accédez à votre portail personnalisé chez OnTheMapQc. Gérez vos projets, discutez avec l’équipe et préparez vos prochaines sorties musicales." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="Portail Artiste | OnTheMapQc" />
        <meta property="og:description" content="Votre portail exclusif pour artistes affiliés à OnTheMapQc. Formulaires, discussions, et gestion des sorties." />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ArtistHub />
    </>
  );
}
