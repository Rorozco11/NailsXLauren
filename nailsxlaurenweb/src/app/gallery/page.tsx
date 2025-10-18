import NailArtGallery from '../components/CustomInstagramGallery';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <NailArtGallery 
          feedId="DyPDiZdRhlqK8v8ir2QU"
          className="w-full"
        />
      </div>

    </div>
  );
}
