'use client';
import React, { useState, useEffect } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  isCarousel?: boolean;
  carouselImages?: string[];
}

interface InstagramPost {
  id: string;
  timestamp: string;
  permalink: string;
  mediaType: string;
  mediaUrl: string;
  caption: string;
  sizes: {
    small: { mediaUrl: string; height: number; width: number };
    medium: { mediaUrl: string; height: number; width: number };
    large: { mediaUrl: string; height: number; width: number };
    full: { mediaUrl: string; height: number; width: number };
  };
  children?: InstagramPost[];
}

interface InstagramData {
  username: string;
  biography: string;
  profilePictureUrl: string;
  website: string;
  followersCount: number;
  followsCount: number;
  posts: InstagramPost[];
}

interface NailArtGalleryProps {
  feedId?: string;
  className?: string;
}

export default function NailArtGallery({ 
  feedId = "DyPDiZdRhlqK8v8ir2QU", 
  className = "" 
}: NailArtGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://feeds.behold.so/${feedId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch gallery data');
        }
        const data: InstagramData = await response.json();
        
        // Transform Instagram data into gallery images
        const galleryImages: GalleryImage[] = [];
        
        data.posts.forEach((post: InstagramPost) => {
          if (post.mediaType === 'CAROUSEL_ALBUM' && post.children) {
            // Add each image from carousel as separate gallery item
            post.children.forEach((child: InstagramPost, index: number) => {
              galleryImages.push({
                id: `${post.id}-${index}`,
                src: child.sizes.large.mediaUrl,
                alt: post.caption || 'Nail art design',
                title: post.caption ? post.caption.split(' ')[0] : 'Nail Art',
                category: 'nail-art',
                isCarousel: true,
                carouselImages: post.children?.map((c: InstagramPost) => c.sizes.large.mediaUrl)
              });
            });
          } else {
            // Single image post
            galleryImages.push({
              id: post.id,
              src: post.sizes.large.mediaUrl,
              alt: post.caption || 'Nail art design',
              title: post.caption ? post.caption.split(' ')[0] : 'Nail Art',
              category: 'nail-art'
            });
          }
        });
        
        setImages(galleryImages);
      } catch (err) {
        console.error('Error fetching gallery data:', err);
        // Fallback to static images if API fails
        setImages([
          {
            id: 'fallback-1',
            src: '/Images/FrenchTip2.jpeg',
            alt: 'French tip nail art',
            title: 'French Tips',
            category: 'classic'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [feedId]);

  const categories = ['all', 'nail-art', 'classic', 'seasonal'];
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  if (loading) {
    return (
      <div className={`gallery-loading ${className}`}>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading beautiful nail art...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`nail-art-gallery ${className}`}>
      {/* Gallery Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Nail Art Gallery
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover Lauren&apos;s stunning nail art creations. Each design is a unique masterpiece crafted with precision and creativity.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-2 shadow-lg">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              {category === 'all' ? 'All Designs' : 
               category === 'nail-art' ? 'Nail Art' :
               category === 'classic' ? 'Classic' : 'Seasonal'}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                <p className="text-sm opacity-90">Click to view</p>
              </div>
            </div>

            {/* Carousel indicator */}
            {image.isCarousel && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-800">
                📷 {image.carouselImages?.length || 1}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-pink-400 transition-colors"
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            {selectedImage.title && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
                <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-sm opacity-90">{selectedImage.alt}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">Love What You See?</h3>
          <p className="text-xl mb-6 opacity-90">
            Book your appointment and get your own stunning nail art design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booknow"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Book Appointment
            </a>
            <a
              href="https://www.instagram.com/nailxlauren?igsh=OTcxOXZ2Mmg4ZWFs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.721c-.49 0-.875.385-.875.875s.385.875.875.875h8.558c.49 0 .875-.385.875-.875s-.385-.875-.875-.875z"/>
              </svg>
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
