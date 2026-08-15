import { MainLayout } from "@/components/MainLayout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-12 bg-background p-12">
        <h1>Homepage for SSR Light-Dark Theme Toggle </h1>
        <h1>
          Notice page navigation theme is fixed and only changing when you
          toggle the button
        </h1>
        <Link
          href="/sandbox/theme"
          className="text-xs font-medium text-muted-foreground hover:text-emerald-500 transition-colors duration-200 inline-flex items-center gap-1.5 group pb-12"
          // style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Try in sandbox{" "}
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            →
          </span>
        </Link>
      </div>
    </MainLayout>
  );
}
