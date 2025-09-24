import Image from "next/image";
import productPhoneDemo from "@/app/productPhoneDemo.png";

export default function PhoneDemoBlock() {
  return (
    <div className="relative w-full flex items-end justify-end">
      <Image
        src={productPhoneDemo}
        alt="Product Demo"
        className="max-w-none z-5"
      />
      <svg
        width="614"
        height="736"
        viewBox="0 0 614 736"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute z-0 top-0"
      >
        <g filter="url(#filter0_f_103_9)">
          <path
            d="M382.345 367.44C362.228 422.711 353.67 553.876 298.398 533.759C243.127 513.642 184.157 357.898 204.274 302.627C224.391 247.356 329.52 165.175 384.791 185.292C440.062 205.409 402.462 312.169 382.345 367.44Z"
            fill="url(#paint0_linear_103_9)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_103_9"
            x="0.24585"
            y="-17.8115"
            width="613.384"
            height="753.649"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="100"
              result="effect1_foregroundBlur_103_9"
            />
          </filter>
          <linearGradient
            id="paint0_linear_103_9"
            x1="357.483"
            y1="175.352"
            x2="235.382"
            y2="510.823"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#F43098" />
            <stop offset="1" stop-color="#4D4ACC" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        width="513"
        height="539"
        viewBox="0 0 513 539"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute z-0 -bottom-55 -right-[20%]"
      >
        <g filter="url(#filter0_f_103_12)">
          <path
            d="M311.5 259.001C311.5 286.615 275.114 338.501 247.5 338.501C219.886 338.501 200 254.615 200 227.001C200 199.387 264.886 200.001 292.5 200.001C320.114 200.001 311.5 231.387 311.5 259.001Z"
            fill="url(#paint0_linear_103_12)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_103_12"
            x="0"
            y="0"
            width="512.771"
            height="538.501"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="100"
              result="effect1_foregroundBlur_103_12"
            />
          </filter>
          <linearGradient
            id="paint0_linear_103_12"
            x1="256.386"
            y1="200"
            x2="256.386"
            y2="338.501"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#4D4ACC" />
            <stop offset="1" stop-color="#00D390" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
