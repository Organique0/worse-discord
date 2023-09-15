import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import Sidebar from './navigation/Sidebar'
import { ServerSidebar } from './server/serverSidebar'

const MobileToggle = ({ serverId }: { serverId: string }) => {

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className='md:hidden'>
                    <Menu />
                </Button>
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