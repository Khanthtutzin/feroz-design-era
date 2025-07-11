import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define the CSS for the auto-scrolling animation
const galleryStyles = `
    /* Keyframes for right-to-left scrolling */
    @keyframes scroll-rtl {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
    }

    /* Keyframes for left-to-right scrolling */
    @keyframes scroll-ltr {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }

    .gallery-row-rtl {
        animation: scroll-rtl var(--scroll-duration) linear infinite;
    }

    .gallery-row-ltr {
        animation: scroll-ltr var(--scroll-duration) linear infinite;
    }

    /* Pause animation on hover */
    .gallery-row-rtl:hover,
    .gallery-row-ltr:hover {
        animation-play-state: paused;
    }

    /* Ensure the content repeats seamlessly */
    .gallery-track {
        display: flex;
        width: max-content; /* Allow content to dictate width */
    }

    .gallery-item {
        flex-shrink: 0; /* Prevent items from shrinking */
        padding: 1rem; /* Spacing between images */
    }
`;

// This component fetches images from Contentful and displays them in
// two auto-scrolling rows, one right-to-left and one left-to-right.
export default function BannerGallery() {
    // State to store the fetched image URLs
    const [images, setImages] = useState([]);
    // State to manage loading status
    const [loading, setLoading] = useState(true);
    // State to manage any errors during data fetching
    const [error, setError] = useState(null);

    // Access environment variables for Contentful
    const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
    const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
    // IMPORTANT: Use the API Identifier for your new 'Banner Gallery' content type
    const contentType = import.meta.env.VITE_CONTENTFUL_BANNER_TYPE_ID; // e.g., 'bannerGallery'

    useEffect(() => {
        const fetchBanners = async () => {
            // Basic validation for environment variables
            if (!spaceId || !accessToken || !contentType) {
                console.error("Contentful API credentials for BannerGallery are missing. Please check your .env file.");
                setError("Configuration error: Banner Gallery API credentials are not set.");
                setLoading(false);
                return;
            }

            try {
                // Fetch the single entry for the Banner Gallery content type
                const apiUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=${contentType}&include=1`;
                // `include=1` is enough to get the asset details if they are directly linked

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Contentful Banner API Error Response:", errorText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Find the single Banner Gallery entry
                const bannerEntry = data.items[0];

                if (!bannerEntry || !bannerEntry.fields.images) {
                    setError("No banner gallery entry or images found in Contentful.");
                    setLoading(false);
                    return;
                }

                // Resolve image URLs from the 'includes.Asset' array
                const fetchedImages = bannerEntry.fields.images.map(imageRef => {
                    const asset = data.includes?.Asset?.find(asset => asset.sys.id === imageRef.sys.id);
                    return asset ? `https:${asset.fields.file.url}` : 'https://placehold.co/400x300/CCCCCC/000000?text=Image+Not+Found';
                });

                setImages(fetchedImages);
            } catch (err) {
                console.error("Failed to fetch banner images from Contentful:", err);
                setError("Failed to load banners. Please ensure Contentful API keys are correct and content exists.");
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, [spaceId, accessToken, contentType]); // Dependencies for useEffect

    // If no images are fetched, display placeholders for the animation to work
    // This ensures the scrolling effect is visible even without Contentful data initially
    const displayImages = images.length > 0 ? images : Array(8).fill('https://placehold.co/400x300/000000/FFFFFF?text=Placeholder');

    // Duplicate images to create a seamless loop
    const duplicatedImages = [...displayImages, ...displayImages];

    // Calculate scroll duration based on number of images to keep speed consistent
    // Adjust 10 (seconds per image) to control overall speed
    const scrollDuration = `${(duplicatedImages.length / 2) * 8}s`; // Example: 8 seconds per original set of images

    if (loading) {
        return (
            <section id="banner-gallery" className="py-16 bg-gray-100 min-h-[400px] flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-700">Loading banners...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section id="banner-gallery" className="py-16 bg-gray-100 min-h-[400px] flex items-center justify-center">
                <p className="text-xl font-semibold text-red-600">{error}</p>
            </section>
        );
    }

    return (
        <section id="banner-gallery" className="py-16 bg-gray-100 overflow-hidden">
            {/* Inject CSS styles directly */}
            <style>{galleryStyles}</style>

            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold text-center text-gray-900 mb-12"
            >
                My Latest Designs Gallery
            </motion.h2>

            <div className="relative w-full overflow-hidden">
                {/* First Row: Right to Left Scroll */}
                <div
                    className="gallery-track gallery-row-rtl"
                    style={{ '--scroll-duration': scrollDuration }}
                >
                    {duplicatedImages.map((src, index) => (
                        <div key={`rtl-${index}`} className="gallery-item w-[300px] h-[225px] sm:w-[400px] sm:h-[300px]">
                            <img
                                src={src}
                                alt={`Design ${index + 1}`}
                                className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            />
                        </div>
                    ))}
                </div>

                {/* Second Row: Left to Right Scroll */}
                <div
                    className="gallery-track gallery-row-ltr mt-8" // Margin between rows
                    style={{ '--scroll-duration': scrollDuration }}
                >
                    {duplicatedImages.map((src, index) => (
                        <div key={`ltr-${index}`} className="gallery-item w-[300px] h-[225px] sm:w-[400px] sm:h-[300px]">
                            <img
                                src={src}
                                alt={`Design ${index + 1}`}
                                className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
