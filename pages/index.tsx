import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <Link href="/slow">SLOW</Link>
      <br />
      <Link href="/fast">FAST</Link>
    </div>
  );
};

export default Home;
