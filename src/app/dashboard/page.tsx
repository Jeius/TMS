import BlurryBlob from '@/components/animated/blurry-blob';
import { TooltipProvider } from '@/components/ui/tooltip';
import DashBoard from '@/features/dashboard/components/dashboard';

export default function UserHome() {
    return (
        <main className="pb-4 lg:pl-16">
            <TooltipProvider>
                <div id="home-page"
                    className="relative max-w-none m-auto px-3 py-5 sm:px-5"
                >
                    <div className="fixed left-0 rotate-90 size-32">
                        <BlurryBlob firstBlobColor="bg-primary" secondBlobColor="bg-secondary" />
                    </div>
                    <div className="fixed right-1/4 bottom-0 size-20">
                        <BlurryBlob className="size-40" firstBlobColor="bg-primary" secondBlobColor="bg-secondary" />
                    </div>
                    <div className="h-full">
                        <DashBoard />
                    </div>
                </div>
            </TooltipProvider>
        </main>
    );
}