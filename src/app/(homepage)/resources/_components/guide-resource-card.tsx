import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GuideNotifyMe } from "./guide-notify-me";

interface GuideResourceProps {
  id: number;
  category?: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export const GuideResourceCard = ({
  id,
  category,
  title,
  description,
  image,
  link,
}: GuideResourceProps) => {
  const isAvailable = Boolean(link && link !== "#");
  const ctaLabel = category === "Tools" ? "Open tool" : "Read article";

  return (
    <div
      key={id}
      className="group flex flex-col rounded-lg bg-white overflow-hidden transition-all duration-300 shadow-md text-left"
    >
      <div className="relative w-full h-48 overflow-hidden bg-neutral-100">
        {isAvailable ? (
          <Link href={link!} tabIndex={-1} aria-hidden="true">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-102"
            />
          </Link>
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-102"
          />
        )}
      </div>

      <div className="flex flex-col flex-grow p-4 gap-4">
        <span className="inline-block w-fit text-xs font-medium p-2 rounded-full bg-primary-50/50 text-primary-500">
          {category || "Guide"}
        </span>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-neutral-900 mb-2 line-clamp-2">
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
          <p className="text-sm text-neutral-600 mb-4 line-clamp-2 flex-grow">
            {description}
          </p>
        </div>

        {!isAvailable ? (
          <GuideNotifyMe title={title} />
        ) : (
          <Link
            href={link!}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors mt-3"
          >
            {ctaLabel} <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
};
