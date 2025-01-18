import { Card, CardContent } from '@tawasul/ui/components/card';
export function ProfileInfo() {
  return (
    <Card>
      <CardContent className="space-y-6 rounded-xl bg-accent/50 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
            x
          </div>
          <div className="flex flex-col">
            <p className="text-sm">Mohamed Fareed</p>
            <span className="text-muted-foreground text-xs">@moefrdev</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">2.4k</span>
            <span className="text-muted-foreground">Follower</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">900</span>
            <span className="text-muted-foreground">Following</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">80</span>
            <span className="text-muted-foreground">Post</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
