import Image from "next/image";
import productPhoneDemo from "@/app/productPhoneDemo.png";

export default function PhoneDemoBlock() {
  return (
    <div className="relative w-full">
      <Image src={productPhoneDemo} alt="Product Demo" className="absolute" />
    </div>
  );
}
