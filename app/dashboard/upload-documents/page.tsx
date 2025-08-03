'use client';

import { useState } from 'react';
import axios from 'axios';

export default function UploadDocumentsPage() {
  const [documentType, setDocumentType] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false); // 🔄 New

  const allowedTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => allowedTypes.includes(file.type));
    
    setSelectedFiles(validFiles);

    const previewUrls = validFiles.map(file => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      } else {
        return file.name;
      }
    });

    setPreviews(previewUrls);
  };

const handleUpload = async () => {
  if (!documentType || selectedFiles.length === 0) {
    setMessage('Please select document type and at least one file.');
    return;
  }

  const formData = new FormData();
  formData.append('documentType', documentType);
  formData.append('document', selectedFiles[0]); // 👈 must match multer field name

  try {
    setIsUploading(true);
    setMessage('');
    const token = localStorage.getItem('token');

    await axios.post('http://localhost:5000/api/upload-documents', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    setMessage('✅ Documents uploaded successfully!');
    setSelectedFiles([]);
    setPreviews([]);
    setDocumentType('');
  } catch (error) {
    console.error(error);
    setMessage('❌ Upload failed. Try again.');
  } finally {
    setIsUploading(false);
  }
};


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Upload Documents</h2>

      <label className="block mb-2">Select Document Type:</label>
      <select
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">-- Select --</option>
        <option value="Aadhar">Aadhar Card</option>
        <option value="PAN">PAN Card</option>
        <option value="GST">GST Invoice</option>
      </select>

      <label className="block mb-2">Choose JPG, JPEG, or PDF Files:</label>
      <input type="file" multiple onChange={handleFileChange} accept=".jpg,.jpeg,.pdf" className="mb-4" />

      {previews.length > 0 && (
        <div className="mb-4 space-y-2">
          <p className="text-sm font-semibold">Preview:</p>
          {previews.map((preview, idx) =>
            preview.endsWith('.pdf') || !preview.startsWith('blob') ? (
              <p key={idx} className="text-sm text-gray-700">📄 {preview}</p>
            ) : (
              <img
                key={idx}
                src={preview}
                alt={`Preview ${idx}`}
                className="w-32 h-auto rounded shadow"
              />
            )
          )}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 ${
          isUploading ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {isUploading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {isUploading ? 'Uploading...' : 'Upload Documents'}
      </button>

      {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
    </div>
  );
}
