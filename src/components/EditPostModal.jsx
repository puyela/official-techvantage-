import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../Firebase'; // Firebase storage and Firestore

const EditPostModal = ({ post, onClose, onSave }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [externalLinks, setExternalLinks] = useState(post.externalLinks || '');
  const [coverImage, setCoverImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress

  // Handle the image file change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If a new cover image is uploaded, handle the upload
    if (coverImage) {
      setIsUploading(true);
      const imageRef = ref(storage, `coverImages/${post.id}_${coverImage.name}`);
      const uploadTask = uploadBytes(imageRef, coverImage);

      // Listen to state changes for the upload task
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculate and set upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading image:', error);
          setIsUploading(false);
        },
        async () => {
          setIsUploading(false);
          setUploadProgress(0); // Reset progress after completion
        }
      );
    }

    // Call onSave with updated data after image is uploaded
    onSave(post.id, { title, content, externalLinks });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>

          {/* External Links Input */}
          <div className="mb-4">
            <label htmlFor="externalLinks" className="block text-sm font-medium text-gray-700">External Links</label>
            <input
              type="text"
              id="externalLinks"
              value={externalLinks}
              onChange={(e) => setExternalLinks(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isUploading} // Disable during upload
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;