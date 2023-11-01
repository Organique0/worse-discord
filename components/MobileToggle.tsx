import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './navigation/Sidebar'
import { ServerSidebar } from './server/serverSidebar'

const MobileToggle = ({ serverId }: { serverId: string }) => {

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='md:hidden' />
            </SheetTrigger>
            <SheetContent side="left" className='p-0 gap-0 flex'>
                <div className='w-[72px]'>
                    <Sidebar />
                </div>
                <ServerSidebar serverId={serverId} />
            </SheetContent>
        </Sheet>
    )
}

export default MobileToggle