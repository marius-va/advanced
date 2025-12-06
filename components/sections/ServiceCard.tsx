import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type ServiceCardProps = {
  title: string;
  description?: string;
  image?: {
    asset?: { _ref: string } | { _id: string; [key: string]: any };
    alt?: string;
  };
  placeholderUrl?: string;
  index: number;
};

export function ServiceCard({
  title,
  image,
  placeholderUrl,
  index,
}: ServiceCardProps) {
  // Check if we have a valid Sanity image (either _ref or dereferenced asset with _id)
  const hasSanityImage = image?.asset && (
    ('_ref' in image.asset && image.asset._ref && image.asset._ref.length > 0) ||
    ('_id' in image.asset && image.asset._id && image.asset._id.length > 0)
  );

  const imageUrl = hasSanityImage
    ? urlFor(image).width(800).height(600).url()
    : placeholderUrl ||
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop";

  const altText = image?.alt || title;

  return (
    <article className="group relative h-80 flex flex-col overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/75 transition-colors duration-300 group-hover:bg-black/60" />
      </div>

      {/* Gold Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 z-20 bg-gold transition-all duration-500 w-full" />

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col h-full items-start justify-between">
        <div className="mb-4 text-gold font-serif text-4xl font-bold opacity-80">
          {(index + 1).toString().padStart(2, "0")}
        </div>

        <div>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-3 leading-tight drop-shadow-md">
            {title}
          </h3>
          <div className="h-0.5 w-12 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2" />
        </div>

        <div className="pt-4 flex items-center text-sm text-gray-300 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="w-6 h-[1px] bg-gold mr-2" />
          Premium Service
        </div>
      </div>
    </article>
  );
}
