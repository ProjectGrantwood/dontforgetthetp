import BrandHeader from "@/components/global-components/brand-header";

export default function Layout({ children }: {children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full h-screen">
            <BrandHeader />
            {children}
        </div>
    );
}