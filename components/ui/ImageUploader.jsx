"use client";
import React, { useState } from "react";
import { Image } from "cloudinary-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageUploader = ({ onImageUpload, multiple = false }) => {
  const [images, setImages] = useState([]);

  const uploadImage = async (e) => {
    const files = e.target.files;
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
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    if (multiple) {
      setImages(prevImages => [...prevImages, ...uploadedImageUrls]);
      onImageUpload([...images, ...uploadedImageUrls]);
    } else {
      setImages([uploadedImageUrls[0]]);
      onImageUpload(uploadedImageUrls[0]);
    }
  };

  const deleteImage = (imageUrl) => {
    const filteredImages = images.filter(url => url !== imageUrl);
    setImages(filteredImages);
    onImageUpload(filteredImages);
  };

  return (
    <div>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group w-[200px]">
              <Image
                cloudName="dvvirefzi"
                publicId={imageUrl}
                alt="Uploaded Image"
                className="object-cover w-full rounded-md aspect-square"
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-background/80 hover:bg-background"
                  onClick={() => deleteImage(imageUrl)}
                >
                  <Trash2Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <>
        <Label htmlFor="picture">Upload Image/Images</Label>
        <Input id="file" type="file" onChange={uploadImage} multiple={multiple} />
      </>
    </div>
  );
};

export default ImageUploader;
