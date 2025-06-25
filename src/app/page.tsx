import Image from "next/image";
import { Fragment } from "react";
import Countryquiz from "@/components/country-quiz";

export default function Home() {
  return (
    <Fragment>
      <div className="relative z-10">
        <Countryquiz />
      </div>

      {/* بک‌گراند دسکتاپ */}
      <div
        className="absolute inset-0 w-full h-full hidden lg:block bg-fixed bg-center bg-cover z-0"
        style={{ backgroundImage: "url('/images/resources/bg.jpg')" }}
      />

      {/* بک‌گراند موبایل/تبلت */}
      <div
        className="absolute inset-0 w-full h-full block lg:hidden bg-fixed bg-center bg-cover z-0"
        style={{ backgroundImage: "url('/images/resources/bg-sm.jpg')" }}
      />
    </Fragment>
  );
}