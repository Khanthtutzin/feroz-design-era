import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Import the Rich Text Renderer and INLINES for handling links if they exist
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

// Define custom rendering options for Contentful Rich Text.
// This is optional but good for controlling how different Rich Text nodes are rendered.
const richTextOptions = {
    renderNode: {
        // Render paragraphs as <p> tags with Tailwind classes
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="text-lg text-gray-600 leading-relaxed mb-4">{children}</p>
        ),
        // Render entries (if you link other content types within Rich Text)
        [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
            // You can customize how embedded entries are rendered here
            return <div>{children}</div>;
        },
        // Render assets (e.g., images embedded in Rich Text)
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { file, title } = node.data.target.fields;
            return (
                <img
                    src={`https:${file.url}`}
                    alt={title || file.fileName}
                    className="my-4 rounded-lg shadow-md max-w-full h-auto"
                />
            );
        },
        // Render hyperlinks
        [INLINES.HYPERLINK]: (node, children) => (
            <a href={node.data.uri} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ),
        // You can add more renderers for headings, lists, etc.
    },
};

// This component will display the client's design projects,
// fetching data from the Contentful headless CMS.
export default function Projects() {
    // State to store the fetched projects data
    const [projects, setProjects] = useState([]);
    // State to manage loading status
    const [loading, setLoading] = useState(true);
    // State to manage any errors during data fetching
    const [error, setError] = useState(null);

    // Access environment variables
    // If you are using Vite, replace process.env.REACT_APP_ with import.meta.env.VITE_
    const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
    const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
    const contentType = import.meta.env.VITE_CONTENTFUL_CONTENT_TYPE_ID;

    useEffect(() => {
        // Function to fetch project data from Contentful
        const fetchProjects = async () => {
            // Basic validation for environment variables
            if (!spaceId || !accessToken || !contentType) {
                console.error("Contentful API credentials are missing. Please check your .env file.");
                setError("Configuration error: Contentful API credentials are not set.");
                setLoading(false);
                return;
            }

            try {
                // Construct the Contentful Content Delivery API URL
                const apiUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=${contentType}&include=10`;
                // `include=10` ensures linked assets (images) and potentially embedded entries are included.

                const response = await fetch(apiUrl);

                // Check if the response was successful
                if (!response.ok) {
                    // Log the full response for more debugging info if needed
                    const errorText = await response.text();
                    console.error("Contentful API Error Response:", errorText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Process Contentful data to match our project structure
                const fetchedProjects = data.items.map(item => {
                    const projectFields = item.fields;
                    const projectId = item.sys.id;

                    // Resolve image URLs from the 'includes.Asset' array
                    const projectImages = (projectFields.media || []).map(imageRef => {
                        const asset = data.includes?.Asset?.find(asset => asset.sys.id === imageRef.sys.id);
                        // Contentful asset URLs typically start with //
                        return asset ? `https:${asset.fields.file.url}` : 'https://placehold.co/300x300/CCCCCC/000000?text=Image+Not+Found';
                    });

                    // If no images are provided in Contentful, use default placeholders
                    if (projectImages.length === 0) {
                        projectImages.push(
                            'https://placehold.co/300x300/000000/FFFFFF?text=Default+1',
                            'https://placehold.co/300x300/FFFFFF/000000?text=Default+2',
                            'https://placehold.co/300x300/000000/FFFFFF?text=Default+3',
                            'https://placehold.co/300x300/FFFFFF/000000?text=Default+4',
                            'https://placehold.co/300x300/000000/FFFFFF?text=Default+5',
                            'https://placehold.co/300x300/FFFFFF/000000?text=Default+6'
                        );
                    }

                    return {
                        id: projectId,
                        title: projectFields.title,
                        // The description field will now be the Rich Text object itself
                        description: projectFields.description,
                        images: projectImages,
                    };
                });

                setProjects(fetchedProjects); // Set the fetched data
            } catch (err) {
                console.error("Failed to fetch projects from Contentful:", err);
                setError("Failed to load projects. Please ensure Contentful API keys are correct and content exists. Check console for details."); // Updated error message
            } finally {
                setLoading(false); // Set loading to false once fetching is complete
            }
        };

        fetchProjects(); // Call the fetch function when the component mounts
    }, [spaceId, accessToken, contentType]); // Add environment variables to dependency array

    // Display loading state
    if (loading) {
        return (
            <section id="projects" className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-700">Loading projects...</p>
            </section>
        );
    }

    // Display error state
    if (error) {
        return (
            <section id="projects" className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-red-600">{error}</p>
            </section>
        );
    }

    return (
        // The main section for projects, with an ID for react-scroll navigation
        <section id="projects" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-extrabold text-center text-gray-900 mb-12"
                >
                    My Designs & Projects
                </motion.h2>

                {/* Iterate over each project fetched from the CMS */}
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`mb-20 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col items-center gap-10 md:gap-16`}
                        >
                            {/* Project Text Content (Title and Description) */}
                            <div className="md:w-1/2 w-full text-center md:text-left">
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">{project.title}</h3>
                                {/* Render the Rich Text description */}
                                {project.description && documentToReactComponents(project.description, richTextOptions)}
                            </div>

                            {/* Project Image Grid */}
                            <div className="md:w-1/2 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-white rounded-xl shadow-lg">
                                {project.images.map((image, imgIndex) => (
                                    <motion.div
                                        key={imgIndex}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: (index * 0.1) + (imgIndex * 0.05) }}
                                        className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md"
                                    >
                                        <img
                                            src={image}
                                            alt={`${project.title} design ${imgIndex + 1}`}
                                            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 text-xl">No projects found. Please add some in Contentful!</p>
                )}
            </div>
        </section>
    );
}
