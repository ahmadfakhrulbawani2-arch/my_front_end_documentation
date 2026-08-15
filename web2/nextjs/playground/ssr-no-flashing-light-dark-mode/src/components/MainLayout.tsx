// ./src/components/MainLayout.tsx
// import MainFooter from "./layouts/MainFooter";
// import MainNavbar from "./layouts/MainNavbar";
import { cn } from "@/utils/cn";

interface LayoutProps {
  withNavbar?: boolean;
  withFooter?: boolean;
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
}

export function MainLayout({
  //   withNavbar = false,
  //   withFooter = false,
  children,
  className = "",
  childClassName = "",
}: LayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col bg-background text-primary transition-opacity duration-200",
        className,
      )}
    >
      {/* conditional navbar */}
      {/* {withNavbar && <MainNavbar />} */}

      {/* main container */}
      <main
        className={cn("flex-1 min-h-screen w-full mx-auto", childClassName)}
      >
        {children}
      </main>

      {/* Kondisional Footer */}
      {/* {withFooter && <MainFooter />} */}
    </div>
  );
}
