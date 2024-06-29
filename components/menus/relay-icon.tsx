import { Icons } from '@/components/icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


export default function RelayIcon({ src, alt }: any) {
  return (
    <Avatar className="size-10">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="text-xs font-medium">
        <Icons.Satelite className="size-6" />
      </AvatarFallback>
    </Avatar>
  );
}
