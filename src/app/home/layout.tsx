import BrandHeader from '@/components/global-components/brand-header';
import NavbarTop from '@/components/home-components/navbar-top';

export default function Layout({ children }: {children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full h-screen">
            <BrandHeader />
            <NavbarTop />
            {children}
        </div>
    );
}