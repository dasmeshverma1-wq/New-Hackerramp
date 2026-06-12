import * as React from 'react';
import { Home } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcramb';

export type PageBreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type PageBreadcrumbProps = {
  items: PageBreadcrumbItem[];
  homeHref?: string;
  onHomeClick?: () => void;
  className?: string;
};

export function PageBreadcrumb({
  items,
  homeHref = '/',
  onHomeClick,
  className,
}: PageBreadcrumbProps) {
  return (
    <Breadcrumb className={cn('min-w-0', className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          {onHomeClick ? (
            <BreadcrumbLink asChild>
              <button type="button" onClick={onHomeClick} aria-label="Home">
                <Home className="size-4" />
              </button>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink href={homeHref}>
              <Home className="size-4" />
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : item.onClick ? (
                  <BreadcrumbLink asChild>
                    <button type="button" onClick={item.onClick}>
                      {item.label}
                    </button>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href={item.href ?? '#'}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
