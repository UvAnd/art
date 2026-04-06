import type { SVGProps } from "react";

import type { SocialPlatform } from "@/types/sanity";

const iconClass = "size-6 shrink-0";

function ExternalLink(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClass}
      aria-hidden
      {...props}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="m10 14 11-11" />
    </svg>
  );
}

export function SocialIcon({
  platform,
  ...props
}: { platform: SocialPlatform | string } & SVGProps<SVGSVGElement>) {
  switch (platform) {
    case "pinterest":
      return (
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          className={iconClass}
          aria-hidden
          {...props}
        >
          <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.886.938-3.886s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.683 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z" />
        </svg>
      );
    case "behance":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconClass}
          aria-hidden
          {...props}
        >
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
          aria-hidden
          {...props}
        >
          <path d="M12 17C13.0609 17 14.0783 16.5786 14.8284 15.8284C15.5786 15.0783 16 14.0609 16 13C16 11.9391 15.5786 10.9217 14.8284 10.1716C14.0783 9.42143 13.0609 9 12 9C10.9391 9 9.92172 9.42143 9.17157 10.1716C8.42143 10.9217 8 11.9391 8 13C8 14.0609 8.42143 15.0783 9.17157 15.8284C9.92172 16.5786 10.9391 17 12 17Z" />
          <path d="M2 16.7222V8.27778C2 6.87802 2.55605 5.5356 3.54583 4.54583C4.5356 3.55605 5.87802 3 7.27778 3H15.7222C17.122 3 18.4644 3.55605 19.4542 4.54583C20.444 5.5356 21 6.87802 21 8.27778V16.7222C21 18.122 20.444 19.4644 19.4542 20.4542C18.4644 21.444 17.122 22 15.7222 22H7.27778C5.87802 22 4.5356 21.444 3.54583 20.4542C2.55605 19.4644 2 18.122 2 16.7222Z" />
          <path d="M17.5 7.50999L17.51 7.49899" />
        </svg>
      );
    case "email":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
          aria-hidden
          {...props}
        >
          <path d="M17.3529 3H6.23529C3.89621 3 2 4.89621 2 7.23529V16.7647C2 19.1038 3.89621 21 6.23529 21H17.3529C19.692 21 21.5882 19.1038 21.5882 16.7647V7.23529C21.5882 4.89621 19.692 3 17.3529 3Z" />
          <path d="M2.0498 7.33057L9.67863 11.7035C10.3179 12.0745 11.0439 12.2699 11.783 12.2699C12.5222 12.2699 13.2482 12.0745 13.8875 11.7035L21.5375 7.33057" />
        </svg>
      );
    case "linkedin":
      return <ExternalLink {...props} />;
    default:
      return <ExternalLink {...props} />;
  }
}
