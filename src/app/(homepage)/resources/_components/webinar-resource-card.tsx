import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";
import { ArrowBtn } from "~/app/(homepage)/_components/ui/Button";

interface WebinarResourceCardProps {
  id: number;
  title: string;
  image: string;
  link?: string;
  duration: string;
}

export const WebinarResourceCard = ({
  id,
  title,
  image,
  link,
  duration,
}: WebinarResourceCardProps) => {
  const isAvailable = Boolean(link && link !== "#");

  return (
    <div
      key={id}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-md"
    >
      <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
        {isAvailable ? (
          <Link href={link!} tabIndex={-1} aria-hidden="true">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        )}
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-500">
            Webinar
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-neutral-500">
            <Clock3 size={14} />
            {duration}
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl font-semibold leading-[1.2] text-neutral-900">
          {isAvailable ? (
            <Link
              href={link!}
              className="hover:text-primary-500 transition-colors"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {!isAvailable ? (
          <span className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-neutral-100 px-5 text-sm font-medium text-neutral-500">
            Coming soon
          </span>
        ) : (
          <ArrowBtn
            text="Watch Webinar"
            href={link!}
            className="min-h-12 w-full justify-center px-5 text-sm"
          />
        )}
      </div>
    </div>
  );
};
