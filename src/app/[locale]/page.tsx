import { Metadata } from "next";
import HomeFourPage from "./(homes)/home-4/page";

export const metadata: Metadata = {
  title: "Home 4 - Extracted",
};

export default function Home() {
  return (
    <>
      <HomeFourPage />
    </>
  );
}
