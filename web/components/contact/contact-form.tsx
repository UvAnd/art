"use client";

import { useState } from "react";

import { SocialLinks } from "@/components/layout/social-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SanityImage } from "@/components/ui/sanity-image";
import { buttonVariants } from "@/components/ui/button-variants";

import { cn } from "@/lib/utils";

import type { ContactPage, SiteSettings } from "@/types/sanity";

/** Matches Material-style floating labels (e.g. shadcn expansions): scale + translate, placeholder-shown = centered rest state. @see https://shadcnui-expansions.typeart.cc/docs/floating-label-input */
const floatLabel =
  "absolute top-1.5 left-0 z-10 origin-[0] -translate-y-3 scale-75 transform cursor-text bg-muted px-0.5 text-sm font-medium text-foreground transition-[top,transform,font-size,color] duration-300 ease-out motion-reduce:transition-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-sm peer-focus:font-medium peer-focus:text-foreground";

const floatInput =
  "peer h-11 w-full rounded-none border-0 bg-transparent px-0 pb-1 pt-[1.375rem] text-base text-foreground leading-snug shadow-none outline-none !ring-0 placeholder:text-transparent focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:outline-none md:text-base dark:bg-transparent";

const floatTextarea =
  "peer w-full resize-none rounded-none border-0 bg-transparent px-0 pb-1.5 pt-3.5 text-base leading-snug text-foreground shadow-none outline-none !ring-0 field-sizing-content min-h-[3rem] placeholder:text-transparent focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:outline-none md:text-base dark:bg-transparent";

const sendButtonClass =
  "inline-flex h-auto min-h-0 w-full items-center justify-center rounded-full px-6 pt-2 pb-1.5 text-lg font-bold leading-normal";

export function ContactForm({
  page,
  settings,
}: {
  page: ContactPage;
  settings: SiteSettings;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setStatus("idle");

    const emailTrimmed = email.trim();
    const messageTrimmed = message.trim();

    if (!emailTrimmed || !messageTrimmed) {
      setFormError("Please enter your email and a message.");
      return;
    }

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!accessKey) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          email: emailTrimmed,
          message: messageTrimmed,
          botcheck: "",
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      setStatus(data.success ? "success" : "error");
      if (data.success) {
        setEmail("");
        setMessage("");
      }
    } catch {
      setStatus("error");
    }
  }

  const sideText =
    page.sideText ??
    "Don't want to fill out the form?\nWrite to us directly — we'll respond quickly.";

  return (
    <section className="bg-muted text-foreground w-full">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-[120px]">
          <div className="mx-auto flex w-full max-w-[474px] flex-col items-center gap-10 lg:shrink-0">
            <h1 className="text-center text-[40px] font-medium leading-[1.2] text-foreground/80 lg:text-left">
              {page.headline ?? "Say Hello"}
            </h1>

            {!accessKey ? (
              <p className="text-muted-foreground -mt-4 max-w-[474px] text-center text-sm lg:text-left">
                Set{" "}
                <code className="rounded bg-background/80 px-1 py-0.5 text-xs">
                  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
                </code>{" "}
                in <code className="rounded bg-background/80 px-1 py-0.5 text-xs">.env.local</code>{" "}
                (see <code className="rounded bg-background/80 px-1 py-0.5 text-xs">.env.local.example</code>
                ) to enable the form.
              </p>
            ) : null}

            <form
              className="flex w-full max-w-[474px] flex-col gap-6"
              onSubmit={onSubmit}
            >
              <div className="flex flex-col gap-8">
                <div className="focus-within:border-primary relative border-b-2 border-muted-foreground transition-colors">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFormError(null);
                    }}
                    placeholder=" "
                    className={floatInput}
                    aria-invalid={formError ? true : undefined}
                    aria-describedby={formError ? "contact-form-error" : undefined}
                  />
                  <label htmlFor="email" className={floatLabel}>
                    Your Email
                  </label>
                </div>

                <div className="focus-within:border-primary relative border-b-2 border-muted-foreground transition-colors">
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={1}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setFormError(null);
                    }}
                    placeholder=" "
                    className={floatTextarea}
                    aria-invalid={formError ? true : undefined}
                    aria-describedby={formError ? "contact-form-error" : undefined}
                  />
                  <label htmlFor="message" className={floatLabel}>
                    Your Message
                  </label>
                </div>
              </div>

              <input
                type="text"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={status === "loading" || !accessKey}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    sendButtonClass,
                  )}
                >
                  {status === "loading" ? "Sending…" : "Send"}
                </Button>
                {formError ? (
                  <p
                    id="contact-form-error"
                    className="text-destructive text-sm"
                    role="alert"
                  >
                    {formError}
                  </p>
                ) : null}
                {status === "success" ? (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Message sent. Thank you!
                  </p>
                ) : null}
                {status === "error" && !formError ? (
                  <p className="text-destructive text-sm">
                    Something went wrong. Try again later.
                  </p>
                ) : null}
              </div>
            </form>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-center gap-8 lg:gap-10">
            <div className="relative size-[280px] shrink-0 overflow-hidden sm:size-[330px]">
              {page.illustration ? (
                <SanityImage
                  image={page.illustration}
                  alt=""
                  width={660}
                  className="size-full"
                  imgClassName="h-full w-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-muted/50 p-6">
                  <p className="text-muted-foreground text-center text-sm">
                    Add an illustration in Sanity (Contact page).
                  </p>
                </div>
              )}
            </div>

            <div className="flex w-full max-w-xl flex-col items-center gap-8">
              <p className="text-foreground text-center text-[28px] font-normal leading-[1.2] whitespace-pre-wrap">
                {sideText}
              </p>
              <SocialLinks socials={settings.socials} className="gap-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
