import homeSVG from "../assets/home.svg";
export default function LandingPage() {
  return (
    <>
      <h1>Association HQ!</h1>
      <h2>
        If there's something being voted on, the person running your elections
        will email you a link.
      </h2>
      <img
        style={{ width: "inherit" }}
        src={homeSVG}
        alt="Three houses in a neighborhood together."
      />
    </>
  );
}
