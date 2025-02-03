import Footer from "@/app/components/footer/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      
    </div>
  );
}
