import DashBoard from '@/components/homepage/dashboard';
import BlurryBlob from '@/components/ui/blurry-blob';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Home() {
    return (
        <TooltipProvider>
            <div id="home-page"
                className="relative max-w-none m-auto px-3 py-5 sm:px-5"
            >
                <div className="fixed left-0 bottom-16"><BlurryBlob firstBlobColor="bg-primary" secondBlobColor="bg-secondary" /></div>
                <div className="fixed right-0 top-96"><BlurryBlob className="size-40" firstBlobColor="bg-primary" secondBlobColor="bg-secondary" /></div>
                <div className="h-full">
                    <DashBoard />
                </div>
            </div>
        </TooltipProvider>
    );
}
