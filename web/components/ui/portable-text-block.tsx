import { PortableText, type PortableTextComponents } from "@portabletext/react";

type PortableTextVariant = "default" | "reach";

const defaultComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-10 text-2xl font-semibold tracking-tight text-foreground first:mt-0">
        {children}
      </h1>
    ),
    normal: ({ children }) => (
      <p className="text-muted-foreground mb-4 text-base leading-relaxed last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight">
        {children}
      </h3>
    ),
    h5: ({ children }) => (
      <h5 className="mt-0 mb-4 text-base font-medium leading-relaxed text-foreground">
        {children}
      </h5>
    ),
  },
  list: ({ children }) => (
    <ul className="mb-4 list-disc pl-6 last:mb-0">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="text-[20px] leading-[1.2] mb-0">{children}</li>
  ),
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-primary underline underline-offset-4"
          {...(isExternal
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

const reachComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-0 mb-10 text-[40px] font-medium leading-[1.2] tracking-tight text-foreground first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-2 text-[32px] font-normal leading-[1.2] tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-4 text-[32px] font-normal leading-[1.2] tracking-tight text-foreground">
        {children}
      </h3>
    ),
    h5: ({ children }) => (
      <h5 className="mt-0 mb-10 text-[24px] font-normal leading-[1.2] text-foreground">
        {children}
      </h5>
    ),
    normal: ({ children }) => (
      <p className="mb-[24px] text-[20px] leading-[1.2] last:mb-0">
        {children}
      </p>
    ),
  },
  list: ({ children }) => (
    <ul className="mb-10 list-disc pl-[30px] last:mb-0 ">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-0 pl-2 text-[20px] leading-[1.2] [&::marker]:text-xs [&::marker]:leading-none">
      {children}
    </li>
  ),
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-primary underline underline-offset-4"
          {...(isExternal
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableTextBlock({
  value,
  variant = "default",
}: {
  value: unknown;
  variant?: PortableTextVariant;
}) {
  if (!value || !Array.isArray(value)) return null;
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <PortableText
        value={value as never}
        components={variant === "reach" ? reachComponents : defaultComponents}
      />
    </div>
  );
}
