'use client';

import { ArrowLeft } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty';
import { cn } from '../../lib/utils';

export type NotFoundAvatar = {
  src: string;
  fallback: string;
  alt?: string;
};

export type NotFoundPageProps = {
  homeHref?: string;
  homeLabel?: string;
  code?: string;
  title?: string;
  description?: string;
  avatars?: NotFoundAvatar[];
  className?: string;
};

const DEFAULT_AVATARS: NotFoundAvatar[] = [
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
    fallback: 'AK',
    alt: 'Women in Tech community member',
  },
  {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop',
    fallback: 'SR',
    alt: 'Women in Tech community member',
  },
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop',
    fallback: 'ML',
    alt: 'Women in Tech community member',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
    fallback: 'JT',
    alt: 'Women in Tech community member',
  },
];

export function NotFoundPage({
  homeHref = 'women-in-tech.html',
  homeLabel = 'Back to Women in Tech',
  code = '404',
  title = 'This page took a wrong turn',
  description =
    'The Leadership Circle is still gathering — but this URL is not on the invite list. Head back to the event page.',
  avatars = DEFAULT_AVATARS,
  className,
}: NotFoundPageProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(123,92,255,0.22),transparent)]"
        aria-hidden="true"
      />

      <Empty className="relative z-10 w-full max-w-lg border-white/10 border-solid bg-card/40 backdrop-blur-sm">
        <EmptyHeader>
          <EmptyMedia>
            <div className="flex -space-x-3" aria-hidden="true">
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.src}
                  className="size-11 border-2 border-background ring-1 ring-white/10"
                >
                  <AvatarImage src={avatar.src} alt={avatar.alt ?? avatar.fallback} />
                  <AvatarFallback className="bg-muted text-xs text-muted-foreground">
                    {avatar.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </EmptyMedia>

          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {code}
          </p>
          <EmptyTitle className="text-2xl font-semibold text-foreground md:text-3xl">
            {title}
          </EmptyTitle>
          <EmptyDescription className="max-w-md text-base">{description}</EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Button
            asChild
            size="lg"
            className="rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-[0_0_24px_rgba(123,92,255,0.35)] hover:bg-primary/90"
          >
            <a href={homeHref}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              {homeLabel}
            </a>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

export default NotFoundPage;
