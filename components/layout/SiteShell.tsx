import { SiteChromeProvider } from "@/lib/context/site-chrome";
import TopHeader from "./TopHeader";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import AboutModalHost from "./AboutModalHost";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SiteChromeProvider>
      <TopHeader />
      <div className="pt-16 flex min-h-screen">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <main className="pb-8">{children}</main>
          <Footer />
        </div>
      </div>
      <AboutModalHost />
    </SiteChromeProvider>
  );
}
