import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@tawasul/ui/components/avatar';
import { cn } from '@tawasul/ui/lib/utils';

interface IUserAvatar {
  src?: string;
  name?: string;
  className?: string;
}
export function UserAvatar(props: IUserAvatar) {
  const { src, name, className } = props;
  return (
    <Avatar className={cn('h-8 w-8 cursor-pointer', className)}>
      {src ? (
        <AvatarImage
          src={src}
          alt={`${name} avatar`}
          className="object-cover"
        />
      ) : null}
      <AvatarFallback>{name?.charAt(0) || 'C'}</AvatarFallback>
    </Avatar>
  );
}
