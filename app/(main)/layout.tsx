import Sidebar from "@/components/navigation/Sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="md:flex lg:flex h-full w-[72px] z-30 flex-col inset-y-0 fixed">
                <Sidebar />
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;