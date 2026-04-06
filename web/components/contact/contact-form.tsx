"use client";

import { useState } from "react";

import { SocialLinks } from "@/components/layout/social-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SanityImage } from "@/components/ui/sanity-image";

import { normalizeDisplayMailto } from "@/lib/social";

import type { ContactPage, SiteSettings } from "@/types/sanity";

export function ContactForm({
  page,
  settings,
}: {
  page: ContactPage;
  settings: SiteSettings;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const accessKey = page.web3formsAccessKey?.trim();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
          email,
          message,
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

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {page.headline ?? "Say Hello"}
        </h1>

        {!accessKey ? (
          <p className="text-muted-foreground mt-4 text-sm">
            Add your Web3Forms access key in Sanity (Contact page) to enable the form.
          </p>
        ) : null}

        <form className="mt-10 space-y-6" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Your email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Your message
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <Button type="submit" disabled={status === "loading" || !accessKey}>
            {status === "loading" ? "Sending…" : "Send"}
          </Button>
          {status === "success" ? (
            <p className="text-sm text-green-600 dark:text-green-400">Message sent. Thank you!</p>
          ) : null}
          {status === "error" ? (
            <p className="text-destructive text-sm">Something went wrong. Try again later.</p>
          ) : null}
        </form>
      </div>

      <div className="space-y-6">
        <div className="bg-muted/30 overflow-hidden rounded-xl">
          {page.illustration ? (
            <SanityImage
              image={page.illustration}
              alt=""
              width={800}
              className="max-h-[420px]"
              imgClassName="object-contain"
            />
          ) : (
            <div className="flex min-h-[280px] items-center justify-center p-6">
              <p className="text-muted-foreground text-center text-sm">
                Add an illustration in Sanity (Contact page).
              </p>
            </div>
          )}
        </div>
        {page.sideText ? (
          <p className="text-muted-foreground text-center text-sm leading-relaxed">
            {page.sideText}
          </p>
        ) : null}
        {page.contactEmailDisplay ? (
          <p className="text-center">
            <a
              href={normalizeDisplayMailto(page.contactEmailDisplay)}
              className="text-primary text-sm font-medium underline underline-offset-4"
            >
              {page.contactEmailDisplay.replace(/^mailto:/i, "").trim() || page.contactEmailDisplay}
            </a>
          </p>
        ) : null}
        <SocialLinks socials={settings.socials} className="justify-center gap-4" />
      </div>
    </div>
  );
}
