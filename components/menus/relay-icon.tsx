import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function RelayIcon({ src, fallback, alt }: any) {
  return (
    <Avatar className="size-8">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="text-xs font-medium">
        <AvatarImage src={fallback} alt={alt} />
      </AvatarFallback>
    </Avatar>
  );
}
