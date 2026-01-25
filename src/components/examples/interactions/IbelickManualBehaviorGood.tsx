import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function IbelickManualBehaviorGood() {
  // Using Radix Tabs - all keyboard behavior is built-in:
  // Arrow keys, Home/End, type-ahead, focus management, ARIA roles

  return (
    <div className="space-y-4">
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="home" className="flex-1">Home</TabsTrigger>
          <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="home" className="p-3 bg-muted rounded-lg mt-2">
          <p className="text-sm text-muted-foreground">Home content</p>
        </TabsContent>
        <TabsContent value="profile" className="p-3 bg-muted rounded-lg mt-2">
          <p className="text-sm text-muted-foreground">Profile content</p>
        </TabsContent>
        <TabsContent value="settings" className="p-3 bg-muted rounded-lg mt-2">
          <p className="text-sm text-muted-foreground">Settings content</p>
        </TabsContent>
      </Tabs>
      <p className="text-xs text-success">
        Radix handles: arrows, Home/End, type-ahead, disabled items, focus restore
      </p>
    </div>
  );
}
