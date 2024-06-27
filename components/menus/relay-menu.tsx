import { useRelayMenuStore } from '@/app/stores/relay-menu-store';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import PostRelayList from './post-relay-list';
import ReadRelayList from './read-relay-list';
import RelayDiscover from './relay-discover';

export function RelaySheet() {
  const { relayMenuIsOpen, setRelayMenuIsOpen } = useRelayMenuStore();
  return (
    <Sheet open={relayMenuIsOpen} onOpenChange={setRelayMenuIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl">Relays</SheetTitle>
          <SheetDescription className="text-md">
            Change your relay preferences here
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="read-from" className="mt-8">
          <TabsList>
            <TabsTrigger value="read-from">Read From</TabsTrigger>
            <TabsTrigger value="post-to">Post To</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>
          <TabsContent value="read-from">
            <ReadRelayList />
          </TabsContent>
          <TabsContent value="post-to">
            <PostRelayList />
          </TabsContent>
          <TabsContent value="discover">
            <RelayDiscover />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
