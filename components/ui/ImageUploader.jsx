'use client';

import React, { useState, useCallback, useEffect } from "react";
import { Image } from "cloudinary-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2Icon, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ImageUploader({ onImageUpload, multiple = false, initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const uploadImage = async (files) => {
    setUploading(true);
    setProgress(0);
    setError(null);
    const uploadedImageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("file", files[i]);
      data.append("upload_preset", "bxmkzdav");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dvvirefzi/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const file = await res.json();
        uploadedImageUrls.push(file.secure_url);
        setProgress(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Error uploading image. Please try again.");
      }
    }

    setUploading(false);

    if (multiple) {
      setImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
      onImageUpload([...images, ...uploadedImageUrls]);
    } else {
      setImages([uploadedImageUrls[0]]);
      onImageUpload([uploadedImageUrls[0]]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      uploadImage(e.target.files);
    }
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadImage(e.dataTransfer.files);
    }
  }, []);

  const deleteImage = (imageUrl) => {
    const filteredImages = images.filter((url) => url !== imageUrl);
    setImages(filteredImages);
    onImageUpload(filteredImages);
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center ${
          dragActive ? 'border-primary' : 'border-gray-300'
        } transition-colors duration-300 ease-in-out cursor-pointer`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <Input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleChange}
          multiple={multiple}
          disabled={uploading}
        />
        <div className="space-y-2">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {uploading && <Progress value={progress} className="w-full" />}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative ">
              <img
                src={imageUrl}
                alt={`Uploaded Image ${index + 1}`}
                className="object-cover w-full rounded-md aspect-square"
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="icon"
                  className="opacity-100 transition-opacity"
                  onClick={() => deleteImage(imageUrl)}
                >
                  <Trash2Icon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
